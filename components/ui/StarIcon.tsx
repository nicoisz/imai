import type { SVGProps } from "react";

type StarIconProps = SVGProps<SVGSVGElement> & {
  /** render the radial diffraction spikes */
  spikes?: boolean;
};

export function StarIcon({ spikes = true, children, ...props }: StarIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {spikes && (
        <g stroke="currentColor" strokeWidth="0.6" opacity="0.7">
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" />
        </g>
      )}
      <path
        d="M50 10 C 53 38, 62 47, 90 50 C 62 53, 53 62, 50 90 C 47 62, 38 53, 10 50 C 38 47, 47 38, 50 10 Z"
        fill="currentColor"
      />
      {children}
    </svg>
  );
}

export function StarMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1 C 12.8 8, 16 11.2, 23 12 C 16 12.8, 12.8 16, 12 23 C 11.2 16, 8 12.8, 1 12 C 8 11.2, 11.2 8, 12 1 Z"
        fill="currentColor"
      />
    </svg>
  );
}
