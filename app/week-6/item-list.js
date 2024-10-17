"use client"; // Add this line at the top to make it a client component

import React, { useState } from 'react';
import Item from './item';
import items from './items.json';

const ItemList = () => {
    const [sortBy, setSortBy] = useState('name');

    // Sort items based on the sortBy state
    const sortedItems = items.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'category') {
            return a.category.localeCompare(b.category);
        }
    });

    // Grouping logic based on categories
    const groupedItems = items.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <div>
            <div className="mb-4">
                <button
                    className={`mr-2 p-2 ${sortBy === 'name' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSortBy('name')}
                >
                    Name
                </button>
                <button
                    className={`mr-2 p-2 ${sortBy === 'category' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSortBy('category')}
                >
                    Category
                </button>
                <button
                    className={`p-2 bg-orange-500 text-white`}
                    onClick={() => setSortBy('grouped')}
                >
                    Grouped Category
                </button>
            </div>
            
            {sortBy === 'grouped' ? (
                <div>
                    {Object.keys(groupedItems).map((category) => (
                        <div key={category}>
                            <h2 className="text-lg font-bold mb-2">{category}</h2>
                            <ul className="space-y-2">
                                {groupedItems[category].map((item) => (
                                    <Item
                                        key={item.id}
                                        name={item.name}
                                        quantity={item.quantity}
                                        category={item.category}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <ul className="space-y-2">
                    {sortedItems.map((item) => (
                        <Item
                            key={item.id}
                            name={item.name}
                            quantity={item.quantity}
                            category={item.category}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ItemList;
