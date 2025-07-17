import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Edit3, 
  Save, 
  X, 
  Building2,
  Calendar,
  Users,
  Star,
  Activity
} from 'lucide-react';

export const FacilityDetailPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  // Mock facility data
  const [facilityData, setFacilityData] = useState({
    id: 1,
    name: "CapPT Sports Complex",
    description: "A premium sports facility offering world-class amenities for tennis, basketball, and fitness training. Our facility features state-of-the-art equipment and professional coaching staff.",
    city: "Ho Chi Minh City",
    address: "123 Nguyen Van Linh, District 7",
    phone: "+84 28 1234 5678",
    email: "info@cappt.com",
    openTime: "06:00",
    closeTime: "22:00",
    status: "Active"
  });

  const [editData, setEditData] = useState(facilityData);

  const handleSave = () => {
    setFacilityData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(facilityData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: Building2 },
    { id: 'courts', label: 'Courts', icon: Activity },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg">
                  <Building2 className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  CapPT active facility id:#{facilityData.id}
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-full">
                    <span className="text-green-700 font-semibold flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      {facilityData.status}
                    </span>
                  </div>
                  <div className="px-4 py-2 bg-white/70 border border-gray-200 rounded-xl shadow-sm">
                    <span className="text-gray-600 font-medium">ID: #{facilityData.id}</span>
                  </div>
                  <div className="px-4 py-2 bg-white/70 border border-gray-200 rounded-xl shadow-sm">
                    <span className="text-gray-600 font-medium flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {facilityData.city}
                    </span>
                  </div>
                  <div className="px-4 py-2 bg-white/70 border border-gray-200 rounded-xl shadow-sm">
                    <span className="text-gray-600 font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {facilityData.openTime} - {facilityData.closeTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'details' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Facility Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Edit3 className="w-5 h-5" />
                    <span className="font-medium">Edit Facility</span>
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                      <span className="font-medium">Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Save className="w-5 h-5" />
                      <span className="font-medium">Save Changes</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-10">
                {/* Description */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                  {isEditing ? (
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({...editData, description: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-lg">{facilityData.description}</p>
                  )}
                </div>

                {/* Operating Hours */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Operating Hours</h3>
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Opening Time</label>
                        <input
                          type="time"
                          value={editData.openTime}
                          onChange={(e) => setEditData({...editData, openTime: e.target.value})}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Closing Time</label>
                        <input
                          type="time"
                          value={editData.closeTime}
                          onChange={(e) => setEditData({...editData, closeTime: e.target.value})}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-8">
                      <div className="bg-white/80 rounded-2xl p-6 shadow-lg border border-gray-200 flex-1 max-w-xs">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Opens at</p>
                          <p className="text-3xl font-bold text-gray-900">{facilityData.openTime}</p>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full"></div>
                      </div>
                      
                      <div className="bg-white/80 rounded-2xl p-6 shadow-lg border border-gray-200 flex-1 max-w-xs">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Closes at</p>
                          <p className="text-3xl font-bold text-gray-900">{facilityData.closeTime}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact & Location */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Contact Information */}
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      <div className="bg-white/80 rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                            <Phone className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-1">Phone Number</p>
                            {isEditing ? (
                              <input
                                type="tel"
                                value={editData.phone}
                                onChange={(e) => setEditData({...editData, phone: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                              />
                            ) : (
                              <p className="text-lg font-semibold text-gray-900">{facilityData.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/80 rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-1">Email Address</p>
                            {isEditing ? (
                              <input
                                type="email"
                                value={editData.email}
                                onChange={(e) => setEditData({...editData, email: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                              />
                            ) : (
                              <p className="text-lg font-semibold text-gray-900">{facilityData.email}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Location</h3>
                    <div className="space-y-6">
                      <div className="bg-white/80 rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-2">City</p>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editData.city}
                                onChange={(e) => setEditData({...editData, city: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg mb-4"
                              />
                            ) : (
                              <p className="text-lg font-semibold text-gray-900 mb-4">{facilityData.city}</p>
                            )}
                            
                            <p className="text-sm font-medium text-gray-600 mb-2">Full Address</p>
                            {isEditing ? (
                              <textarea
                                value={editData.address}
                                onChange={(e) => setEditData({...editData, address: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
                                rows={3}
                              />
                            ) : (
                              <p className="text-lg font-semibold text-gray-900">{facilityData.address}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courts' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Courts Management</h2>
            <p className="text-gray-600 text-lg">Courts management functionality will be implemented here.</p>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Bookings Overview</h2>
            <p className="text-gray-600 text-lg">Bookings management functionality will be implemented here.</p>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Members Management</h2>
            <p className="text-gray-600 text-lg">Members management functionality will be implemented here.</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>
            <p className="text-gray-600 text-lg">Reviews management functionality will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
};