import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserList from "./UserList";
import foodService from "../../services/foodService";
import { User } from "../../types/User";

jest.mock("../../services/foodService");

const mockedFoodService = foodService as jest.Mocked<typeof foodService>;

const mockUser: User = {
  id: 1,
  full_name: "John Doe",
  email: "john@example.com",
  favorite_food_title: "Chicken Handi",
  favorite_food_id: "52795",
};

const mockMeal = {
  idMeal: "12345",
  strMeal: "Chicken Handi",
  strMealThumb: "https://www.example.com/image.jpg",
  strInstructions: "Cook it well.",
  strCategory: "Indian",
  strArea: "Pakistani",
  strIngredient1: "Chicken",
  strMeasure1: "1 kg",
};

describe("UserList", () => {
  beforeEach(() => {
    mockedFoodService.getMealById.mockResolvedValue(mockMeal);
  });

  it("renders user cards", () => {
    render(
      <UserList users={[mockUser]} onEdit={jest.fn()} onDelete={jest.fn()} />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Chicken Handi")).toBeInTheDocument();
  });

  it("loads meal image", async () => {
    render(
      <UserList users={[mockUser]} onEdit={jest.fn()} onDelete={jest.fn()} />
    );

    await waitFor(() => {
      const img = screen.getByRole("img") as HTMLImageElement;
      expect(img.src).toBe(mockMeal.strMealThumb);
    });
  });

  it("opens drawer with meal details on favorite click", async () => {
    render(
      <UserList users={[mockUser]} onEdit={jest.fn()} onDelete={jest.fn()} />
    );

    fireEvent.click(screen.getByText("Chicken Handi"));

    await waitFor(() => {
      // TODO: Fix this test to check for the drawer content
      //   expect(screen.queryByText("Cook it well.")).not.toBeVisible();
      expect(screen.getByText("Category:")).toBeInTheDocument();
      expect(screen.getByText("Ingredients:")).toBeInTheDocument();
    });
  });

  it("closes drawer when user clicks close", async () => {
    render(
      <UserList users={[mockUser]} onEdit={jest.fn()} onDelete={jest.fn()} />
    );

    fireEvent.click(screen.getByText("Chicken Handi"));

    // Wait for the drawer content to appear
    await waitFor(() => {
      expect(screen.getByText("Cook it well.")).toBeVisible();
    });

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    // Wait for it to become hidden (not removed from DOM)
    await waitFor(() => {
      expect(screen.getByText("Cook it well.")).not.toBeVisible();
    });
  });
});
