import { PRIMARY_GREEN } from "@/constants";
import React from "react";

const Spinner = ({ size = 12, color = PRIMARY_GREEN }) => {
  const offset = 187;
  const duration = "1.4s";
  const spinnerSize = `w-${size} h-${size}`;
  return (
    <svg
      className={`spinner ${spinnerSize}`}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="path"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
      <style>
        {`
          .spinner {
            animation: rotator ${duration} linear infinite;
          }

          @keyframes rotator {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(270deg); }
          }

          .path {
            stroke-dasharray: ${offset};
            stroke-dashoffset: 0;
            transform-origin: center;
            animation: dash ${duration} ease-in-out infinite;
          }

          @keyframes dash {
            0% { stroke-dashoffset: ${offset}; }
            50% {
              stroke-dashoffset: ${offset / 4};
              transform: rotate(135deg);
            }
            100% {
              stroke-dashoffset: ${offset};
              transform: rotate(450deg);
            }
          }
        `}
      </style>
    </svg>
  );
};

export default Spinner;
