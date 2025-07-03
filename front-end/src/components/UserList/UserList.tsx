import React, { useEffect, useState } from "react";
import { Card, Button, Drawer, Row, Col } from "antd";
import { User } from "../../types/User";
import foodService from "../../services/foodService";

type UserListProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  const [mealImages, setMealImages] = useState<Record<string, string>>({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);

  useEffect(() => {
    const fetchImages = async () => {
      for (const user of users) {
        if (user.favorite_food_id) {
          const key = `${user.id}-${user.favorite_food_id}`;
          if (!mealImages[key]) {
            try {
              const meal = await foodService.getMealById(user.favorite_food_id);
              if (meal?.strMealThumb) {
                setMealImages((prev) => ({
                  ...prev,
                  [key]: meal.strMealThumb!,
                }));
              }
            } catch (err) {
              console.error(`Error fetching image for ${user.full_name}:`, err);
            }
          }
        }
      }
    };

    fetchImages();
  }, [JSON.stringify(users)]);

  const handleFavoriteFoodClick = async (user: User) => {
    try {
      const meal = await foodService.getMealById(user.favorite_food_id);
      setSelectedMeal(meal);
      setDrawerVisible(true);
    } catch (err) {
      console.error("Failed to load recipe", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {users.map((user) => {
          const imageKey = `${user.id}-${user.favorite_food_id}`;
          return (
            <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                cover={
                  mealImages[imageKey] && (
                    <img
                      alt={user.favorite_food_title}
                      src={mealImages[imageKey]}
                      style={{ objectFit: "cover", height: 200 }}
                    />
                  )
                }
                title={user.full_name}
                extra={
                  <Button type="link" onClick={() => onEdit(user)}>
                    Edit
                  </Button>
                }
                actions={[
                  <Button type="text" danger onClick={() => onDelete(user.id)}>
                    Delete
                  </Button>,
                ]}
              >
                <strong>Email:</strong> <p>{user.email}</p>
                <strong>Favorite Food:</strong>
                <p>
                  <Button
                    type="link"
                    onClick={() => handleFavoriteFoodClick(user)}
                  >
                    {user.favorite_food_title}
                  </Button>
                </p>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Drawer
        title={selectedMeal?.strMeal}
        placement="right"
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedMeal ? (
          <>
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              style={{ width: "100%", marginBottom: 16, borderRadius: 8 }}
            />
            <p>
              <strong>Category:</strong> {selectedMeal.strCategory}
            </p>
            <p>
              <strong>Area:</strong> {selectedMeal.strArea}
            </p>
            <p>
              <strong>Ingredients:</strong>
            </p>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                const ingredient = selectedMeal[`strIngredient${i}`];
                const measure = selectedMeal[`strMeasure${i}`];
                return ingredient && ingredient.trim() ? (
                  <li key={i}>{`${ingredient} - ${measure}`}</li>
                ) : null;
              })}
            </ul>
            <p>
              <strong>Instructions:</strong>
            </p>
            <p>{selectedMeal.strInstructions}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Drawer>
    </div>
  );
};

export default UserList;
