interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "default" | "white";
}

export function Logo({ size = "md", showText = true, variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl"
  };

  const taglineSizeClasses = {
    sm: "text-xs",
    md: "text-xs", 
    lg: "text-sm"
  };

  const primaryColor = variant === "white" ? "#ffffff" : "var(--color-accent)";
  const strokeColor = variant === "white" ? "#ffffff" : "var(--color-accent)";

  return (
    <div className="flex items-end gap-2">
      {/* Layered Hexagons Logo */}
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Hexagon - purple */}
          <path
            d="M16 2L26.39 8V24L16 30L5.61 24V8L16 2Z"
            fill="none"
            stroke={variant === "white" ? "#ffffff" : "#8B5CF6"}
            strokeWidth="2"
          />
          
          {/* Overlapping Hexagon - coral, shifted right and down slightly */}
          <path
            d="M20 4L28.39 9V21L20 26L11.61 21V9L20 4Z"
            fill="none"
            stroke={variant === "white" ? "#ffffff" : "#FF6B6B"}
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Text Content */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-end gap-2">
            <span className={`font-bold ${textSizeClasses[size]} leading-none ${variant === "white" ? "text-white" : "text-gradient-multi"}`}>
              Onboard.AI
            </span>
          </div>
          <div className={`${taglineSizeClasses[size]} ${variant === "white" ? "text-white/80" : "text-muted-foreground"} leading-none mt-0.5`}>
            Applicant Teaching System
          </div>
        </div>
      )}
    </div>
  );
}