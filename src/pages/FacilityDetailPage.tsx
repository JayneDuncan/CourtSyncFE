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
  Calendar,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  ChevronRight
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
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
    openingTime: facility.openingTime.slice(0, 5),
    closingTime: facility.closingTime.slice(0, 5)
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Quick stats for overview
  const stats = [
    { label: 'Total Courts', value: '8', icon: Building2, color: 'mint' },
    { label: 'Monthly Revenue', value: '$8,420', icon: DollarSign, color: 'blue' }
  ];

  // Management actions
  const managementActions = [
    {
      title: 'Manage Courts',
      description: 'Add, edit, and configure court settings',
      icon: Building2,
      color: 'mint',
      bgColor: 'mint-500/20',
      hoverColor: 'mint-500/30',
      textColor: 'mint-400',
      action: () => console.log('Navigate to courts management')
    },
    {
      title: 'View Bookings',
      description: 'Monitor and manage court reservations',
      icon: Calendar,
      color: 'blue',
      bgColor: 'blue-500/20',
      hoverColor: 'blue-500/30',
      textColor: 'blue-400',
      action: () => console.log('Navigate to bookings')
    },
    {
      title: 'Staff Management',
      description: 'Manage staff accounts and permissions',
      icon: Users,
      color: 'purple',
      bgColor: 'purple-500/20',
      hoverColor: 'purple-500/30',
      textColor: 'purple-400',
      action: () => console.log('Navigate to staff management')
    },
    {
      title: 'Reports & Analytics',
      description: 'View performance metrics and insights',
      icon: BarChart3,
      color: 'orange',
      bgColor: 'orange-500/20',
      hoverColor: 'orange-500/30',
      textColor: 'orange-400',
      action: () => console.log('Navigate to reports')
    }
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

    const openTime = new Date(`2000-01-01T${editData.openingTime}:00`);
    const closeTime = new Date(`2000-01-01T${editData.closingTime}:00`);
    
    if (openTime >= closeTime) {
      setError('Opening time must be before closing time');
      return;
    }

    setIsLoading(true);
    setError('');

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
    return time.slice(0, 5);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => window.history.back()}
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-800/50"
              whileHover={{ x: -2 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{facility.facilityName}</h1>
              <p className="text-slate-300">Facility ID: #{facility.facilityId}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              facility.facilityStatus === '1' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {facility.facilityStatus === '1' ? 'Active' : 'Inactive'}
            </span>
            
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Facility Information */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <Building2 className="w-6 h-6 text-mint-400" />
                <span>Facility Information</span>
              </h2>

              <ErrorMessage message={error} show={!!error} />

              <div className="space-y-6">
                {/* Description - Editable */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  {isEditing ? (
                    <textarea
                      value={editData.description}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                      className="w-full p-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 resize-none h-24"
                      placeholder="Enter facility description..."
                    />
                  ) : (
                    <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
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
                        <label className="block text-xs font-medium text-slate-400 mb-2">Opening Time</label>
                        <input
                          type="time"
                          value={editData.openingTime}
                          onChange={(e) => handleEditChange('openingTime', e.target.value)}
                          className="w-full p-3 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Closing Time</label>
                        <input
                          type="time"
                          value={editData.closingTime}
                          onChange={(e) => handleEditChange('closingTime', e.target.value)}
                          className="w-full p-3 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div className="flex items-center justify-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-mint-400" />
                          <span className="text-white font-medium">{formatTime(facility.openingTime)}</span>
                        </div>
                        <div className="w-8 h-0.5 bg-slate-500 rounded-full"></div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-blue-400" />
                          <span className="text-white font-medium">{formatTime(facility.closingTime)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Contact Phone</label>
                    <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-green-400" />
                        <p className="text-white font-medium">{facility.contactPhone}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Contact Email</label>
                    <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <p className="text-white font-medium text-sm">{facility.contactEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                  <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-mint-400 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-white font-medium">{facility.address}</p>
                        <p className="text-slate-300 text-sm">
                          {facility.ward}, {facility.district}, {facility.city}
                        </p>
                        {(facility.latitude !== 0 || facility.longtitude !== 0) && (
                          <p className="text-slate-400 text-xs">
                            Coordinates: {facility.latitude}, {facility.longtitude}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Management Actions */}
          <div>
            <motion.div
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-mint-400" />
                <span>Management</span>
              </h3>
              
              <div className="space-y-4">
                {managementActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    onClick={action.action}
                    className={`w-full p-4 bg-${action.bgColor} hover:bg-${action.hoverColor} rounded-xl transition-all duration-300 text-left group border border-transparent hover:border-${action.color}-500/30`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-${action.color}-500/30 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-500/40 transition-colors`}>
                          <action.icon className={`w-5 h-5 text-${action.textColor}`} />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">{action.title}</h4>
                          <p className="text-slate-400 text-xs">{action.description}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-${action.textColor} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};