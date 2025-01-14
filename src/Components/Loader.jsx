import { RotatingLines } from "react-loader-spinner";
import { useTheme } from "../Contexts/ThemeContext";

export default function Loader() {
  const { theme } = useTheme();

  return (
    <div className={`loader-container ${theme === "Dark" ? "dark" : ""}`}>
      <RotatingLines
  visible={true}
  height="96"
  width="96"
  strokeColor="#2196F3"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  );
}
