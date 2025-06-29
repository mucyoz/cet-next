import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  onClick?: () => void;
}

export function Logo({ className, size = 'md', showText = true, onClick }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const lineHeightClasses = {
    sm: 'leading-tight',
    md: 'leading-tight',
    lg: 'leading-tight',
    xl: 'leading-tight'
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg min-h-[44px] min-w-[44px]",
        className
      )}
      aria-label="Center for Education Transitions - Home"
    >
      {/* Logo Icon */}
      <div className={cn("relative flex-shrink-0", sizeClasses[size])}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Shield Background */}
          <path
            d="M24 4L8 10V22C8 32 16 40.5 24 44C32 40.5 40 32 40 22V10L24 4Z"
            fill="#3B82F6"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          
          {/* Document Icon */}
          <rect
            x="16"
            y="14"
            width="16"
            height="20"
            rx="2"
            fill="white"
            stroke="#E5E7EB"
            strokeWidth="0.5"
          />
          
          {/* Document Lines */}
          <line x1="19" y1="18" x2="29" y2="18" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round"/>
          <line x1="19" y1="21" x2="29" y2="21" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round"/>
          <line x1="19" y1="24" x2="26" y2="24" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round"/>
          <line x1="19" y1="27" x2="29" y2="27" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round"/>
          <line x1="19" y1="30" x2="25" y2="30" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round"/>
          
          {/* Checkmark Circle Background */}
          <circle
            cx="30"
            cy="26"
            r="6"
            fill="#4CAF50"
            stroke="white"
            strokeWidth="1.5"
          />
          
          {/* Checkmark */}
          <path
            d="M27.5 26L29.5 28L32.5 24"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="ml-2 sm:ml-3 flex flex-col justify-center">
          {/* Desktop/Tablet: Multi-line text (768px and above) */}
          <div className={cn(
            "hidden md:flex flex-col font-semibold text-black",
            textSizeClasses[size],
            lineHeightClasses[size]
          )}>
            <span className="whitespace-nowrap">Center for</span>
            <span className="whitespace-nowrap">Education</span>
            <span className="whitespace-nowrap">Transitions</span>
          </div>

          {/* Mobile: Test 3-line format first, fallback to CET if needed */}
          <div className="md:hidden">
            {/* 3-line format for larger mobile screens (480px and above) */}
            <div className={cn(
              "hidden xs:flex flex-col font-semibold text-black",
              textSizeClasses[size],
              lineHeightClasses[size]
            )}>
              <span className="whitespace-nowrap text-xs">Center for</span>
              <span className="whitespace-nowrap text-xs">Education</span>
              <span className="whitespace-nowrap text-xs">Transitions</span>
            </div>

            {/* CET acronym for very small mobile screens (below 480px) */}
            <span className={cn(
              "xs:hidden font-semibold text-black",
              textSizeClasses[size]
            )}>
              CET
            </span>
          </div>
        </div>
      )}
    </button>
  );
}