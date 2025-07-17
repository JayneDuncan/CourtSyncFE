import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'mint' | 'orange' | 'red';
  trend?: string;
  trendDirection?: 'up' | 'down';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  trendDirection = 'up'
}) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500/20 to-blue-600/20',
      icon: 'text-blue-400',
      border: 'border-blue-500/30'
    },
    green: {
      bg: 'from-green-500/20 to-green-600/20',
      icon: 'text-green-400',
      border: 'border-green-500/30'
    },
    purple: {
      bg: 'from-purple-500/20 to-purple-600/20',
      icon: 'text-purple-400',
      border: 'border-purple-500/30'
    },
    mint: {
      bg: 'from-mint-500/20 to-mint-600/20',
      icon: 'text-mint-400',
      border: 'border-mint-500/30'
    },
    orange: {
      bg: 'from-orange-500/20 to-orange-600/20',
      icon: 'text-orange-400',
      border: 'border-orange-500/30'
    },
    red: {
      bg: 'from-red-500/20 to-red-600/20',
      icon: 'text-red-400',
      border: 'border-red-500/30'
    }
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      className={`bg-gradient-to-br ${classes.bg} backdrop-blur-xl rounded-2xl p-6 border ${classes.border} hover:shadow-lg hover:shadow-${color}-500/10 transition-all duration-300`}
      whileHover={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-300 text-sm font-medium mb-1">{title}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
          {trend && (
            <div className="flex items-center space-x-1 mt-2">
              {trendDirection === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-sm font-medium ${
                trendDirection === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${classes.bg} rounded-xl flex items-center justify-center ${classes.border} border`}>
          <Icon className={`w-6 h-6 ${classes.icon}`} />
        </div>
      </div>
    </motion.div>
  );
};