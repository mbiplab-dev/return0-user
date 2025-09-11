// =============================================================================
// COMPONENT: Quick Action Button
// File path: src/components/common/QuickActionButton.tsx
// =============================================================================
interface QuickActionButtonProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  color: string;
  onClick?: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon: Icon,
  title,
  subtitle,
  color,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200 group"
  >
    <div className="flex flex-col items-center text-center space-y-3">
      <div
        className={`p-4 ${color} rounded-2xl group-hover:scale-105 transition-transform`}
      >
        <Icon size={28} className="text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  </button>
);

export default QuickActionButton;
