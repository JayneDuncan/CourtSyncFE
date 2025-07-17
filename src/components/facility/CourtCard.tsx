import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit3, 
  Trash2, 
  Clock, 
  DollarSign, 
  Calendar,
  Image as ImageIcon,
  MoreVertical,
  Eye,
  Settings
} from 'lucide-react';

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

interface CourtCardProps {
  court: Court;
  index: number;
  formatCurrency: (amount: number) => string;
  formatTime: (time: string) => string;
  getDayTypeLabel: (dayType: string) => string;
}

export const CourtCard: React.FC<CourtCardProps> = ({ 
  court, 
  index, 
  formatCurrency, 
  formatTime, 
  getDayTypeLabel 
}) => {
  const [showPrices, setShowPrices] = useState(false);

  const getStatusColor = (status: string) => {
    return status === "1" 
      ? "bg-green-500/20 text-green-400 border-green-500/30" 
      : "bg-red-500/20 text-red-400 border-red-500/30";
  };

  const getStatusLabel = (status: string) => {
    return status === "1" ? "Active" : "Inactive";
  };

  return (
    <motion.div
      className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50 hover:border-mint-500/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      {/* Court Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{court.courtName}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(court.courtStatus)}`}>
            {getStatusLabel(court.courtStatus)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-slate-400 hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1 text-slate-400 hover:text-white transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="p-1 text-slate-400 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Court Images */}
      {court.images.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-1 text-slate-400 text-sm mb-2">
            <ImageIcon className="w-4 h-4" />
            <span>{court.images.length} image(s)</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {court.images.map((image) => (
              <img
                key={image.imageId}
                src={image.imageUrl}
                alt="Court"
                className="w-16 h-16 object-cover rounded-lg border border-slate-600/50"
              />
            ))}
          </div>
        </div>
      )}

      {/* Pricing Summary */}
      <div className="mb-4">
        <button
          onClick={() => setShowPrices(!showPrices)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-1 text-slate-300 text-sm">
            <DollarSign className="w-4 h-4" />
            <span>Pricing ({court.courtPrices.length} rates)</span>
          </div>
          <motion.div
            animate={{ rotate: showPrices ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{ height: showPrices ? 'auto' : 0, opacity: showPrices ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="mt-3 space-y-2">
            {court.courtPrices.map((price) => (
              <div
                key={price.courtPriceId}
                className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-mint-400">
                    {getDayTypeLabel(price.dayType)}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {formatCurrency(price.price)}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>
                    {formatTime(price.startTime)} - {formatTime(price.endTime)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-mint-500/20 text-mint-400 py-2 px-3 rounded-lg hover:bg-mint-500/30 transition-colors text-sm font-medium">
          Manage Pricing
        </button>
        <button className="p-2 bg-slate-700/50 text-slate-400 rounded-lg hover:text-white hover:bg-slate-700 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};