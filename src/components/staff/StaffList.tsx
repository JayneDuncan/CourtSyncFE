import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus,
  Mail,
  Phone,
  Building2,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Search
} from 'lucide-react';
import { User, Facility } from '../../types';
import { Button } from '../ui/Button';

interface StaffListProps {
  staff: User[];
  facilities: Facility[];
  onCreateNew: () => void;
  onUpdate: (staff: User[]) => void;
}

export const StaffList: React.FC<StaffListProps> = ({
  staff,
  facilities,
  onCreateNew,
  onUpdate
}) => {
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = staff.filter(member =>
    `${member.FirstName} ${member.LastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFacilityName = (staffId: number) => {
    // In real app, you'd have a proper relationship
    // For now, we'll just return a mock facility name
    return facilities[0]?.FacilityName || 'Unassigned';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'A': return 'text-green-400 bg-green-500/20';
      case 'I': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'A': return 'Active';
      case 'I': return 'Inactive';
      default: return 'Unknown';
    }
  };

  const handleToggleStatus = (staffId: number) => {
    const updatedStaff = staff.map(member =>
      member.UserID === staffId
        ? { ...member, UserStatus: member.UserStatus === 'A' ? 'I' : 'A' }
        : member
    );
    onUpdate(updatedStaff);
    setSelectedStaff(null);
  };

  const handleDeleteStaff = (staffId: number) => {
    const updatedStaff = staff.filter(member => member.UserID !== staffId);
    onUpdate(updatedStaff);
    setSelectedStaff(null);
  };

  if (staff.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
        <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Staff Members Yet</h3>
        <p className="text-slate-300 mb-6">
          Create staff accounts to help manage your facilities and handle bookings.
        </p>
        <Button onClick={onCreateNew} icon={Plus}>
          Create First Staff Account
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Staff Management</h2>
          <p className="text-slate-300">Manage your facility staff members</p>
        </div>
        <Button onClick={onCreateNew} icon={Plus} className="mt-4 sm:mt-0 sm:w-auto">
          Add New Staff
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search staff members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white placeholder-slate-400"
        />
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member, index) => (
          <motion.div
            key={member.UserID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-mint-500/30 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {member.FirstName.charAt(0)}{member.LastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {member.FirstName} {member.LastName}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.UserStatus)}`}>
                    {getStatusText(member.UserStatus)}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setSelectedStaff(selectedStaff === member.UserID ? null : member.UserID)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                
                {selectedStaff === member.UserID && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl z-10"
                  >
                    <div className="p-2">
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                        <span>Edit Details</span>
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(member.UserID)}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        {member.UserStatus === 'A' ? (
                          <>
                            <UserX className="w-4 h-4" />
                            <span>Deactivate</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-4 h-4" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => handleDeleteStaff(member.UserID)}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-slate-300 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="truncate">{member.Email}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-300 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{member.PhoneNumber}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-300 text-sm">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{getFacilityName(member.UserID)}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
              <div className="text-center">
                <p className="text-xl font-bold text-mint-400">8</p>
                <p className="text-xs text-slate-400">Shifts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-blue-400">24</p>
                <p className="text-xs text-slate-400">Check-ins</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredStaff.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-300">No staff members found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};