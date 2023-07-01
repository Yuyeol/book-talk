import { PRIMARY_GREEN } from "@/constants";
import React from "react";
interface IProps {
  width?: number;
  height?: number;
  color?: string;
}

const Spinner = ({
  width = 3,
  height = width,
  color = PRIMARY_GREEN,
}: IProps) => {
  const offset = 187;
  const duration = "1.4s";
  return (
    <svg
      className="spinner"
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
            width: ${width}rem; 
            height: ${height}rem;
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
