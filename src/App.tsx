import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, AlertCircle, Phone } from 'lucide-react';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (!formData.email || !formData.password) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }
      if (isSignUp && (!formData.firstName || !formData.lastName)) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      // Handle successful login/signup
    }, 1500);
  };

  // Particles animation
  const particles = Array.from({ length: 15 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-mint-400 rounded-full opacity-60"
      initial={{ 
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: -10,
        opacity: 0
      }}
      animate={{
        y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: Math.random() * 3 + 4,
        repeat: Infinity,
        delay: Math.random() * 5,
        ease: "linear"
      }}
    />
  ));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Dynamic Badminton Action Shot */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95"></div>
        
        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-mint-900/20 via-transparent to-blue-900/20"></div>
      </div>

      {/* Spotlight Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-mint-500/20 via-mint-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-1/3 w-[400px] h-[400px] bg-gradient-radial from-blue-400/10 via-blue-400/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles}
      </div>

      {/* Main Container - Centered Layout */}
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-7xl flex items-center justify-center gap-8 lg:gap-16">
          
          {/* Left Side - Badminton Court */}
          <motion.div 
            className="flex-1 max-w-2xl flex flex-col justify-center items-center relative px-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Logo */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-mint-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-mint-500/25">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                      <path d="M12 2L8 6v4l4-2 4 2V6l-4-4zM8 12l4 2 4-2v8l-4-4-4 4v-8z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-mint-400 to-blue-400 rounded-2xl blur opacity-30 animate-pulse-slow"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-mint-400 via-blue-400 to-mint-300 bg-clip-text text-transparent">
                    CourtSync
                  </h1>
                  <p className="text-slate-300 text-sm font-medium tracking-wide">Premium Badminton Platform</p>
                </div>
              </div>
            </motion.div>

            {/* Badminton Court Visualization */}
            <motion.div 
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {/* Court Background */}
              <div className="relative w-80 h-48 bg-gradient-to-b from-green-900/40 to-green-800/30 rounded-lg border-2 border-white/30 shadow-2xl backdrop-blur-sm">
                {/* Court Lines */}
                <div className="absolute inset-2">
                  {/* Outer boundary */}
                  <div className="w-full h-full border-2 border-white/50 rounded"></div>
                  
                  {/* Center line */}
                  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/50 transform -translate-x-0.5"></div>
                  
                  {/* Service lines */}
                  <div className="absolute top-1/4 left-0 w-full h-0.5 bg-white/40"></div>
                  <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-white/40"></div>
                  
                  {/* Side service lines */}
                  <div className="absolute top-1/4 left-1/4 w-0.5 h-1/2 bg-white/40"></div>
                  <div className="absolute top-1/4 right-1/4 w-0.5 h-1/2 bg-white/40"></div>
                </div>

                {/* Net */}
                <motion.div 
                  className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/70 to-transparent transform -translate-y-0.5"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Net mesh effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <div className="absolute top-0 left-1/4 w-0.5 h-4 bg-white/50 transform -translate-y-2"></div>
                  <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-white/50 transform -translate-y-2"></div>
                  <div className="absolute top-0 right-1/4 w-0.5 h-4 bg-white/50 transform -translate-y-2"></div>
                </motion.div>

                {/* Animated Shuttlecock */}
                <motion.div
                  className="absolute"
                  initial={{ x: 60, y: 80 }}
                  animate={{ 
                    x: [60, 200, 280, 200, 60],
                    y: [80, 40, 80, 120, 80],
                    rotate: [0, 15, -10, 20, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" className="text-white drop-shadow-lg">
                    <path fill="currentColor" d="M12 2L8 6v4l4-2 4 2V6l-4-4zM8 12l4 2 4-2v8l-4-4-4 4v-8z"/>
                  </svg>
                  <motion.div
                    className="absolute inset-0 bg-white rounded-full blur-sm opacity-30"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>

                {/* Court Lighting Effects */}
                <div className="absolute -top-8 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-60 shadow-lg shadow-yellow-400/50"></div>
                <div className="absolute -top-8 right-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-60 shadow-lg shadow-yellow-400/50"></div>
                
                {/* Glow effect around court */}
                <div className="absolute -inset-4 bg-gradient-to-r from-mint-500/10 via-transparent to-blue-500/10 rounded-xl blur-xl"></div>
              </div>
            </motion.div>

            {/* Inspirational Quote */}
            <motion.div 
              className="text-center max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h2 className="text-3xl font-light text-white mb-4 font-['Montserrat_Alternates'] italic">
                "Where champions{' '}
                <span className="bg-gradient-to-r from-mint-400 to-blue-400 bg-clip-text text-transparent font-medium neon-text">
                  sync
                </span>{' '}
                their game."
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-mint-400 to-blue-400 mx-auto rounded-full shadow-lg shadow-mint-400/50"></div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div 
            className="w-full max-w-sm flex items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="w-full">
              {/* Form Container */}
              <motion.div 
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl shadow-black/20 max-h-[85vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {/* Form Header */}
                <motion.div 
                  className="text-center mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isSignUp ? 'Join the Game' : 'Enter the Court'}
                  </h3>
                  <p className="text-slate-300 text-sm">
                    {isSignUp ? 'Create your champion account' : 'Sign in to your account'}
                  </p>
                </motion.div>

                {/* Toggle Buttons */}
                <motion.div 
                  className="flex bg-slate-800/50 rounded-2xl p-1 mb-4 border border-slate-700/50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <button
                    onClick={() => setIsSignUp(false)}
                    className={`flex-1 py-2 px-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      !isSignUp 
                        ? 'bg-gradient-to-r from-mint-500 to-blue-500 text-white shadow-lg shadow-mint-500/25' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className={`flex-1 py-2 px-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isSignUp 
                        ? 'bg-gradient-to-r from-mint-500 to-blue-500 text-white shadow-lg shadow-mint-500/25' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="mb-3 p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: [0, -5, 5, -5, 5, 0],
                      }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ 
                        x: { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
                        opacity: { duration: 0.3 }
                      }}
                    >
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-300 text-xs">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name Fields (Sign Up Only) */}
                  <AnimatePresence>
                    {isSignUp && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        {/* First Name & Last Name Row */}
                        <div className="grid grid-cols-2 gap-3">
                          <motion.div 
                            className="group"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
                            <label className="block text-xs font-medium text-slate-300 mb-1">
                              First Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-mint-400 transition-colors" />
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 hover:border-slate-600/50 focus:bg-slate-800/70 focus:shadow-lg focus:shadow-mint-500/10"
                                placeholder="First name"
                              />
                            </div>
                          </motion.div>

                          <motion.div 
                            className="group"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                          >
                            <label className="block text-xs font-medium text-slate-300 mb-1">
                              Last Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-mint-400 transition-colors" />
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 hover:border-slate-600/50 focus:bg-slate-800/70 focus:shadow-lg focus:shadow-mint-500/10"
                                placeholder="Last name"
                              />
                            </div>
                          </motion.div>
                        </div>

                        {/* Phone Number */}
                        <motion.div 
                          className="group"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-mint-400 transition-colors" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 hover:border-slate-600/50 focus:bg-slate-800/70 focus:shadow-lg focus:shadow-mint-500/10"
                              placeholder="Phone number"
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email Field */}
                  <motion.div 
                    className="group"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: isSignUp ? 1.1 : 0.9 }}
                  >
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-mint-400 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 hover:border-slate-600/50 focus:bg-slate-800/70 focus:shadow-lg focus:shadow-mint-500/10"
                        placeholder="Enter your email"
                      />
                    </div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div 
                    className="group"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: isSignUp ? 1.2 : 1.0 }}
                  >
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-mint-400 transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl focus:border-mint-500 focus:outline-none transition-all duration-300 text-white text-sm placeholder-slate-500 hover:border-slate-600/50 focus:bg-slate-800/70 focus:shadow-lg focus:shadow-mint-500/10"
                        placeholder="Enter your password"
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-mint-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AnimatePresence mode="wait">
                          {showPassword ? (
                            <motion.div
                              key="hide"
                              initial={{ opacity: 0, rotate: -90 }}
                              animate={{ opacity: 1, rotate: 0 }}
                              exit={{ opacity: 0, rotate: 90 }}
                              transition={{ duration: 0.2 }}
                            >
                              <EyeOff className="w-4 h-4" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="show"
                              initial={{ opacity: 0, rotate: -90 }}
                              animate={{ opacity: 1, rotate: 0 }}
                              exit={{ opacity: 0, rotate: 90 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Eye className="w-4 h-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Forgot Password (Sign In Only) */}
                  {!isSignUp && (
                    <motion.div 
                      className="text-right"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.1 }}
                    >
                      <a 
                        href="#" 
                        className="text-xs text-mint-400 hover:text-mint-300 transition-colors hover:underline"
                      >
                        Forgot password?
                      </a>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-mint-500 to-blue-500 text-white py-2.5 px-4 rounded-xl font-semibold text-sm shadow-lg shadow-mint-500/25 hover:shadow-xl hover:shadow-mint-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: isSignUp ? 1.3 : 1.2 }}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <span>{isSignUp ? 'Create Account' : 'Enter the Court'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Footer Links */}
                <motion.div 
                  className="mt-4 text-center space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: isSignUp ? 1.4 : 1.3 }}
                >
                  <p className="text-slate-400 text-xs">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  </p>
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-mint-400 hover:text-mint-300 transition-colors font-medium text-xs hover:underline"
                  >
                    {isSignUp ? 'Sign in here' : 'Create an account'}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;