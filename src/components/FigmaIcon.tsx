import svgPaths from "../imports/svg-xpid9h9j94";

interface FigmaIconProps {
  path: keyof typeof svgPaths;
  className?: string;
  fill?: string;
  viewBox?: string;
}

export function FigmaIcon({ path, className, fill = "currentColor", viewBox = "0 0 24 24" }: FigmaIconProps) {
  return (
    <svg 
      className={className} 
      viewBox={viewBox} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path 
        d={svgPaths[path]} 
        fill={fill} 
        fillRule="evenodd" 
        clipRule="evenodd" 
      />
    </svg>
  );
}
