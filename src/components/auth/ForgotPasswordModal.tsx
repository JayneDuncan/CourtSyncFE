import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowLeft, ArrowRight, Shield, Clock, Phone } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'method' | 'email' | 'otp' | 'reset' | 'success';

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<Step>('method');
  const [selectedMethod, setSelectedMethod] = useState<'email-otp' | 'phone-otp' | 'email-link'>('email-otp');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  const handleMethodSelect = (method: 'email-otp' | 'phone-otp' | 'email-link') => {
    setSelectedMethod(method);
    if (method === 'phone-otp') {
      setCurrentStep('phone');
    } else {
      setCurrentStep('email');
    }
  };

  const handlePhoneSubmit = async () => {
    if (!phone) {
      setError('Please enter your phone number');
      return;
    }
    
    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('otp');
      setCountdown(60);
      startCountdown();
    }, 2000);
  };

  const handleEmailSubmit = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (selectedMethod === 'email-otp') {
        setCurrentStep('otp');
        setCountdown(60);
        startCountdown();
      } else {
        setCurrentStep('success');
      }
    }, 2000);
  };

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter the complete OTP code');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('reset');
    }, 1500);
  };

  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('success');
    }, 2000);
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    
    setCountdown(60);
    startCountdown();
    // Simulate resend API call
  };

  const resetModal = () => {
    setCurrentStep('method');
    setEmail('');
    setPhone('');
    setOtp(['', '', '', '', '', '']);
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setCountdown(0);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const renderMethodSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Reset Your Password</h3>
        <p className="text-slate-300 text-sm">Choose how you'd like to reset your password</p>
      </div>

      <div className="space-y-3">
        <motion.button
          onClick={() => handleMethodSelect('email-otp')}
          className="w-full p-4 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl hover:border-mint-500/50 transition-all duration-300 text-left group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-mint-500/20 rounded-lg flex items-center justify-center group-hover:bg-mint-500/30 transition-colors">
              <Shield className="w-5 h-5 text-mint-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">Email OTP</h4>
              <p className="text-slate-400 text-sm">Receive a 6-digit code via email</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          onClick={() => handleMethodSelect('phone-otp')}
          className="w-full p-4 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl hover:border-mint-500/50 transition-all duration-300 text-left group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <Phone className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">SMS OTP</h4>
              <p className="text-slate-400 text-sm">Receive a 6-digit code via SMS</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          onClick={() => handleMethodSelect('email-link')}
          className="w-full p-4 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl hover:border-mint-500/50 transition-all duration-300 text-left group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">Email Reset Link</h4>
              <p className="text-slate-400 text-sm">Get a secure reset link via email</p>
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );

  const renderPhoneStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Enter Your Phone Number</h3>
        <p className="text-slate-300 text-sm">
          We'll send you a 6-digit verification code via SMS
        </p>
      </div>

      <ErrorMessage message={error} show={!!error} />

      <Input
        type="tel"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone number"
        label="Phone Number"
        icon={Phone}
      />

      <div className="text-xs text-slate-400">
        <p>Enter your phone number with country code (e.g., +84 123 456 789)</p>
      </div>

      <div className="flex space-x-3">
        <Button
          variant="secondary"
          onClick={() => setCurrentStep('method')}
          icon={ArrowLeft}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handlePhoneSubmit}
          loading={isLoading}
          icon={ArrowRight}
          className="flex-1"
        >
          Send SMS
        </Button>
      </div>
    </motion.div>
  );

  const renderEmailStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Enter Your Email</h3>
        <p className="text-slate-300 text-sm">
          {selectedMethod === 'email-otp' 
            ? 'We\'ll send you a 6-digit verification code' 
            : 'We\'ll send you a secure reset link'
          }
        </p>
      </div>

      <ErrorMessage message={error} show={!!error} />

      <Input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        label="Email Address"
        icon={Mail}
      />

      <div className="flex space-x-3">
        <Button
          variant="secondary"
          onClick={() => setCurrentStep('method')}
          icon={ArrowLeft}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleEmailSubmit}
          loading={isLoading}
          icon={ArrowRight}
          className="flex-1"
        >
          {selectedMethod === 'email-otp' ? 'Send OTP' : 'Send Link'}
        </Button>
      </div>
    </motion.div>
  );

  const renderOtpStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Enter Verification Code</h3>
        <p className="text-slate-300 text-sm">
          We've sent a 6-digit code to{' '}
          <span className="text-mint-400">
            {selectedMethod === 'phone-otp' ? phone : email}
          </span>
          {selectedMethod === 'phone-otp' ? ' via SMS' : ' via email'}
        </p>
      </div>

      <ErrorMessage message={error} show={!!error} />

      <div className="flex justify-center space-x-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            className="w-12 h-12 text-center text-xl font-bold bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white"
          />
        ))}
      </div>

      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-slate-400 text-sm flex items-center justify-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Resend code in {countdown}s</span>
          </p>
        ) : (
          <button
            onClick={handleResendOtp}
            className="text-mint-400 hover:text-mint-300 text-sm hover:underline transition-colors"
          >
            Resend verification code
          </button>
        )}
      </div>

      <div className="flex space-x-3">
        <Button
          variant="secondary"
          onClick={() => setCurrentStep(selectedMethod === 'phone-otp' ? 'phone' : 'email')}
          icon={ArrowLeft}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleOtpSubmit}
          loading={isLoading}
          icon={ArrowRight}
          className="flex-1"
        >
          Verify Code
        </Button>
      </div>
    </motion.div>
  );

  const renderResetStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Create New Password</h3>
        <p className="text-slate-300 text-sm">Enter your new password below</p>
      </div>

      <ErrorMessage message={error} show={!!error} />

      <div className="space-y-3">
        <Input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          label="New Password"
          icon={Shield}
        />

        <Input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          label="Confirm Password"
          icon={Shield}
        />
      </div>

      <div className="text-xs text-slate-400 space-y-1">
        <p>Password requirements:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>At least 8 characters long</li>
          <li>Include uppercase and lowercase letters</li>
          <li>Include at least one number</li>
        </ul>
      </div>

      <Button
        onClick={handlePasswordReset}
        loading={isLoading}
        icon={ArrowRight}
      >
        Reset Password
      </Button>
    </motion.div>
  );

  const renderSuccessStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center space-y-4"
    >
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Shield className="w-8 h-8 text-green-400" />
        </motion.div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        {selectedMethod === 'email-link' ? 'Reset Link Sent!' : 'Password Reset Successfully!'}
      </h3>
      
      <p className="text-slate-300 text-sm mb-6">
        {selectedMethod === 'email-link' 
          ? `We've sent a secure reset link to ${email}. Please check your email and follow the instructions.`
          : 'Your password has been reset successfully. You can now sign in with your new password.'
        }
      </p>

      <Button onClick={handleClose}>
        {selectedMethod === 'email-link' ? 'Got It' : 'Sign In Now'}
      </Button>
    </motion.div>
  );

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
          <div className="w-6"></div>
          <h2 className="text-lg font-semibold text-white">Forgot Password</h2>
          <button
            onClick={handleClose}
            className="w-6 h-6 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {currentStep === 'method' && renderMethodSelection()}
          {currentStep === 'email' && renderEmailStep()}
          {currentStep === 'phone' && renderPhoneStep()}
          {currentStep === 'otp' && renderOtpStep()}
          {currentStep === 'reset' && renderResetStep()}
          {currentStep === 'success' && renderSuccessStep()}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};