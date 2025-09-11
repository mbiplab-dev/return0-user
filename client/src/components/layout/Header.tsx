// =============================================================================
// COMPONENT: Header Component
// File path: src/components/layout/Header.tsx

import { ChevronRight } from "lucide-react";

// =============================================================================
interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  rightAction,
  showBack,
  onBack,
}) => (
  <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
    <div className="flex items-center space-x-4">
      {showBack && (
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight size={20} className="rotate-180 text-gray-600" />
        </button>
      )}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
    {rightAction && <div>{rightAction}</div>}
  </div>
);

export default Header;
