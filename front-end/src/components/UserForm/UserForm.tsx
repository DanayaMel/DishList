import React, { useEffect, useState } from "react";
import { Button, Cascader, Input, Form } from "antd";
import { User } from "../../types/User";
import { Meal } from "../../types/Meal";
import foodService from "../../services/foodService";

interface UserFormProps {
  user?: User | null;
  onSave: (userData: Partial<User>) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [cascaderOptions, setCascaderOptions] = useState<any[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  useEffect(() => {
    const options = [
      { value: "category", label: "Category", isLeaf: false },
      { value: "area", label: "Area", isLeaf: false },
      { value: "ingredient", label: "Ingredient", isLeaf: false },
    ];
    setCascaderOptions(options);

    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const handleFinish = (values: any) => {
    if (user) {
      onSave({ ...user, ...values });
    } else {
      onSave(values);
    }
  };

  const loadData = async (selectedOptions: any[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    if (selectedOptions.length === 1) {
      // First level: load categories, areas, or ingredients
      if (targetOption.value === "category") {
        const categories = await foodService.getCategories();
        targetOption.children = categories.map((category: string) => ({
          value: category,
          label: category,
          isLeaf: false, // Not a leaf yet — we’ll load meals next
        }));
      } else if (targetOption.value === "area") {
        const areas = await foodService.getAreas();
        targetOption.children = areas.map((area: string) => ({
          value: area,
          label: area,
          isLeaf: false,
        }));
      } else if (targetOption.value === "ingredient") {
        const ingredients = await foodService.getIngredients();
        targetOption.children = ingredients.map((ingredient: string) => ({
          value: ingredient,
          label: ingredient,
          isLeaf: false,
        }));
      }
    } else if (selectedOptions.length === 2) {
      // Second level: load meals under selected category/area/ingredient
      const parentOption = selectedOptions[0];
      const filterValue = targetOption.value;

      let meals: Meal[] = [];

      if (parentOption.value === "category") {
        meals = await foodService.getMealsByCategory(filterValue);
      } else if (parentOption.value === "area") {
        meals = await foodService.getMealsByArea(filterValue);
      } else if (parentOption.value === "ingredient") {
        meals = await foodService.getMealsByIngredient(filterValue);
      }

      targetOption.children = meals.map((meal: any) => ({
        value: meal.strMeal,
        label: meal.strMeal,
        isLeaf: true,
        idMeal: meal.idMeal,
      }));
    }

    targetOption.loading = false;
    setCascaderOptions([...cascaderOptions]);
  };

  const handleCascaderChange = (value: string[], selectedOptions: any[]) => {
    const selectedMeal = selectedOptions[selectedOptions.length - 1];
    console.log("Selected meal from Cascader:", selectedMeal); // DEBUG

    form.setFieldsValue({
      favorite_food_title: selectedMeal.label,
      favorite_food_id: selectedMeal.idMeal,
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: 400, margin: "1rem auto" }}
    >
      <Form.Item
        name="full_name"
        label="Full Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="favorite_food_title" label="Favorite Food">
        <Cascader
          options={cascaderOptions}
          loadData={loadData}
          changeOnSelect
          onChange={handleCascaderChange}
          placeholder="Select Category, Area, or Ingredient"
        />
      </Form.Item>

      <Form.Item name="favorite_food_id" hidden>
        <Input type="hidden" />
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button htmlType="submit" type="primary">
          {user ? "Update" : "Create"}
        </Button>
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
