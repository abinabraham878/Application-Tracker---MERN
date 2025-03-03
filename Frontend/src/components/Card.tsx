import React from "react";

interface CardProps {
  title: string;
  count: number | string;
  icon?: React.ReactNode;
  color?: string;
}

const Card = ({ title, count, icon, color }: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col space-y-3 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-700 font-medium text-lg">{title}</h3>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </div>
      <p
        className={`text-3xl font-bold ${
          color?.includes("blue") ? "text-blue-600" : color?.includes("green") ? "text-green-600"
            : color?.includes("yellow") ? "text-yellow-600" : color?.includes("purple") ? "text-purple-600" : "text-gray-600"
        }`}
      >
        {count}
      </p>
    </div>
  );
};

export default Card;
