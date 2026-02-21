import { useEffect, useState } from "react";
import CountdownWrapper from "./Countdown.style";

const Countdown = ({ endDate, ...props }) => {
  const [remainingTime, setRemainingTime] = useState({
    seconds: "00", minutes: "00", hours: "00", days: "00",
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate * 1000 - Date.now();
      if (difference > 0) {
        return {
          days:    String(Math.floor(difference / (1000*60*60*24))).padStart(2,"0"),
          hours:   String(Math.floor((difference/(1000*60*60))%24)).padStart(2,"0"),
          minutes: String(Math.floor((difference/1000/60)%60)).padStart(2,"0"),
          seconds: String(Math.floor((difference/1000)%60)).padStart(2,"0"),
        };
      }
      return { days:"00", hours:"00", minutes:"00", seconds:"00" };
    };

    setRemainingTime(calculateTimeLeft());
    const timer = setInterval(() => setRemainingTime(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const units = [
    { value: remainingTime.days,    label: "Days" },
    { value: remainingTime.hours,   label: "Hours" },
    { value: remainingTime.minutes, label: "Mins" },
    { value: remainingTime.seconds, label: "Secs" },
  ];

  return (
    <CountdownWrapper {...props}>
      {units.map(({ value, label }, i) => (
        <div className="count-item" key={i}>
          <div className="count-box">
            <span className="count">{value}</span>
          </div>
          <span className="label">{label}</span>
        </div>
      ))}
    </CountdownWrapper>
  );
};

export default Countdown;
CDJS
echo "✅ Countdown JSX atualizado"