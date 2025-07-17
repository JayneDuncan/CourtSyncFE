import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit3, 
  Save, 
  X, 
  Clock, 
  FileText, 
  Plus,
  MapPin,
  Phone,
  Mail,
  Building2,
  Users,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  Trash2,
  Settings
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CourtCard } from '../components/facility/CourtCard';
import { AddCourtModal } from '../components/facility/AddCourtModal';

interface Facility {
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

interface CourtPrice {
  courtPriceId: number;
  dayType: string;
  startTime: string;
  endTime: string;
  courtPriceStatus: string;
  price: number;
  courtId: number;
}

interface Court {
  courtId: number;
  courtName: string;
  courtStatus: string;
  facilityId: number;
  courtPrices: CourtPrice[];
  images: Array<{
    imageId: number;
    imageUrl: string;
  }>;
}

export const FacilityManagementPage: React.FC = () => {
  const [facility, setFacility] = useState<Facility>({
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

  const [courts, setCourts] = useState<Court[]>([
    {
      courtId: 2,
      courtName: "San 3",
      courtStatus: "1",
      facilityId: 1,
      courtPrices: [
        {
          courtPriceId: 5,
          dayType: "1",
          startTime: "00:00:00",
          endTime: "12:00:00",
          courtPriceStatus: "1",
          price: 30000,
          courtId: 2
        },
        {
          courtPriceId: 6,
          dayType: "1",
          startTime: "12:00:00",
          endTime: "22:00:00",
          courtPriceStatus: "1",
          price: 150000,
          courtId: 2
        },
        {
          courtPriceId: 7,
          dayType: "2",
          startTime: "00:00:00",
          endTime: "12:00:00",
          courtPriceStatus: "1",
          price: 45000,
          courtId: 2
        },
        {
          courtPriceId: 8,
          dayType: "2",
          startTime: "12:00:00",
          endTime: "22:00:00",
          courtPriceStatus: "1",
          price: 100000,
          courtId: 2
        }
      ],
      images: [
        {
          imageId: 2,
          imageUrl: "https://images.pexels.com/photos/163444/sport-tenis-ball-tennis-163444.jpeg"
        }
      ]
    }
  ]);

  const [isEditingGeneral, setIsEditingGeneral] = useState(false);
  const [showAddCourtModal, setShowAddCourtModal] = useState(false);
  const [editedFacility, setEditedFacility] = useState<Partial<Facility>>({});

  const handleEditGeneral = () => {
    setIsEditingGeneral(true);
    setEditedFacility({
      description: facility.description,
      openingTime: facility.openingTime,
      closingTime: facility.closingTime
    });
  };

  const handleSaveGeneral = () => {
    setFacility({
      ...facility,
      ...editedFacility
    });
    setIsEditingGeneral(false);
    setEditedFacility({});
  };

  const handleCancelEdit = () => {
    setIsEditingGeneral(false);
    setEditedFacility({});
  };

  const handleAddCourt = (courtData: any) => {
    const newCourt: Court = {
      courtId: Date.now(),
      courtName: courtData.courtName,
      courtStatus: "1",
      facilityId: facility.facilityId,
      courtPrices: courtData.courtPrices || [],
      images: []
    };
    setCourts([...courts, newCourt]);
    setShowAddCourtModal(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  const getDayTypeLabel = (dayType: string) => {
    return dayType === "1" ? "Weekday" : "Weekend";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">{facility.facilityName}</h1>
              <p className="text-slate-300">Facility Management</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              icon={Settings}
            >
              Settings
            </Button>
          </div>
        </div>

        {/* Facility General Information */}
        <motion.div
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-mint-400" />
              <span>General Information</span>
            </h2>
            {!isEditingGeneral ? (
              <Button
                variant="secondary"
                onClick={handleEditGeneral}
                icon={Edit3}
              >
                Edit
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  onClick={handleCancelEdit}
                  icon={X}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveGeneral}
                  icon={Save}
                >
                  Save
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Facility Name</label>
                <p className="text-white bg-slate-700/30 p-3 rounded-xl">{facility.facilityName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                {isEditingGeneral ? (
                  <textarea
                    value={editedFacility.description || ''}
                    onChange={(e) => setEditedFacility({...editedFacility, description: e.target.value})}
                    className="w-full p-3 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm resize-none h-24"
                  />
                ) : (
                  <p className="text-white bg-slate-700/30 p-3 rounded-xl min-h-[96px]">{facility.description}</p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>Contact Phone</span>
                </label>
                <p className="text-white bg-slate-700/30 p-3 rounded-xl">{facility.contactPhone}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>Contact Email</span>
                </label>
                <p className="text-white bg-slate-700/30 p-3 rounded-xl">{facility.contactEmail}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Address</span>
                </label>
                <p className="text-white bg-slate-700/30 p-3 rounded-xl">
                  {facility.address}, {facility.ward}, {facility.district}, {facility.city}
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Opening Time</span>
                </label>
                {isEditingGeneral ? (
                  <input
                    type="time"
                    value={editedFacility.openingTime || ''}
                    onChange={(e) => setEditedFacility({...editedFacility, openingTime: e.target.value})}
                    className="w-full p-3 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white"
                  />
                ) : (
                  <p className="text-white bg-slate-700/30 p-3 rounded-xl">{formatTime(facility.openingTime)}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Closing Time</span>
                </label>
                {isEditingGeneral ? (
                  <input
                    type="time"
                    value={editedFacility.closingTime || ''}
                    onChange={(e) => setEditedFacility({...editedFacility, closingTime: e.target.value})}
                    className="w-full p-3 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white"
                  />
                ) : (
                  <p className="text-white bg-slate-700/30 p-3 rounded-xl">{formatTime(facility.closingTime)}</p>
                )}
              </div>

              <div className="bg-mint-500/10 border border-mint-500/30 rounded-xl p-3">
                <p className="text-mint-400 text-sm font-medium">Operating Hours</p>
                <p className="text-white text-sm">
                  {formatTime(facility.openingTime)} - {formatTime(facility.closingTime)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Courts Section */}
        <motion.div
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-mint-400" />
              <span>Courts Management</span>
              <span className="bg-mint-500/20 text-mint-400 px-2 py-1 rounded-full text-sm">
                {courts.length} courts
              </span>
            </h2>
            <Button
              onClick={() => setShowAddCourtModal(true)}
              icon={Plus}
            >
              Add Court
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courts.map((court, index) => (
              <CourtCard
                key={court.courtId}
                court={court}
                index={index}
                formatCurrency={formatCurrency}
                formatTime={formatTime}
                getDayTypeLabel={getDayTypeLabel}
              />
            ))}
          </div>
        </motion.div>

        {/* Add Court Modal */}
        <AddCourtModal
          isOpen={showAddCourtModal}
          onClose={() => setShowAddCourtModal(false)}
          onSubmit={handleAddCourt}
          facilityId={facility.facilityId}
        />
      </div>
    </DashboardLayout>
  );
};