import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Lock,
  Building2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { StaffFormData, Facility, User as UserType } from '../../types';

interface CreateStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilities: Facility[];
  onSuccess: (staff: UserType) => void;
}

export const CreateStaffModal: React.FC<CreateStaffModalProps> = ({
  isOpen,
  onClose,
  facilities,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<StaffFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    facilityID: facilities[0]?.FacilityID || 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, password });
  };

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter first and last name');
      return false;
    }
    
    if (!formData.email) {
      setError('Please enter email address');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!formData.phoneNumber) {
      setError('Please enter phone number');
      return false;
    }
    
    if (!formData.password) {
      setError('Please enter password');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    if (!formData.facilityID) {
      setError('Please select a facility');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const newStaff: UserType = {
        UserID: Date.now(), // Mock ID
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        Password: formData.password,
        PhoneNumber: formData.phoneNumber,
        Role: 'S',
        UserStatus: 'A',
        Balance: 0
      };

      onSuccess(newStaff);
      handleClose();
      setIsLoading(false);
    }, 2000);
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      facilityID: facilities[0]?.FacilityID || 0
    });
    setError('');
    setShowPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Create Staff Account</h2>
            <p className="text-slate-400 text-sm">Add a new staff member to your facility</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <ErrorMessage message={error} show={!!error} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              label="First Name *"
              icon={User}
            />
            
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              label="Last Name *"
              icon={User}
            />
          </div>

          {/* Email */}
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            label="Email Address *"
            icon={Mail}
          />

          {/* Phone */}
          <Input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            label="Phone Number *"
            icon={Phone}
          />

          {/* Facility Selection */}
          <div className="group">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Assign to Facility *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-mint-400 transition-colors" />
              <select
                name="facilityID"
                value={formData.facilityID}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm hover:border-slate-600/50 focus:bg-slate-800/70 focus:shadow-lg focus:shadow-mint-500/10"
              >
                <option value="">Select a facility</option>
                {facilities.map((facility) => (
                  <option key={facility.FacilityID} value={facility.FacilityID}>
                    {facility.FacilityName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="group">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-mint-400 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="w-full pl-9 pr-20 py-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 hover:border-slate-600/50 focus:bg-slate-800/70 focus:shadow-lg focus:shadow-mint-500/10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-mint-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-xs text-mint-400 hover:text-mint-300 transition-colors font-medium"
                >
                  Gen
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Minimum 8 characters. Click "Gen" to generate a secure password.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isLoading}
            icon={Save}
            className="mt-6"
          >
            Create Staff Account
          </Button>
        </form>

        {/* Info */}
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-blue-300 text-sm">
            <strong>Note:</strong> The staff member will receive login credentials via email. 
            They can change their password after first login.
          </p>
        </div>
      </motion.div>
    </div>
  );
};