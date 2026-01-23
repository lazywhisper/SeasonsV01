import { TrendingUp, Users, DollarSign, Droplets } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { PLATFORM } from '../../../constants/platform';
import { formatters } from '../../../utils/formatters';
import { ProjectMetricsProps } from './types';
import { memo } from 'react';

export const ProjectMetrics = memo(function ProjectMetrics({ stats }: ProjectMetricsProps) {
  return (
    <div>
      <h2 className="mb-4">
        Project Metrics
      </h2>

      {/* Enhanced Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* APY - Enhanced */}
        <div
          className="group relative p-6 rounded-2xl overflow-hidden"
          style={{
            background: '#0f0d12',
            border: '1px solid rgba(172, 169, 169, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(96, 211, 148, 0.25)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(96, 211, 148, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(172, 169, 169, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Gradient blur effect */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '-50px',
              right: '-50px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(96, 211, 148, 0.15), transparent)',
              filter: 'blur(40px)',
              opacity: 0.6,
            }}
          />
          
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, rgba(96, 211, 148, 0) 0%, rgba(96, 211, 148, 0.3) 40%, rgba(75, 128, 203, 0.3) 60%, rgba(75, 128, 203, 0) 100%)',
            }}
          />
          
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div
              className="p-2.5 rounded-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.08), rgba(75, 128, 203, 0.08))',
              }}
            >
              <TrendingUp size={20} style={{ color: 'var(--seasons-success)' }} />
            </div>
            <span className="label-md" style={{ color: '#aca9a9' }}>
              Current APY
            </span>
          </div>
          <div className="metric-xl mb-2 relative z-10">
            {stats.currentAPY}%<sup style={{ fontSize: '0.6em', marginLeft: '2px' }}>*</sup>
          </div>
          <p
            className="label-sm relative z-10"
            style={{
              color: '#aca9a9',
              fontSize: '11px',
            }}
          >
            {PLATFORM.APY.DISCLAIMER}
          </p>
        </div>

        {/* TVL - Enhanced */}
        <div
          className="group relative p-6 rounded-2xl overflow-hidden"
          style={{
            background: '#0f0d12',
            border: '1px solid rgba(172, 169, 169, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(233, 199, 116, 0.25)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(233, 199, 116, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(172, 169, 169, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Gradient blur effect */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '-50px',
              right: '-50px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(233, 199, 116, 0.15), transparent)',
              filter: 'blur(40px)',
              opacity: 0.6,
            }}
          />
          
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, rgba(233, 199, 116, 0) 0%, rgba(233, 199, 116, 0.3) 40%, rgba(242, 119, 131, 0.3) 60%, rgba(242, 119, 131, 0) 100%)',
            }}
          />
          
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div
              className="p-2.5 rounded-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.08), rgba(242, 119, 131, 0.08))',
              }}
            >
              <Droplets size={20} style={{ color: 'var(--seasons-brand-grad-start)' }} />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="label-md cursor-help" style={{ color: '#aca9a9' }}>
                    Liquidity
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Total value locked in liquidity pools</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="metric-xl mb-2 relative z-10">
            {formatters.compactCurrency(stats.tvl)}
          </div>
          <div className="label-sm relative z-10" style={{ color: '#aca9a9' }}>
            Total Value Locked
          </div>
        </div>

        {/* Active Nodes - Enhanced */}
        <div
          className="group relative p-6 rounded-2xl overflow-hidden"
          style={{
            background: '#0f0d12',
            border: '1px solid rgba(172, 169, 169, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(180, 75, 203, 0.25)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(180, 75, 203, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(172, 169, 169, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Gradient blur effect */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '-50px',
              right: '-50px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(180, 75, 203, 0.15), transparent)',
              filter: 'blur(40px)',
              opacity: 0.6,
            }}
          />
          
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, rgba(180, 75, 203, 0) 0%, rgba(180, 75, 203, 0.3) 40%, rgba(75, 128, 203, 0.3) 60%, rgba(75, 128, 203, 0) 100%)',
            }}
          />
          
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div
              className="p-2.5 rounded-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(180, 75, 203, 0.08), rgba(75, 128, 203, 0.08))',
              }}
            >
              <Users size={20} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
            </div>
            <span className="label-md" style={{ color: '#aca9a9' }}>
              Active Nodes
            </span>
          </div>
          <div className="metric-xl mb-2 relative z-10">
            {formatters.number(stats.activeNodes, 0)}
          </div>
          <div className="label-sm relative z-10" style={{ color: '#aca9a9' }}>
            of 2,980 holders
          </div>
        </div>

        {/* Total Distributed - Enhanced */}
        <div
          className="group relative p-6 rounded-2xl overflow-hidden"
          style={{
            background: '#0f0d12',
            border: '1px solid rgba(172, 169, 169, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(242, 119, 131, 0.25)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(242, 119, 131, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(172, 169, 169, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Gradient blur effect */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '-50px',
              right: '-50px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(242, 119, 131, 0.15), transparent)',
              filter: 'blur(40px)',
              opacity: 0.6,
            }}
          />
          
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, rgba(242, 119, 131, 0) 0%, rgba(242, 119, 131, 0.3) 40%, rgba(180, 75, 203, 0.3) 60%, rgba(180, 75, 203, 0) 100%)',
            }}
          />
          
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div
              className="p-2.5 rounded-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(242, 119, 131, 0.08), rgba(180, 75, 203, 0.08))',
              }}
            >
              <DollarSign size={20} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />
            </div>
            <span className="label-md" style={{ color: '#aca9a9' }}>
              Yield Distributed
            </span>
          </div>
          <div className="metric-xl mb-2 relative z-10">
            {formatters.compactCurrency(stats.totalDistributed)}
          </div>
          <div className="label-sm relative z-10" style={{ color: '#aca9a9' }}>
            {stats.distributionCount} distributions
          </div>
        </div>
      </div>
    </div>
  );
});