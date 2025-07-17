import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Wrench,
  Search,
  Filter
} from 'lucide-react';
import { Court, Facility } from '../../types';
import { Button } from '../ui/Button';

interface CourtManagementProps {
  courts: Court[];
  facilities: Facility[];
  onUpdate: (courts: Court[]) => void;
}

export const CourtManagement: React.FC<CourtManagementProps> = ({
  courts,
  facilities,
  onUpdate
}) => {
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFacility, setFilterFacility] = useState<number | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<string | 'all'>('all');

  const filteredCourts = courts.filter(court => {
    const matchesSearch = court.CourtName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFacility = filterFacility === 'all' || court.FacilityID === filterFacility;
    const matchesStatus = filterStatus === 'all' || court.CourtStatus === filterStatus;
    
    return matchesSearch && matchesFacility && matchesStatus;
  });

  const getFacilityName = (facilityId: number) => {
    const facility = facilities.find(f => f.FacilityID === facilityId);
    return facility?.FacilityName || 'Unknown Facility';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'A': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'I': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'M': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'A': return 'Active';
      case 'I': return 'Inactive';
      case 'M': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'A': return Power;
      case 'I': return PowerOff;
      case 'M': return Wrench;
      default: return Power;
    }
  };

  const handleToggleStatus = (courtId: number, newStatus: 'A' | 'I' | 'M') => {
    const updatedCourts = courts.map(court =>
      court.CourtID === courtId
        ? { ...court, CourtStatus: newStatus }
        : court
    );
    onUpdate(updatedCourts);
    setSelectedCourt(null);
  };

  const handleDeleteCourt = (courtId: number) => {
    const updatedCourts = courts.filter(court => court.CourtID !== courtId);
    onUpdate(updatedCourts);
    setSelectedCourt(null);
  };

  const statusCounts = {
    total: courts.length,
    active: courts.filter(c => c.CourtStatus === 'A').length,
    inactive: courts.filter(c => c.CourtStatus === 'I').length,
    maintenance: courts.filter(c => c.CourtStatus === 'M').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Court Management</h2>
          <p className="text-slate-300">Manage courts across all your facilities</p>
        </div>
        <Button icon={Plus} className="mt-4 sm:mt-0 sm:w-auto">
          Add New Court
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm">Total Courts</p>
              <p className="text-2xl font-bold text-white">{statusCounts.total}</p>
            </div>
            <MapPin className="w-8 h-8 text-slate-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm">Active</p>
              <p className="text-2xl font-bold text-green-400">{statusCounts.active}</p>
            </div>
            <Power className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-300 text-sm">Inactive</p>
              <p className="text-2xl font-bold text-red-400">{statusCounts.inactive}</p>
            </div>
            <PowerOff className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 text-sm">Maintenance</p>
              <p className="text-2xl font-bold text-yellow-400">{statusCounts.maintenance}</p>
            </div>
            <Wrench className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search courts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white placeholder-slate-400"
            />
          </div>

          {/* Facility Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={filterFacility}
              onChange={(e) => setFilterFacility(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="pl-9 pr-8 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white appearance-none cursor-pointer"
            >
              <option value="all">All Facilities</option>
              {facilities.map(facility => (
                <option key={facility.FacilityID} value={facility.FacilityID}>
                  {facility.FacilityName}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="A">Active</option>
            <option value="I">Inactive</option>
            <option value="M">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Courts Grid */}
      {filteredCourts.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
          <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            {courts.length === 0 ? 'No Courts Yet' : 'No Courts Found'}
          </h3>
          <p className="text-slate-300 mb-6">
            {courts.length === 0 
              ? 'Add courts to your facilities to start accepting bookings.'
              : `No courts found matching your search criteria.`
            }
          </p>
          {courts.length === 0 && (
            <Button icon={Plus}>
              Add Your First Court
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map((court, index) => {
            const StatusIcon = getStatusIcon(court.CourtStatus);
            
            return (
              <motion.div
                key={court.CourtID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-mint-500/30 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getStatusColor(court.CourtStatus)}`}>
                      <StatusIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{court.CourtName}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(court.CourtStatus)}`}>
                        {getStatusText(court.CourtStatus)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={() => setSelectedCourt(selectedCourt === court.CourtID ? null : court.CourtID)}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {selectedCourt === court.CourtID && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl z-10"
                      >
                        <div className="p-2">
                          <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                            <span>Edit Court</span>
                          </button>
                          
                          {court.CourtStatus === 'A' && (
                            <>
                              <button 
                                onClick={() => handleToggleStatus(court.CourtID, 'I')}
                                className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                              >
                                <PowerOff className="w-4 h-4" />
                                <span>Disable Court</span>
                              </button>
                              <button 
                                onClick={() => handleToggleStatus(court.CourtID, 'M')}
                                className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                              >
                                <Wrench className="w-4 h-4" />
                                <span>Set Maintenance</span>
                              </button>
                            </>
                          )}
                          
                          {court.CourtStatus === 'I' && (
                            <button 
                              onClick={() => handleToggleStatus(court.CourtID, 'A')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-colors"
                            >
                              <Power className="w-4 h-4" />
                              <span>Enable Court</span>
                            </button>
                          )}
                          
                          {court.CourtStatus === 'M' && (
                            <button 
                              onClick={() => handleToggleStatus(court.CourtID, 'A')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-colors"
                            >
                              <Power className="w-4 h-4" />
                              <span>Complete Maintenance</span>
                            </button>
                          )}
                          
                          <button 
                            onClick={() => handleDeleteCourt(court.CourtID)}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Court</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Facility Info */}
                <div className="mb-4">
                  <p className="text-slate-300 text-sm flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{getFacilityName(court.FacilityID)}</span>
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
                  <div className="text-center">
                    <p className="text-xl font-bold text-mint-400">12</p>
                    <p className="text-xs text-slate-400">Today's Bookings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-blue-400">85%</p>
                    <p className="text-xs text-slate-400">Utilization</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};