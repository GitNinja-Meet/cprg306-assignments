"use client";

import { useState } from 'react';

export default function NewItem() {
  
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prevQuantity) => (prevQuantity < 20 ? prevQuantity + 1 : prevQuantity));
  };

  
  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg shadow-md w-80">
      <h1 className="text-2xl font-bold">Quantity: {quantity}</h1>

      <div className="flex space-x-4">
        <button
          onClick={decrement}
          disabled={quantity === 1}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          -
        </button>

        <button
          onClick={increment}
          disabled={quantity === 20}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  );
}
