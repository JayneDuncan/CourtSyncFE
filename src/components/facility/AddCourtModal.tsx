import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, DollarSign, Clock, Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';

interface AddCourtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  facilityId: number;
}

interface CourtPrice {
  dayType: string;
  startTime: string;
  endTime: string;
  price: number;
}

interface CourtFormData {
  courtName: string;
  courtPrices: CourtPrice[];
}

export const AddCourtModal: React.FC<AddCourtModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  facilityId 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<CourtFormData>({
    courtName: '',
    courtPrices: [
      {
        dayType: "1",
        startTime: "06:00",
        endTime: "12:00",
        price: 50000
      }
    ]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handlePriceChange = (index: number, field: keyof CourtPrice, value: string | number) => {
    const updatedPrices = [...formData.courtPrices];
    updatedPrices[index] = {
      ...updatedPrices[index],
      [field]: value
    };
    setFormData({
      ...formData,
      courtPrices: updatedPrices
    });
  };

  const addPriceSlot = () => {
    setFormData({
      ...formData,
      courtPrices: [
        ...formData.courtPrices,
        {
          dayType: "1",
          startTime: "12:00",
          endTime: "18:00",
          price: 80000
        }
      ]
    });
  };

  const removePriceSlot = (index: number) => {
    if (formData.courtPrices.length > 1) {
      const updatedPrices = formData.courtPrices.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        courtPrices: updatedPrices
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.courtName.trim()) {
      setError('Please enter court name');
      return;
    }

    if (formData.courtPrices.length === 0) {
      setError('Please add at least one pricing slot');
      return;
    }

    // Validate pricing slots
    for (let i = 0; i < formData.courtPrices.length; i++) {
      const price = formData.courtPrices[i];
      if (!price.startTime || !price.endTime || price.price <= 0) {
        setError(`Please complete pricing slot ${i + 1}`);
        return;
      }
      if (price.startTime >= price.endTime) {
        setError(`Invalid time range in pricing slot ${i + 1}`);
        return;
      }
    }

    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(formData);
      // Reset form
      setFormData({
        courtName: '',
        courtPrices: [
          {
            dayType: "1",
            startTime: "06:00",
            endTime: "12:00",
            price: 50000
          }
        ]
      });
    }, 1500);
  };

  const handleClose = () => {
    setFormData({
      courtName: '',
      courtPrices: [
        {
          dayType: "1",
          startTime: "06:00",
          endTime: "12:00",
          price: 50000
        }
      ]
    });
    setError('');
    onClose();
  };

  const getDayTypeLabel = (dayType: string) => {
    return dayType === "1" ? "Weekday" : "Weekend";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Add New Court</h2>
            <p className="text-slate-400 text-sm">Create a new court for your facility</p>
          </div>
          <button
            onClick={handleClose}
            className="w-6 h-6 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Error Message */}
        <ErrorMessage message={error} show={!!error} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Court Name */}
          <div>
            <Input
              type="text"
              name="courtName"
              value={formData.courtName}
              onChange={handleInputChange}
              placeholder="Enter court name (e.g., Court 1, VIP Court)"
              label="Court Name"
              icon={Users}
            />
          </div>

          {/* Pricing Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-mint-400" />
                <span>Pricing Configuration</span>
              </h3>
              <Button
                type="button"
                variant="secondary"
                onClick={addPriceSlot}
                icon={Plus}
              >
                Add Price Slot
              </Button>
            </div>

            <div className="space-y-4">
              {formData.courtPrices.map((price, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium">Price Slot {index + 1}</h4>
                    {formData.courtPrices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePriceSlot(index)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Day Type */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Day Type</label>
                      <select
                        value={price.dayType}
                        onChange={(e) => handlePriceChange(index, 'dayType', e.target.value)}
                        className="w-full p-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm"
                      >
                        <option value="1">Weekday</option>
                        <option value="2">Weekend</option>
                      </select>
                    </div>

                    {/* Start Time */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Start Time</label>
                      <input
                        type="time"
                        value={price.startTime}
                        onChange={(e) => handlePriceChange(index, 'startTime', e.target.value)}
                        className="w-full p-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm"
                      />
                    </div>

                    {/* End Time */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">End Time</label>
                      <input
                        type="time"
                        value={price.endTime}
                        onChange={(e) => handlePriceChange(index, 'endTime', e.target.value)}
                        className="w-full p-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Price (VND)</label>
                      <input
                        type="number"
                        value={price.price}
                        onChange={(e) => handlePriceChange(index, 'price', parseInt(e.target.value) || 0)}
                        className="w-full p-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm"
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>

                  {/* Price Preview */}
                  <div className="mt-3 p-3 bg-slate-700/30 rounded-lg">
                    <p className="text-slate-300 text-sm">
                      <span className="text-mint-400 font-medium">{getDayTypeLabel(price.dayType)}</span>
                      {' • '}
                      <span className="text-white">{price.startTime} - {price.endTime}</span>
                      {' • '}
                      <span className="text-white font-semibold">{formatCurrency(price.price)} VND</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              icon={Plus}
              className="flex-1"
            >
              Create Court
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};