import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Edit3, 
  Save, 
  X,
  Users,
  Settings,
  BarChart3,
  Calendar,
  DollarSign
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ErrorMessage } from '../components/ui/ErrorMessage';

interface FacilityDetail {
  $id: string;
  facilityId: number;
  facilityName: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  openingTime: string;
  closingTime: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  latitude: number;
  longtitude: number;
  facilityStatus: string;
  ownerId: number;
  staffId: number;
}

export const FacilityDetailPage: React.FC = () => {
  const [facility, setFacility] = useState<FacilityDetail>({
    $id: "2",
    facilityId: 1,
    facilityName: "CapPT",
    description: "Facility1",
    contactPhone: "0862414845",
    contactEmail: "phatasdasd0197@gmail.com",
    openingTime: "07:00:00",
    closingTime: "23:00:00",
    address: "329",
    ward: "Hoa Minh",
    district: "Chau Thanh",
    city: "Tra Vinh",
    latitude: 0,
    longtitude: 0,
    facilityStatus: "1",
    ownerId: 2,
    staffId: 3
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    description: facility.description,
    openingTime: facility.openingTime.slice(0, 5), // Remove seconds
    closingTime: facility.closingTime.slice(0, 5)   // Remove seconds
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const stats = [
    { label: 'Total Courts', value: '8', icon: Building2, color: 'mint' },
    { label: 'Active Bookings', value: '24', icon: Calendar, color: 'blue' },
    { label: 'Staff Members', value: '5', icon: Users, color: 'green' },
    { label: 'Monthly Revenue', value: '$8,420', icon: DollarSign, color: 'purple' }
  ];

  const handleEditChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleSave = async () => {
    if (!editData.description.trim()) {
      setError('Description cannot be empty');
      return;
    }

    if (!editData.openingTime || !editData.closingTime) {
      setError('Please set both opening and closing times');
      return;
    }

    // Validate time logic
    const openTime = new Date(`2000-01-01T${editData.openingTime}:00`);
    const closeTime = new Date(`2000-01-01T${editData.closingTime}:00`);
    
    if (openTime >= closeTime) {
      setError('Opening time must be before closing time');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setFacility(prev => ({
        ...prev,
        description: editData.description,
        openingTime: `${editData.openingTime}:00`,
        closingTime: `${editData.closingTime}:00`
      }));
      setIsLoading(false);
      setIsEditing(false);
    }, 1500);
  };

  const handleCancel = () => {
    setEditData({
      description: facility.description,
      openingTime: facility.openingTime.slice(0, 5),
      closingTime: facility.closingTime.slice(0, 5)
    });
    setError('');
    setIsEditing(false);
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5); // Remove seconds for display
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => window.history.back()}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              whileHover={{ x: -2 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{facility.facilityName}</h1>
              <p className="text-slate-300">Facility Management Dashboard</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                icon={Edit3}
                variant="secondary"
              >
                Edit Details
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleCancel}
                  variant="secondary"
                  icon={X}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  loading={isLoading}
                  icon={Save}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Facility Information */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                  <Building2 className="w-6 h-6 text-mint-400" />
                  <span>Facility Information</span>
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  facility.facilityStatus === '1' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {facility.facilityStatus === '1' ? 'Active' : 'Inactive'}
                </span>
              </div>

              <ErrorMessage message={error} show={!!error} />

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Facility Name</label>
                    <div className="p-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <p className="text-white">{facility.facilityName}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Facility ID</label>
                    <div className="p-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <p className="text-white">#{facility.facilityId}</p>
                    </div>
                  </div>
                </div>

                {/* Description - Editable */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  {isEditing ? (
                    <textarea
                      value={editData.description}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                      className="w-full p-3 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 resize-none h-24"
                      placeholder="Enter facility description..."
                    />
                  ) : (
                    <div className="p-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <p className="text-white">{facility.description}</p>
                    </div>
                  )}
                </div>

                {/* Operating Hours - Editable */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Operating Hours</label>
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Opening Time</label>
                        <input
                          type="time"
                          value={editData.openingTime}
                          onChange={(e) => handleEditChange('openingTime', e.target.value)}
                          className="w-full p-3 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Closing Time</label>
                        <input
                          type="time"
                          value={editData.closingTime}
                          onChange={(e) => handleEditChange('closingTime', e.target.value)}
                          className="w-full p-3 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-mint-400" />
                          <span className="text-white">{formatTime(facility.openingTime)}</span>
                        </div>
                        <span className="text-slate-400">to</span>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-white">{formatTime(facility.closingTime)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Contact Phone</label>
                    <div className="p-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-green-400" />
                        <p className="text-white">{facility.contactPhone}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Contact Email</label>
                    <div className="p-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <p className="text-white text-sm">{facility.contactEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Location & Additional Info */}
          <div className="space-y-6">
            {/* Location Information */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-mint-400" />
                <span>Location</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Address</label>
                  <p className="text-white text-sm">{facility.address}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Ward</label>
                  <p className="text-white text-sm">{facility.ward}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">District</label>
                  <p className="text-white text-sm">{facility.district}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">City</label>
                  <p className="text-white text-sm">{facility.city}</p>
                </div>
                
                {(facility.latitude !== 0 || facility.longtitude !== 0) && (
                  <div className="pt-2 border-t border-slate-600/50">
                    <label className="block text-xs font-medium text-slate-400 mb-1">Coordinates</label>
                    <p className="text-white text-sm">
                      {facility.latitude}, {facility.longtitude}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Management Info */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-mint-400" />
                <span>Management</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Owner ID</label>
                  <p className="text-white text-sm">#{facility.ownerId}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Staff ID</label>
                  <p className="text-white text-sm">#{facility.staffId}</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-mint-400" />
                <span>Quick Actions</span>
              </h3>
              
              <div className="space-y-3">
                <button className="w-full bg-mint-500/20 text-mint-400 py-2 px-4 rounded-xl hover:bg-mint-500/30 transition-colors text-sm font-medium">
                  Manage Courts
                </button>
                <button className="w-full bg-blue-500/20 text-blue-400 py-2 px-4 rounded-xl hover:bg-blue-500/30 transition-colors text-sm font-medium">
                  View Bookings
                </button>
                <button className="w-full bg-purple-500/20 text-purple-400 py-2 px-4 rounded-xl hover:bg-purple-500/30 transition-colors text-sm font-medium">
                  Staff Management
                </button>
                <button className="w-full bg-orange-500/20 text-orange-400 py-2 px-4 rounded-xl hover:bg-orange-500/30 transition-colors text-sm font-medium">
                  Reports & Analytics
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};