import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Building2, Users, Settings, BarChart3 } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { CreateFacilityModal } from '../components/facility/CreateFacilityModal';
import { FacilityCard } from '../components/facility/FacilityCard';

interface Facility {
  id: string;
  facilityName: string;
  address: string;
  city: string;
  status: 'active' | 'inactive';
  courtsCount: number;
}

export const FacilityOwnerDashboard: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: '1',
      facilityName: 'CourtSync Arena',
      address: '123 Nguyen Hue Street',
      city: 'Ho Chi Minh City',
      status: 'active',
      courtsCount: 8
    }
  ]);

  const stats = [
    { label: 'Total Facilities', value: facilities.length, icon: Building2, color: 'mint' },
    { label: 'Active Courts', value: facilities.reduce((sum, f) => sum + f.courtsCount, 0), icon: BarChart3, color: 'blue' },
    { label: 'Staff Members', value: 12, icon: Users, color: 'green' },
    { label: 'Monthly Revenue', value: '$15,420', icon: BarChart3, color: 'purple' }
  ];

  const handleCreateFacility = (facilityData: any) => {
    const newFacility: Facility = {
      id: Date.now().toString(),
      facilityName: facilityData.facilityName,
      address: facilityData.address,
      city: facilityData.city,
      status: 'active',
      courtsCount: 0
    };
    setFacilities([...facilities, newFacility]);
    setShowCreateModal(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Facility Management</h1>
            <p className="text-slate-300">Manage your badminton facilities and staff</p>
          </div>
          <motion.button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-mint-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Create Facility</span>
          </motion.button>
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

        {/* Facilities Grid */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Your Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                index={index}
              />
            ))}
            
            {/* Add New Facility Card */}
            <motion.div
              className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-dashed border-slate-600/50 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:border-mint-500/50 transition-all duration-300"
              onClick={() => setShowCreateModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: facilities.length * 0.1 }}
            >
              <Plus className="w-12 h-12 text-slate-500 mb-4" />
              <p className="text-slate-400 text-center">Add New Facility</p>
            </motion.div>
          </div>
        </div>

        {/* Create Facility Modal */}
        <CreateFacilityModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateFacility}
        />
      </div>
    </DashboardLayout>
  );
};