import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Settings, MoreVertical } from 'lucide-react';

interface Facility {
  id: string;
  facilityName: string;
  address: string;
  city: string;
  status: 'active' | 'inactive';
  courtsCount: number;
}

interface FacilityCardProps {
  facility: Facility;
  index: number;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility, index }) => {
  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-mint-500/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{facility.facilityName}</h3>
          <div className="flex items-center space-x-1 text-slate-400 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{facility.address}, {facility.city}</span>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          facility.status === 'active' 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {facility.status === 'active' ? 'Active' : 'Inactive'}
        </span>
        <div className="flex items-center space-x-1 text-slate-400 text-sm">
          <Users className="w-4 h-4" />
          <span>{facility.courtsCount} courts</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button 
          onClick={() => window.location.href = `/facility/${facility.id}`}
          className="flex-1 bg-mint-500/20 text-mint-400 py-2 px-4 rounded-xl hover:bg-mint-500/30 transition-colors text-sm font-medium"
        >
          Manage Facility
        </button>
        <button className="p-2 bg-slate-700/50 text-slate-400 rounded-xl hover:text-white hover:bg-slate-700 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};