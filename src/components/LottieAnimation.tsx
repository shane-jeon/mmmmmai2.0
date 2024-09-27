import { Player } from "@lottiefiles/react-lottie-player";

interface LottieAnimationProps {
  isVisible: boolean; // Control visibility of the Lottie animation
}

const LottieAnimation = ({ isVisible }: LottieAnimationProps) => {
  return (
    <div style={{ display: isVisible ? "block" : "none" }}>
      <Player
        autoplay
        loop
        src="/loadanimation.json" // Assuming the JSON is in the public folder
        style={{ height: "150px", width: "150px" }}
      />
    </div>
  );
};

export default LottieAnimation;
