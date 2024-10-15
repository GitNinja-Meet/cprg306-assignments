"use client";

import { useState } from 'react';

export default function NewItem() {
  
  const [name, setName] = useState(""); 
  const [quantity, setQuantity] = useState(1); 
  const [category, setCategory] = useState("produce"); 

  
  const increment = () => {
    setQuantity((prevQuantity) => (prevQuantity < 20 ? prevQuantity + 1 : prevQuantity));
  };

  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault(); 

    
    const item = {
      name,
      quantity,
      category,
    };

    
    alert(`Name: ${name}, Quantity: ${quantity}, Category: ${category}`);

    
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg shadow-md w-80 bg-gray-900">
        
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          required
          className="border p-2 w-full rounded-lg bg-gray-800 text-white placeholder-gray-400"
        />

        
        <div className="flex space-x-4 items-center">
          
          <div className="flex items-center space-x-2">
            <button
              onClick={decrement}
              disabled={quantity === 1}
              className="bg-gray-500 text-white px-3 py-1 rounded-full disabled:opacity-50"
            >
              -
            </button>
            <span className="text-white">{quantity}</span>
            <button
              onClick={increment}
              disabled={quantity === 20}
              className="bg-blue-500 text-white px-3 py-1 rounded-full disabled:opacity-50"
            >
              +
            </button>
          </div>

          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-lg bg-gray-800 text-white"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen-foods">Frozen Foods</option>
            <option value="canned-goods">Canned Goods</option>
            <option value="dry-goods">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>

        
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full py-2 rounded-lg text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}
