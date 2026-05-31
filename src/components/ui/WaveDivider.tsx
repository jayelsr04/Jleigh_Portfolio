interface WaveDividerProps {
  flip?: boolean;
  color?: string;
  topColor?: string;
  className?: string;
}

export default function WaveDivider({
  flip = false,
  color = "#0d2240",
  topColor = "transparent",
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${className}`}
      style={{
        transform: flip ? "rotate(180deg)" : "none",
        marginBottom: flip ? "-2px" : "0",
        marginTop: flip ? "0" : "-2px",
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "104%", height: "80px" }}
      >
        {/* Layer 1 - back wave */}
        <path
          className="wave-layer-1"
          fill={color}
          fillOpacity="0.4"
          d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 C1260,100 1380,40 1440,60 L1440,120 L0,120 Z"
        />
        {/* Layer 2 - mid wave */}
        <path
          className="wave-layer-2"
          fill={color}
          fillOpacity="0.6"
          d="M0,70 C240,30 480,110 720,70 C960,30 1200,110 1440,70 L1440,120 L0,120 Z"
        />
        {/* Layer 3 - front wave */}
        <path
          className="wave-layer-3"
          fill={color}
          fillOpacity="1"
          d="M0,80 C360,40 720,120 1080,80 C1260,60 1380,90 1440,80 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
