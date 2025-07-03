import { Meal } from "../types/Meal";

class FoodService {
  baseUrl = "https://www.themealdb.com/api/json/v1/1";

  async getRandomMeal(): Promise<Meal | null> {
    const response = await fetch(`${this.baseUrl}/random.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch random meal");
    }

    const data = await response.json();
    return data.meals?.[0] || null;
  }

  async searchMealByName(name: string): Promise<Meal | null> {
    const response = await fetch(
      `${this.baseUrl}/search.php?s=${encodeURIComponent(name)}`
    );
    if (!response.ok) {
      throw new Error("Failed to search meal");
    }

    const data = await response.json();
    return data.meals?.[0] || null;
  }

  async getMealById(id: string | number): Promise<Meal | null> {
    const res = await fetch(`${this.baseUrl}/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals?.[0] || null;
  }

  async getCategories(): Promise<string[]> {
    const res = await fetch(`${this.baseUrl}/list.php?c=list`);
    const data = await res.json();
    return data.meals.map((c: any) => c.strCategory);
  }

  async getAreas(): Promise<string[]> {
    const res = await fetch(`${this.baseUrl}/list.php?a=list`);
    const data = await res.json();
    return data.meals.map((a: any) => a.strArea);
  }

  async getIngredients(): Promise<string[]> {
    const res = await fetch(`${this.baseUrl}/list.php?i=list`);
    const data = await res.json();
    return data.meals.map((i: any) => i.strIngredient);
  }

  async getMealsByCategory(category: string): Promise<Meal[]> {
    const res = await fetch(
      `${this.baseUrl}/filter.php?c=${encodeURIComponent(category)}`
    );
    const data = await res.json();
    return data.meals || [];
  }

  async getMealsByArea(area: string): Promise<Meal[]> {
    const res = await fetch(
      `${this.baseUrl}/filter.php?a=${encodeURIComponent(area)}`
    );
    const data = await res.json();
    return data.meals || [];
  }

  async getMealsByIngredient(ingredient: string): Promise<Meal[]> {
    const res = await fetch(
      `${this.baseUrl}/filter.php?i=${encodeURIComponent(ingredient)}`
    );
    const data = await res.json();
    return data.meals || [];
  }
}

export default new FoodService();
