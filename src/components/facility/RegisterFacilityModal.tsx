import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Save,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { FacilityFormData, Facility } from '../../types';

interface RegisterFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (facility: Facility) => void;
}

type Step = 'basic' | 'contact' | 'location' | 'hours';

export const RegisterFacilityModal: React.FC<RegisterFacilityModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FacilityFormData>({
    facilityName: '',
    description: '',
    contactPhone: '',
    contactEmail: '',
    openingTime: '06:00',
    closingTime: '23:00',
    address: '',
    ward: '',
    district: '',
    city: 'Ho Chi Minh City',
    latitude: undefined,
    longitude: undefined
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
      case 'basic':
        return !!(formData.facilityName && formData.description);
      case 'contact':
        return !!(formData.contactPhone && formData.contactEmail);
      case 'location':
        return !!(formData.address && formData.ward && formData.district && formData.city);
      case 'hours':
        return !!(formData.openingTime && formData.closingTime);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      setError('Please fill in all required fields');
      return;
    }

    const steps: Step[] = ['basic', 'contact', 'location', 'hours'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      setError('');
    }
  };

  const handlePrevious = () => {
    const steps: Step[] = ['basic', 'contact', 'location', 'hours'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const newFacility: Facility = {
        FacilityID: Date.now(), // Mock ID
        FacilityName: formData.facilityName,
        Description: formData.description,
        ContactPhone: formData.contactPhone,
        ContactEmail: formData.contactEmail,
        OpeningTime: formData.openingTime,
        ClosingTime: formData.closingTime,
        Address: formData.address,
        Ward: formData.ward,
        District: formData.district,
        City: formData.city,
        Latitude: formData.latitude || 0,
        Longtitude: formData.longitude || 0,
        FacilityStatus: 'P', // Pending approval
        OwnerID: 1 // Mock owner ID
      };

      onSuccess(newFacility);
      handleClose();
      setIsLoading(false);
    }, 2000);
  };

  const handleClose = () => {
    setCurrentStep('basic');
    setFormData({
      facilityName: '',
      description: '',
      contactPhone: '',
      contactEmail: '',
      openingTime: '06:00',
      closingTime: '23:00',
      address: '',
      ward: '',
      district: '',
      city: 'Ho Chi Minh City',
      latitude: undefined,
      longitude: undefined
    });
    setError('');
    onClose();
  };

  const steps = [
    { id: 'basic', title: 'Basic Information', icon: Building2 },
    { id: 'contact', title: 'Contact Details', icon: Phone },
    { id: 'location', title: 'Location', icon: MapPin },
    { id: 'hours', title: 'Operating Hours', icon: Clock }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div className="space-y-4">
            <Input
              type="text"
              name="facilityName"
              value={formData.facilityName}
              onChange={handleInputChange}
              placeholder="Enter facility name"
              label="Facility Name *"
              icon={Building2}
            />
            
            <div className="group">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your facility..."
                className="w-full p-3 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 hover:border-slate-600/50 focus:bg-slate-800/70 focus:shadow-lg focus:shadow-mint-500/10 resize-none"
                rows={4}
              />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <Input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              label="Contact Phone *"
              icon={Phone}
            />
            
            <Input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="Enter email address"
              label="Contact Email *"
              icon={Mail}
            />
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4">
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter street address"
              label="Street Address *"
              icon={MapPin}
            />
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="text"
                name="ward"
                value={formData.ward}
                onChange={handleInputChange}
                placeholder="Ward"
                label="Ward *"
                icon={MapPin}
              />
              
              <Input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="District"
                label="District *"
                icon={MapPin}
              />
            </div>
            
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              label="City *"
              icon={MapPin}
            />
          </div>
        );

      case 'hours':
        return (
          <div className="space-y-4">
            <Input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleInputChange}
              placeholder=""
              label="Opening Time *"
              icon={Clock}
            />
            
            <Input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleInputChange}
              placeholder=""
              label="Closing Time *"
              icon={Clock}
            />
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <p className="text-blue-300 text-sm">
                <strong>Note:</strong> Operating hours will be used for booking availability. 
                Make sure to set realistic hours that your staff can manage.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-xl font-bold text-white">Register New Facility</h2>
            <p className="text-slate-400 text-sm">Step {steps.findIndex(s => s.id === currentStep) + 1} of {steps.length}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
              
              return (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-mint-500 bg-mint-500/20 text-mint-400' 
                      : isCompleted
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : 'border-slate-600 text-slate-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 transition-all duration-300 ${
                      isCompleted ? 'bg-green-500' : 'bg-slate-600'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              {steps.find(s => s.id === currentStep)?.title}
            </h3>
          </div>

          <ErrorMessage message={error} show={!!error} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex space-x-3 mt-6">
            {currentStep !== 'basic' && (
              <Button
                variant="secondary"
                onClick={handlePrevious}
                icon={ArrowLeft}
                className="flex-1"
              >
                Previous
              </Button>
            )}
            
            {currentStep === 'hours' ? (
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                icon={Save}
                className="flex-1"
              >
                Register Facility
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
        </div>
      </motion.div>
    </div>
  );
};