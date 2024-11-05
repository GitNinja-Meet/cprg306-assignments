export default function Item({ item, onSelect }) {
  return (
    <li 
      onClick={() => onSelect(item)} 
      className="p-4 bg-gray-800 text-white cursor-pointer hover:bg-gray-700"
    >
      <div>
        <h2 className="font-bold text-xl">{item.name}</h2>
        <p className="text-violet-400">Buy {item.quantity} in {item.category}</p>
      </div>
    </li>
  );
}
