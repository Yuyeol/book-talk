interface IProps {
  width: number;
  color: string;
}

const XMark = ({ width, color }: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke={color}
    style={{ width: `${width}rem`, height: "auto" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
export default XMark;
