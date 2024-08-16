import dayjs from "dayjs";
import { calculateDurationOffShift } from "../utils/calculateDurationOffShift";
const CalculateDuration = () => {
  const startDate = "2024-08-12 23:00:00";
  const endDate = "2024-08-13 02:00:00";
  const currentDate = "2024-08-12 00:00:00";
  const duration = calculateDurationOffShift({
    startTime: startDate,
    endTime: endDate,
    currentDate,
    mode: "day",
  });
  return (
    <div>
      <p>const startDate = {dayjs(startDate).format("YYYY-MM-DD HH:mm:ss")}</p>
      <p>const endDate = {dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")}</p>
      <p>
        const currentDate = {dayjs(currentDate).format("YYYY-MM-DD HH:mm:ss")}
      </p>
      <p>duration : {duration}</p>
    </div>
  );
};

export default CalculateDuration;
