import { useTimer } from "../context/TimerContext";

const CountdownTimer = () => {
  const { timeLeft } = useTimer();
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center text-3xl font-bold text-blue-600">
      {hours}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default CountdownTimer;
