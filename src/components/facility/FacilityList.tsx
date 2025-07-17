import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Plus,
  Edit,
  Eye,
  MoreVertical,
  Users,
  Calendar
} from 'lucide-react';
import { Facility } from '../../types';
import { Button } from '../ui/Button';

interface FacilityListProps {
  facilities: Facility[];
  onRegisterNew: () => void;
  onUpdate: (facilities: Facility[]) => void;
}

export const FacilityList: React.FC<FacilityListProps> = ({
  facilities,
  onRegisterNew,
  onUpdate
}) => {
  const [selectedFacility, setSelectedFacility] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'A': return 'text-green-400 bg-green-500/20';
      case 'I': return 'text-red-400 bg-red-500/20';
      case 'P': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'A': return 'Active';
      case 'I': return 'Inactive';
      case 'P': return 'Pending';
      default: return 'Unknown';
    }
  };

  if (facilities.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
        <Building2 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Facilities Yet</h3>
        <p className="text-slate-300 mb-6">
          Start by registering your first badminton facility to begin managing bookings.
        </p>
        <Button onClick={onRegisterNew} icon={Plus}>
          Register Your First Facility
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Your Facilities</h2>
          <p className="text-slate-300">Manage your badminton facilities</p>
        </div>
        <Button onClick={onRegisterNew} icon={Plus} className="mt-4 sm:mt-0 sm:w-auto">
          Register New Facility
        </Button>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {facilities.map((facility, index) => (
          <motion.div
            key={facility.FacilityID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-mint-500/30 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-mint-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{facility.FacilityName}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(facility.FacilityStatus)}`}>
                    {getStatusText(facility.FacilityStatus)}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setSelectedFacility(selectedFacility === facility.FacilityID ? null : facility.FacilityID)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                
                {selectedFacility === facility.FacilityID && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl z-10"
                  >
                    <div className="p-2">
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                        <span>Edit Facility</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                        <Users className="w-4 h-4" />
                        <span>Manage Staff</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                        <Calendar className="w-4 h-4" />
                        <span>View Bookings</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm mb-4 line-clamp-2">
              {facility.Description}
            </p>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-slate-300 text-sm">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{facility.Address}, {facility.Ward}, {facility.District}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-300 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{facility.ContactPhone}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-300 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{facility.ContactEmail}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-300 text-sm">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{facility.OpeningTime} - {facility.ClosingTime}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
              <div className="text-center">
                <p className="text-2xl font-bold text-mint-400">4</p>
                <p className="text-xs text-slate-400">Courts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">12</p>
                <p className="text-xs text-slate-400">Bookings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">2</p>
                <p className="text-xs text-slate-400">Staff</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};