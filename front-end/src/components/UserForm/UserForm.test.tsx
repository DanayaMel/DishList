import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "./UserForm";
import foodService from "../../services/foodService";
import { User } from "../../types/User";

jest.mock("../../services/foodService");

const mockedFoodService = foodService as jest.Mocked<typeof foodService>;

const mockUser: User = {
  id: 1,
  full_name: "Jane Smith",
  email: "jane@example.com",
  favorite_food_title: "Pad Thai",
  favorite_food_id: "52877",
};

describe("UserForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with user data when editing", () => {
    render(
      <UserForm user={mockUser} onSave={jest.fn()} onCancel={jest.fn()} />
    );

    expect(screen.getByDisplayValue("Jane Smith")).toBeInTheDocument();
    expect(screen.getByDisplayValue("jane@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Pad Thai")).toBeInTheDocument();
  });

  it("submits form with updated data", async () => {
    const onSave = jest.fn();

    render(<UserForm user={mockUser} onSave={onSave} onCancel={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Janet Smith" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update/i }));

    await waitFor(() =>
      expect(onSave).toHaveBeenCalledWith({
        ...mockUser,
        full_name: "Janet Smith",
        email: "jane@example.com",
        favorite_food_title: "Pad Thai",
        favorite_food_id: "52877",
      })
    );
  });

  it("calls cancel handler", () => {
    const onCancel = jest.fn();
    render(<UserForm onSave={jest.fn()} onCancel={onCancel} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });

  it("loads categories and then meals in cascader", async () => {
    mockedFoodService.getCategories.mockResolvedValue(["Seafood"]);
    mockedFoodService.getMealsByCategory.mockResolvedValue([
      { strMeal: "Grilled Salmon", idMeal: "12345" },
    ]);

    render(<UserForm onSave={jest.fn()} onCancel={jest.fn()} />);

    // Open first level (Category, Area, Ingredient)
    const cascader = screen.getByPlaceholderText(/select/i);
    fireEvent.mouseDown(cascader);

    await waitFor(() =>
      expect(mockedFoodService.getCategories).not.toHaveBeenCalled()
    );

    // Simulate selecting "Category"
    await fireEvent.click(screen.getByText("Category"));
    await waitFor(() =>
      expect(mockedFoodService.getCategories).toHaveBeenCalled()
    );

    // Simulate selecting "Seafood"
    await fireEvent.click(screen.getByText("Seafood"));
    await waitFor(() =>
      expect(mockedFoodService.getMealsByCategory).toHaveBeenCalledWith(
        "Seafood"
      )
    );

    // Simulate selecting "Grilled Salmon"
    await fireEvent.click(screen.getByText("Grilled Salmon"));
  });
});
