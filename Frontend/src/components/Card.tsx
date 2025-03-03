import React from "react";

interface CardProps {
  title: string;
  count: number | string;
  icon?: React.ReactNode;
  color?: string;
  textColor?: string;
}

const Card = ({ title, count, icon, color, textColor }: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-700 font-medium">{title}</h3>
        <div className={`p-2 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
      <p className={`text-4xl font-bold ${textColor}`}>
        {count}
      </p>
    </div>
  );
};

export default Card;
