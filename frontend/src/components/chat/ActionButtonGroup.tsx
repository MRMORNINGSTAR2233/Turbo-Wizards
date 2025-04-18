import React from 'react';
import { 
  IconAdjustmentsHorizontal, 
  IconBooks,
  IconInfoCircle
} from '@tabler/icons-react';
import { FeatureType } from './ChatMain';

interface ActionButtonGroupProps {
  activeFeatures: {
    queryRefiner: boolean;
    deepResearch: boolean;
  };
  toggleFeature: (feature: FeatureType) => void;
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
  className?: string;
  hint?: string;
  featureType: FeatureType;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  onClick, 
  isActive, 
  className,
  hint,
  featureType
}) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-1.5 text-sm px-3 py-2 md:px-4 md:py-2.5 rounded-lg transition-all duration-200 ${
        isActive 
          ? featureType === 'queryRefiner'
            ? 'bg-indigo-600/40 border border-indigo-500/50 text-white shadow-md shadow-indigo-600/20' 
            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
          : 'bg-gray-800/80 hover:bg-gray-700 text-gray-300 border border-gray-700/50 hover:border-indigo-500/30'
      } ${className || ''}`}
    >
      <span className="flex items-center justify-center">{icon}</span>
      <span className="whitespace-nowrap text-xs md:text-sm">{label}</span>
      
      {/* Mobile tooltip - appears on hover/long press */}
      {hint && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-1/2 -translate-x-1/2 -bottom-16 w-max max-w-[200px] p-2 rounded-lg bg-gray-800 border border-gray-700 text-xs text-white pointer-events-none shadow-xl z-50">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
          <div className="flex items-start gap-2">
            <IconInfoCircle size={14} className="mt-0.5 text-indigo-400 flex-shrink-0" />
            <span>{hint}</span>
          </div>
        </div>
      )}
    </button>
  );
};

const ActionButtonGroup: React.FC<ActionButtonGroupProps> = ({ 
  activeFeatures, 
  toggleFeature 
}) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mt-3">
      <ActionButton 
        icon={<IconAdjustmentsHorizontal size={16} />}
        label="Query Refiner"
        onClick={() => toggleFeature('queryRefiner')}
        isActive={activeFeatures.queryRefiner}
        className="queryRefiner-button feature-button flex-grow md:flex-grow-0"
        hint="Improves your query for more accurate results. Can be combined with other features."
        featureType="queryRefiner"
      />
      <div className="w-full md:hidden border-t border-gray-700/30 my-1"></div>
      <ActionButton 
        icon={<IconBooks size={16} />}
        label="Deep Research"
        onClick={() => toggleFeature('deepResearch')}
        isActive={activeFeatures.deepResearch}
        className="deepResearch-button feature-button flex-1 md:flex-none"
        hint="In-depth analysis using academic sources and expert opinions."
        featureType="deepResearch"
      />
    </div>
  );
};

export default ActionButtonGroup; 