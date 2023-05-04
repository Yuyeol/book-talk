interface IProps {
  width: number;
  color: string;
}

const Plus = ({ width, color }: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke={color}
    style={{ width: `${width}rem`, height: "auto" }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);
export default Plus;
