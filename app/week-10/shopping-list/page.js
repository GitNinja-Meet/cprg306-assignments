"use client";

import React, { useState, useEffect } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { getItems, addItem } from "../_services/shopping-list-service";

const Page = () => {
  const { user } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/week-10");
    } else {
      loadItems();
    }
  }, [user]);

  const loadItems = async () => {
    const userItems = await getItems(user.uid);
    setItems(userItems);
  };

  const handleAddItem = async (newItem) => {
    const newItemId = await addItem(user.uid, newItem);
    newItem.id = newItemId;
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    const cleanName = item.name.split(",")[0].replace(/[^\w\s]/gi, "").trim();
    setSelectedItemName(cleanName);
  };

  if (!user) {
    return null;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping List with Meal Ideas</h1>
      <div className="flex space-x-8">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
};

export default Page;
