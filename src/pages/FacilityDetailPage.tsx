import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronRight,
  Star,
  Zap,
  TrendingUp,
  Activity
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
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced stats with better visuals
  const stats = [
    { 
      label: 'Total Courts', 
      value: '8', 
      icon: Building2, 
      color: 'mint',
      trend: '+2 this month',
      trendUp: true
    },
    { 
      label: 'Monthly Revenue', 
      value: '$8,420', 
      icon: DollarSign, 
      color: 'blue',
      trend: '+15% vs last month',
      trendUp: true
    }
  ];

  // Enhanced management actions with better descriptions
  const managementActions = [
    {
      title: 'Manage Courts',
      description: 'Configure courts, pricing & availability',
      icon: Building2,
      color: 'mint',
      bgGradient: 'from-mint-500/20 to-mint-600/10',
      iconBg: 'mint-500/30',
      textColor: 'mint-400',
      stats: '8 Active Courts',
      action: () => console.log('Navigate to courts management')
    },
    {
      title: 'View Bookings',
      description: 'Monitor reservations & schedules',
      icon: Calendar,
      color: 'blue',
      bgGradient: 'from-blue-500/20 to-blue-600/10',
      iconBg: 'blue-500/30',
      textColor: 'blue-400',
      stats: '24 Today',
      action: () => console.log('Navigate to bookings')
    },
    {
      title: 'Staff Management',
      description: 'Manage team & permissions',
      icon: Users,
      color: 'purple',
      bgGradient: 'from-purple-500/20 to-purple-600/10',
      iconBg: 'purple-500/30',
      textColor: 'purple-400',
      stats: '5 Staff Members',
      action: () => console.log('Navigate to staff management')
    },
    {
      title: 'Reports & Analytics',
      description: 'Performance insights & metrics',
      icon: BarChart3,
      color: 'orange',
      bgGradient: 'from-orange-500/20 to-orange-600/10',
      iconBg: 'orange-500/30',
      textColor: 'orange-400',
      stats: 'View Reports',
      action: () => console.log('Navigate to reports')
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'details', label: 'Details', icon: Settings },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
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
      <div className="space-y-6">
        {/* Hero Header with Gradient Background */}
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 border border-slate-600/50 shadow-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-mint-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-mint-400/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <motion.button
                  onClick={() => window.history.back()}
                  className="p-4 text-slate-400 hover:text-white transition-all duration-300 rounded-2xl hover:bg-slate-700/50 backdrop-blur-sm hover:scale-110"
                  whileHover={{ x: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.button>
                
                <div className="flex items-center space-x-6">
                  {/* Facility Icon */}
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-mint-500/30 to-blue-500/20 rounded-2xl flex items-center justify-center border border-mint-500/30 shadow-lg shadow-mint-500/20"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Building2 className="w-10 h-10 text-mint-400" />
                  </motion.div>
                  
                  {/* Facility Info */}
                  <div>
                    <div className="flex items-center space-x-4 mb-3">
                      <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-mint-100 to-blue-100 bg-clip-text text-transparent">
                        {facility.facilityName}
                      </h1>
                      <motion.div
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold flex items-center space-x-3 backdrop-blur-sm ${
                          facility.facilityStatus === '1' 
                            ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/20 text-green-300 border border-green-400/40 shadow-lg shadow-green-500/20' 
                            : 'bg-gradient-to-r from-red-500/30 to-rose-500/20 text-red-300 border border-red-400/40 shadow-lg shadow-red-500/20'
                        }`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                      >
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${facility.facilityStatus === '1' ? 'bg-green-400' : 'bg-red-400'}`}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <span>{facility.facilityStatus === '1' ? 'Active' : 'Inactive'}</span>
                      </motion.div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-slate-300">
                      <motion.div 
                        className="flex items-center space-x-2 bg-slate-800/40 px-4 py-2 rounded-xl border border-slate-600/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                        <span className="text-sm font-medium">ID: #{facility.facilityId}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-2 bg-slate-800/40 px-4 py-2 rounded-xl border border-slate-600/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium">{facility.city}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-2 bg-slate-800/40 px-4 py-2 rounded-xl border border-slate-600/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium">{formatTime(facility.openingTime)} - {formatTime(facility.closingTime)}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/50 group hover:border-mint-500/30 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`w-4 h-4 ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`} />
                    <span className={`text-sm ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`w-16 h-16 bg-gradient-to-br from-${stat.color}-500/30 to-${stat.color}-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <motion.div
          className="flex space-x-1 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-2 border border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-mint-500 to-blue-500 text-white shadow-lg shadow-mint-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              {managementActions.map((action, index) => (
                <motion.button
                  key={action.title}
                  onClick={action.action}
                  className={`relative overflow-hidden bg-gradient-to-br ${action.bgGradient} backdrop-blur-xl rounded-2xl p-6 border border-slate-600/50 text-left group hover:border-${action.color}-500/50 transition-all duration-500`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full blur-2xl"></div>
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 bg-${action.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className={`w-6 h-6 text-${action.textColor}`} />
                      </div>
                      <ChevronRight className={`w-5 h-5 text-${action.textColor} group-hover:translate-x-1 transition-transform duration-300`} />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-white font-semibold text-lg">{action.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{action.description}</p>
                      <div className={`inline-flex items-center space-x-1 text-${action.textColor} text-xs font-medium`}>
                        <Zap className="w-3 h-3" />
                        <span>{action.stats}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header with Edit Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-mint-500/30 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-mint-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Facility Information</h2>
                    <p className="text-slate-400">Manage your facility details</p>
                  </div>
                </div>
                
                {!isEditing ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      onClick={() => setIsEditing(true)}
                      icon={Edit3}
                      className="bg-gradient-to-r from-mint-500/20 to-blue-500/20 border border-mint-500/30 hover:from-mint-500/30 hover:to-blue-500/30"
                    >
                      Edit Facility
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="flex space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
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
                  </motion.div>
                )}
              </div>

              <ErrorMessage message={error} show={!!error} />

              {/* Main Content Grid */}
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl rounded-2xl p-8 border border-slate-600/50">
                <div className="space-y-8">
                  {/* Description Section */}
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 text-lg font-semibold text-white">
                      <Edit3 className="w-5 h-5 text-mint-400" />
                      <span>Description</span>
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editData.description}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className="w-full p-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 resize-none h-32"
                        placeholder="Enter facility description..."
                      />
                    ) : (
                      <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/50">
                        <p className="text-white leading-relaxed text-lg">{facility.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Operating Hours Section */}
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 text-lg font-semibold text-white">
                      <Clock className="w-5 h-5 text-mint-400" />
                      <span>Operating Hours</span>
                    </label>
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-3">Opening Time</label>
                          <input
                            type="time"
                            value={editData.openingTime}
                            onChange={(e) => handleEditChange('openingTime', e.target.value)}
                            className="w-full p-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-3">Closing Time</label>
                          <input
                            type="time"
                            value={editData.closingTime}
                            onChange={(e) => handleEditChange('closingTime', e.target.value)}
                            className="w-full p-4 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-lg"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/50">
                        <div className="flex items-center justify-center space-x-12">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-mint-500/20 rounded-2xl flex items-center justify-center">
                              <Clock className="w-8 h-8 text-mint-400" />
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 mb-1">Opens at</p>
                              <p className="text-2xl font-bold text-white">{formatTime(facility.openingTime)}</p>
                            </div>
                          </div>
                          <div className="w-16 h-1 bg-gradient-to-r from-mint-400 to-blue-400 rounded-full"></div>
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                              <Clock className="w-8 h-8 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 mb-1">Closes at</p>
                              <p className="text-2xl font-bold text-white">{formatTime(facility.closingTime)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact & Location Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="flex items-center space-x-2 text-lg font-semibold text-white">
                        <Phone className="w-5 h-5 text-mint-400" />
                        <span>Contact Information</span>
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                              <Phone className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 mb-1">Phone Number</p>
                              <p className="text-white font-semibold text-lg">{facility.contactPhone}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                              <Mail className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 mb-1">Email Address</p>
                              <p className="text-white font-semibold text-lg break-all">{facility.contactEmail}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location Information */}
                    <div className="space-y-4">
                      <h3 className="flex items-center space-x-2 text-lg font-semibold text-white">
                        <MapPin className="w-5 h-5 text-mint-400" />
                        <span>Location Details</span>
                      </h3>
                      
                      <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/50">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-mint-500/20 rounded-xl flex items-center justify-center mt-1">
                            <MapPin className="w-6 h-6 text-mint-400" />
                          </div>
                          <div className="space-y-2 flex-1">
                            <div>
                              <p className="text-sm text-slate-400 mb-1">Street Address</p>
                              <p className="text-white font-semibold text-lg">{facility.address}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 mb-1">Ward & District</p>
                              <p className="text-slate-300 text-base">{facility.ward}, {facility.district}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 mb-1">City</p>
                              <p className="text-slate-300 text-base font-medium">{facility.city}</p>
                            </div>
                            {(facility.latitude !== 0 || facility.longtitude !== 0) && (
                              <div>
                                <p className="text-sm text-slate-400 mb-1">Coordinates</p>
                                <p className="text-slate-400 text-sm font-mono">
                                  📍 {facility.latitude}, {facility.longtitude}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl rounded-2xl p-8 border border-slate-600/50"
            >
              <div className="text-center py-16">
                <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Analytics Dashboard</h3>
                <p className="text-slate-400">Detailed analytics and reports will be available here</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};