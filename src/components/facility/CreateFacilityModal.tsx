import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, MapPin, Clock, Mail, Phone, User, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';

interface CreateFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface FacilityFormData {
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
  longitude: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

type Step = 'facility' | 'location' | 'hours' | 'staff';

export const CreateFacilityModal: React.FC<CreateFacilityModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState<Step>('facility');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState<FacilityFormData>({
    facilityName: '',
    description: '',
    contactPhone: '',
    contactEmail: '',
    openingTime: '06:00',
    closingTime: '22:00',
    address: '',
    ward: '',
    district: '',
    city: '',
    latitude: 0,
    longitude: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 'facility':
        if (!formData.facilityName || !formData.description || !formData.contactPhone || !formData.contactEmail) {
          setError('Please fill in all facility information');
          return false;
        }
        break;
      case 'location':
        if (!formData.address || !formData.ward || !formData.district || !formData.city) {
          setError('Please fill in all location information');
          return false;
        }
        break;
      case 'hours':
        if (!formData.openingTime || !formData.closingTime) {
          setError('Please set opening and closing hours');
          return false;
        }
        break;
      case 'staff':
        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.phone) {
          setError('Please fill in all staff information');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    
    const steps: Step[] = ['facility', 'location', 'hours', 'staff'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const steps: Step[] = ['facility', 'location', 'hours', 'staff'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(formData);
      // Reset form
      setFormData({
        facilityName: '',
        description: '',
        contactPhone: '',
        contactEmail: '',
        openingTime: '06:00',
        closingTime: '22:00',
        address: '',
        ward: '',
        district: '',
        city: '',
        latitude: 0,
        longitude: 0,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: ''
      });
      setCurrentStep('facility');
    }, 2000);
  };

  const renderFacilityStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <Building2 className="w-12 h-12 text-mint-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Facility Information</h3>
        <p className="text-slate-300 text-sm">Enter basic information about your facility</p>
      </div>

      <Input
        type="text"
        name="facilityName"
        value={formData.facilityName}
        onChange={handleInputChange}
        placeholder="Enter facility name"
        label="Facility Name"
        icon={Building2}
      />

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your facility..."
          className="w-full p-3 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 resize-none h-24"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          type="tel"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleInputChange}
          placeholder="Contact phone"
          label="Contact Phone"
          icon={Phone}
        />
        <Input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleInputChange}
          placeholder="Contact email"
          label="Contact Email"
          icon={Mail}
        />
      </div>
    </motion.div>
  );

  const renderLocationStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <MapPin className="w-12 h-12 text-mint-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Location Details</h3>
        <p className="text-slate-300 text-sm">Provide the complete address of your facility</p>
      </div>

      <Input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Street address"
        label="Address"
        icon={MapPin}
      />

      <div className="grid grid-cols-3 gap-3">
        <Input
          type="text"
          name="ward"
          value={formData.ward}
          onChange={handleInputChange}
          placeholder="Ward"
          label="Ward"
          icon={MapPin}
        />
        <Input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleInputChange}
          placeholder="District"
          label="District"
          icon={MapPin}
        />
        <Input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
          label="City"
          icon={MapPin}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          type="number"
          name="latitude"
          value={formData.latitude.toString()}
          onChange={handleInputChange}
          placeholder="Latitude"
          label="Latitude (Optional)"
          icon={MapPin}
        />
        <Input
          type="number"
          name="longitude"
          value={formData.longitude.toString()}
          onChange={handleInputChange}
          placeholder="Longitude"
          label="Longitude (Optional)"
          icon={MapPin}
        />
      </div>
    </motion.div>
  );

  const renderHoursStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <Clock className="w-12 h-12 text-mint-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Operating Hours</h3>
        <p className="text-slate-300 text-sm">Set your facility's opening and closing times</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Opening Time</label>
          <input
            type="time"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleInputChange}
            className="w-full p-3 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Closing Time</label>
          <input
            type="time"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleInputChange}
            className="w-full p-3 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white"
          />
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
        <h4 className="text-white font-medium mb-2">Operating Hours Preview</h4>
        <p className="text-slate-300 text-sm">
          Your facility will be open from <span className="text-mint-400 font-medium">{formData.openingTime}</span> to <span className="text-mint-400 font-medium">{formData.closingTime}</span> daily.
        </p>
      </div>
    </motion.div>
  );

  const renderStaffStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <User className="w-12 h-12 text-mint-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Create Staff Account</h3>
        <p className="text-slate-300 text-sm">Create an account for your facility manager</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First name"
          label="First Name"
          icon={User}
        />
        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last name"
          label="Last Name"
          icon={User}
        />
      </div>

      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Staff email"
        label="Email Address"
        icon={Mail}
      />

      <Input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone number"
        label="Phone Number"
        icon={Phone}
      />

      <div className="relative">
        <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create password"
            className="w-full pl-9 pr-10 py-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500"
          />
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-mint-400 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const getStepContent = () => {
    switch (currentStep) {
      case 'facility': return renderFacilityStep();
      case 'location': return renderLocationStep();
      case 'hours': return renderHoursStep();
      case 'staff': return renderStaffStep();
      default: return renderFacilityStep();
    }
  };

  const steps = ['facility', 'location', 'hours', 'staff'];
  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;

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
            <h2 className="text-lg font-semibold text-white">Create New Facility</h2>
            <p className="text-slate-400 text-sm">Step {currentStepIndex + 1} of {steps.length}</p>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStepIndex ? 'bg-gradient-to-r from-mint-500 to-blue-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Error Message */}
        <ErrorMessage message={error} show={!!error} />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {getStepContent()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex space-x-3 mt-6">
          {currentStepIndex > 0 && (
            <Button
              variant="secondary"
              onClick={handlePrevious}
              icon={ArrowLeft}
              className="flex-1"
            >
              Previous
            </Button>
          )}
          
          {isLastStep ? (
            <Button
              onClick={handleSubmit}
              loading={isLoading}
              icon={ArrowRight}
              className="flex-1"
            >
              Create Facility
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              icon={ArrowRight}
              className="flex-1"
            >
              Next
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};