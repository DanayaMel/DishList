import userServices from "./userService";
import { User } from "../types/User";

global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

const mockUser: User = {
  id: 1,
  full_name: "Jane Doe",
  email: "jane@example.com",
  favorite_food_id: "123",
  favorite_food_title: "Pasta",
};

describe("userServices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches all users", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockUser],
    });

    const users = await userServices.getUsers();
    expect(users).toEqual([mockUser]);
    expect(mockFetch).toHaveBeenCalledWith("/users");
  });

  it("fetches a user by ID", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await userServices.getUserById(1);
    expect(user).toEqual(mockUser);
    expect(mockFetch).toHaveBeenCalledWith("/users/1");
  });

  it("throws error when user not found", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(userServices.getUserById(999)).rejects.toThrow(
      "Failed to fetch user with ID: 999"
    );
  });

  it("creates a new user", async () => {
    const newUser = { full_name: "New", email: "new@x.com" };
    const createdUser = { ...newUser, id: 2 };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createdUser,
    });

    const result = await userServices.createUser(newUser);
    expect(result).toEqual(createdUser);
    expect(mockFetch).toHaveBeenCalledWith(
      "/users",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("updates a user", async () => {
    const updatedData = { full_name: "Updated" };
    const updatedUser = { ...updatedData, id: 1 };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedUser,
    });

    const result = await userServices.updateUser(1, updatedData);
    expect(result).toEqual(updatedUser);
    expect(mockFetch).toHaveBeenCalledWith(
      "/users/1",
      expect.objectContaining({
        method: "PUT",
      })
    );
  });

  it("deletes a user", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
    });

    const result = await userServices.deleteUser(1);
    expect(result).toBeNull();
    expect(mockFetch).toHaveBeenCalledWith(
      "/users/1",
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });
});
