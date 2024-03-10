import React from "react";
import "./progressCircle.css";

const Circle = ({ color, percentage, size, strokeWidth }) => {
  const radius = size / 2 - 10;
  const circ = 2 * Math.PI * radius - 20;
  const strokePct = ((100 - Math.round(percentage)) * circ) / 100;

  return (
    <circle
      r={radius}
      cx='50%'
      cy='50%'
      fill='transparent'
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap='round'
    ></circle>
  );
};

export default function ProgressCircle({
  percentage,
  isPlaying,
  image,
  size,
  color,
}) {
  const clipCircleRadius = size / 2 - 30;
  const clipInnerCircleRadius = size / 2 -(size === 300 || size === 290 ? 100 : size === 250 || size === 260 ? 90 : size < 250 && size > 200 ? 80 : 50);

  return (
    <div className={`progress-circle flex ${isPlaying ? "active" : ""}`}>
      <svg width={size} height={size}>
        <g>
          <Circle strokeWidth={".4rem"} color={"#3b4f73"} size={size} />
          <Circle
            color={color}
            percentage={percentage}
            size={size}
            strokeWidth={".6rem"}
          />
        </g>
        <defs>
          <clipPath id='myCircle'>
            <circle cx='50%' cy='50%' r={clipCircleRadius} fill={"#ffffff"} />
          </clipPath>
          <clipPath id='myInnerCircle'>
            <circle cx='50%' cy='50%' r={clipInnerCircleRadius} fill={"#ffffff"} />
          </clipPath>
        </defs>
        <image
          className="circle-image"
          x={size / 2 - clipCircleRadius}
          y={size / 2 - clipCircleRadius}
          width={2 * clipCircleRadius}
          height={2 * clipCircleRadius}
          href='https://pngimg.com/uploads/vinyl/vinyl_PNG46.png'
          clipPath='url(#myCircle)'
        />

        <image
          className="inner-circle-image"
          x={size / 2 - clipInnerCircleRadius}
          y={size / 2 - clipInnerCircleRadius}
          width={2 * clipInnerCircleRadius}
          height={2 * clipInnerCircleRadius}
          href={image}
          clipPath='url(#myInnerCircle)'
        />
      </svg>
    </div>
  );
}
