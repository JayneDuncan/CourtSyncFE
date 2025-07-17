import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Calendar, 
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
  MapPin
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatsCard } from '../components/dashboard/StatsCard';
import { FacilityList } from '../components/facility/FacilityList';
import { StaffList } from '../components/staff/StaffList';
import { CourtManagement } from '../components/court/CourtManagement';
import { RegisterFacilityModal } from '../components/facility/RegisterFacilityModal';
import { CreateStaffModal } from '../components/staff/CreateStaffModal';
import { DashboardStats, Facility, User, Court } from '../types';

type TabType = 'overview' | 'facilities' | 'staff' | 'courts';

export const FacilityOwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showRegisterFacility, setShowRegisterFacility] = useState(false);
  const [showCreateStaff, setShowCreateStaff] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalFacilities: 0,
    totalCourts: 0,
    totalStaff: 0,
    activeCourts: 0,
    inactiveCourts: 0,
    monthlyRevenue: 0,
    totalBookings: 0
  });
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [staff, setStaff] = useState<User[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API calls
      setTimeout(() => {
        setStats({
          totalFacilities: 3,
          totalCourts: 12,
          totalStaff: 8,
          activeCourts: 10,
          inactiveCourts: 2,
          monthlyRevenue: 45000000,
          totalBookings: 156
        });

        setFacilities([
          {
            FacilityID: 1,
            FacilityName: "CourtSync Arena 1",
            Description: "Premium badminton facility with 6 courts",
            ContactPhone: "+84 123 456 789",
            ContactEmail: "arena1@courtsync.com",
            OpeningTime: "06:00",
            ClosingTime: "23:00",
            Address: "123 Nguyen Van Linh",
            Ward: "An Phu",
            District: "District 2",
            City: "Ho Chi Minh City",
            Latitude: 10.7769,
            Longtitude: 106.6951,
            FacilityStatus: 'A',
            OwnerID: 1
          },
          {
            FacilityID: 2,
            FacilityName: "CourtSync Arena 2",
            Description: "Modern facility with 4 courts",
            ContactPhone: "+84 987 654 321",
            ContactEmail: "arena2@courtsync.com",
            OpeningTime: "07:00",
            ClosingTime: "22:00",
            Address: "456 Le Van Sy",
            Ward: "Ward 1",
            District: "District 3",
            City: "Ho Chi Minh City",
            Latitude: 10.7829,
            Longtitude: 106.6893,
            FacilityStatus: 'A',
            OwnerID: 1
          }
        ]);

        setStaff([
          {
            UserID: 2,
            FirstName: "Nguyen",
            LastName: "Van A",
            Email: "staff1@courtsync.com",
            Password: "",
            PhoneNumber: "+84 111 222 333",
            Role: 'S',
            UserStatus: 'A',
            Balance: 0
          },
          {
            UserID: 3,
            FirstName: "Tran",
            LastName: "Thi B",
            Email: "staff2@courtsync.com",
            Password: "",
            PhoneNumber: "+84 444 555 666",
            Role: 'S',
            UserStatus: 'A',
            Balance: 0
          }
        ]);

        setCourts([
          {
            CourtID: 1,
            CourtName: "Court A1",
            CourtStatus: 'A',
            FacilityID: 1
          },
          {
            CourtID: 2,
            CourtName: "Court A2",
            CourtStatus: 'A',
            FacilityID: 1
          },
          {
            CourtID: 3,
            CourtName: "Court B1",
            CourtStatus: 'I',
            FacilityID: 2
          }
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'facilities', label: 'Facilities', icon: Building2 },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'courts', label: 'Courts', icon: MapPin }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Facilities"
                value={stats.totalFacilities}
                icon={Building2}
                color="blue"
                trend="+12%"
              />
              <StatsCard
                title="Total Courts"
                value={stats.totalCourts}
                icon={MapPin}
                color="green"
                trend="+8%"
              />
              <StatsCard
                title="Staff Members"
                value={stats.totalStaff}
                icon={Users}
                color="purple"
                trend="+5%"
              />
              <StatsCard
                title="Monthly Revenue"
                value={`${(stats.monthlyRevenue / 1000000).toFixed(1)}M VND`}
                icon={TrendingUp}
                color="mint"
                trend="+15%"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                  onClick={() => setShowRegisterFacility(true)}
                  className="p-4 bg-gradient-to-r from-mint-500 to-blue-500 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-5 h-5" />
                  <span>Register New Facility</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setShowCreateStaff(true)}
                  className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Users className="w-5 h-5" />
                  <span>Add New Staff</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setActiveTab('courts')}
                  className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Settings className="w-5 h-5" />
                  <span>Manage Courts</span>
                </motion.button>
              </div>
            </div>
          </div>
        );

      case 'facilities':
        return (
          <FacilityList 
            facilities={facilities}
            onRegisterNew={() => setShowRegisterFacility(true)}
            onUpdate={setFacilities}
          />
        );

      case 'staff':
        return (
          <StaffList 
            staff={staff}
            facilities={facilities}
            onCreateNew={() => setShowCreateStaff(true)}
            onUpdate={setStaff}
          />
        );

      case 'courts':
        return (
          <CourtManagement 
            courts={courts}
            facilities={facilities}
            onUpdate={setCourts}
          />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-mint-500/30 border-t-mint-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Facility Owner Dashboard</h1>
            <p className="text-slate-300">Manage your badminton facilities and staff</p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <motion.button
              onClick={() => setShowRegisterFacility(true)}
              className="px-4 py-2 bg-gradient-to-r from-mint-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              <span>New Facility</span>
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-1 border border-white/20">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-mint-500 to-blue-500 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>

      {/* Modals */}
      <RegisterFacilityModal
        isOpen={showRegisterFacility}
        onClose={() => setShowRegisterFacility(false)}
        onSuccess={(newFacility) => {
          setFacilities(prev => [...prev, newFacility]);
          setStats(prev => ({ ...prev, totalFacilities: prev.totalFacilities + 1 }));
        }}
      />

      <CreateStaffModal
        isOpen={showCreateStaff}
        onClose={() => setShowCreateStaff(false)}
        facilities={facilities}
        onSuccess={(newStaff) => {
          setStaff(prev => [...prev, newStaff]);
          setStats(prev => ({ ...prev, totalStaff: prev.totalStaff + 1 }));
        }}
      />
    </DashboardLayout>
  );
};