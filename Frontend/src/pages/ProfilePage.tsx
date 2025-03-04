import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { formatDate } from "../utils/dateFormater";

const ProfilePage = () => {
    const { getUserDetails, userDetails, getUserInitials } = useContext(AuthContext);

    useEffect(() => {
      getUserDetails();
    }, [userDetails]);
  
    return (
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                {getUserInitials()}
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{userDetails.name}</h2>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded-md">
                    {userDetails.email}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded-md">
                    {formatDate(new Date(userDetails.createdAt).toLocaleDateString())}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="email-notifications" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="email-notifications" className="text-sm text-gray-700">
                  Receive email notifications
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;