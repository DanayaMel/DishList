// foodService.test.ts
import foodService from "./foodService";

global.fetch = jest.fn();

const mockFetch = fetch as jest.Mock;

describe("FoodService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a random meal", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        meals: [{ idMeal: "123", strMeal: "Pizza" }],
      }),
    });

    const result = await foodService.getRandomMeal();
    expect(result).toEqual({ idMeal: "123", strMeal: "Pizza" });
    expect(mockFetch).toHaveBeenCalledWith(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
  });

  it("should return null if no random meal is found", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: null }),
    });

    const result = await foodService.getRandomMeal();
    expect(result).toBeNull();
  });

  it("should search meal by name", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        meals: [{ idMeal: "234", strMeal: "Burger" }],
      }),
    });

    const result = await foodService.searchMealByName("Burger");
    expect(result).toEqual({ idMeal: "234", strMeal: "Burger" });
  });

  it("should fetch categories", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        meals: [{ strCategory: "Beef" }, { strCategory: "Chicken" }],
      }),
    });

    const result = await foodService.getCategories();
    expect(result).toEqual(["Beef", "Chicken"]);
  });

  it("should handle fetch failure", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(foodService.getRandomMeal()).rejects.toThrow(
      "Failed to fetch random meal"
    );
  });
});
