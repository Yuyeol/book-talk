interface Props {
  width: number;
  color: string;
}

const Plus = ({ width, color }: Props) => (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   fill="none"
  //   viewBox="0 0 24 24"
  //   strokeWidth="1.5"
  //   stroke={color}
  //   style={{ width: `${width / 4}rem`, height: "auto" }}
  // >
  //   <path
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     d="M12 4.5v15m7.5-7.5h-15"
  //   />
  // </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke={color}
    style={{ width: `${width / 4}rem`, height: "auto" }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);
export default Plus;
