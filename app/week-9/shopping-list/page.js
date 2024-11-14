"use client";

import React, { useState, useEffect } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';
import { useUserAuth } from '../_utils/auth-context';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { user } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  useEffect(() => {
    // Redirect to the landing page if the user is not logged in
    if (!user) {
      router.push('/week-9');
    }
  }, [user, router]);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    const cleanName = item.name.split(',')[0].replace(/[^\w\s]/gi, '').trim();
    setSelectedItemName(cleanName);
  };

  // Render nothing if the user is not logged in to prevent flashes
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
