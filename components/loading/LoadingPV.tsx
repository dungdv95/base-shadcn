import animationData from "./pv-loading.json";
import Lottie from "react-lottie";
export default function LoadingPV() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-full flex items-center">
      <Lottie options={defaultOptions} height={250} width={250} />
    </div>
  );
}
