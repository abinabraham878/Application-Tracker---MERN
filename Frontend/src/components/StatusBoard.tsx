import Card from './Card';
import { CheckCircle, ClipboardList, FileText, Users } from 'lucide-react';

const StatusBoard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <Card 
            title="Sent Applications" 
            count="10" 
            icon={<FileText size={20} className="text-blue-500" />} 
            color="bg-blue-100"
          />
          <Card 
            title="Shortlisted Applications" 
            count="5" 
            icon={<ClipboardList size={20} className="text-yellow-500" />} 
            color="bg-yellow-100"
          />
          <Card 
            title="Shortlisted For Interviews" 
            count="3" 
            icon={<Users size={20} className="text-purple-500" />} 
            color="bg-purple-100"
          />
          <Card 
            title="Final Round Interviews" 
            count="2" 
            icon={<Users size={20} className="text-orange-500" />} 
            color="bg-orange-100"
          />
          <Card 
            title="Offer Letter Confirmed" 
            count="1" 
            icon={<CheckCircle size={20} className="text-green-500" />} 
            color="bg-green-100"
          />
        </div>
      );
}

export default StatusBoard