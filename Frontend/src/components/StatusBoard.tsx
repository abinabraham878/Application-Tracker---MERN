import { useContext, useEffect } from "react";
import Card from "./Card";
import { JobTrackerContext } from "../context/JobTrackerContext";

interface StatusItem {
  id: number;
  title: string;
  dataKey: string;
  count: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
}

interface StatusBoardProps {
  statusData: StatusItem[];
}

const StatusBoard = ({ statusData }: StatusBoardProps) => {

  const { jobStatusCount, statusCount } = useContext(JobTrackerContext);

  useEffect(()=>{
    jobStatusCount()
  },[]);


  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 transition-all duration-300 ease-in-out`}
    >
      {statusData.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          count={statusCount[item.dataKey] ?? 0}
          icon={item.icon}
          color={item.color}
          textColor={item.textColor}
        />
      ))}
    </div>
  );
};

export default StatusBoard;
