import React from 'react';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  User, 
  Settings, 
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-mint-500/10 via-mint-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-radial from-blue-400/10 via-blue-400/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-mint-400 to-blue-400 rounded-xl flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L8 6v4l4-2 4 2V6l-4-4zM8 12l4 2 4-2v8l-4-4-4 4v-8z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-mint-400 to-blue-400 bg-clip-text text-transparent">
                  CourtSync
                </h1>
                <p className="text-xs text-slate-400">Owner Dashboard</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-slate-400 hover:text-white transition-colors relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </motion.button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl z-50"
                  >
                    <div className="p-4">
                      <h3 className="text-white font-medium mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-700/50 rounded-lg">
                          <p className="text-sm text-white">New booking at Arena 1</p>
                          <p className="text-xs text-slate-400 mt-1">2 minutes ago</p>
                        </div>
                        <div className="p-3 bg-slate-700/50 rounded-lg">
                          <p className="text-sm text-white">Staff member checked in</p>
                          <p className="text-xs text-slate-400 mt-1">15 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-slate-400">Facility Owner</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-blue-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Settings */}
              <motion.button
                className="p-2 text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-5 h-5" />
              </motion.button>

              {/* Logout */}
              <motion.button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-white/20"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-blue-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-slate-400">Facility Owner</p>
                </div>
              </div>
              
              <button className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 text-slate-300 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};