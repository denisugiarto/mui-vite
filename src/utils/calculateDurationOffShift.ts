import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type calculateDurationOffShiftProps = {
  startTime: string;
  endTime: string;
  currentDate: string;
  mode?: "day" | "week";
};
export function calculateDurationOffShift({
  startTime,
  endTime,
  currentDate,
  mode = "day",
}: calculateDurationOffShiftProps) {
  const startDate = dayjs(startTime);
  const endDate = dayjs(endTime);
  const curDate = dayjs(currentDate);

  if (mode === "week") {
    console.log("🚀 ~ startDate:", startDate.format("YYYY-MM-DD HH:mm:ss"));
    console.log("🚀 ~ endDate:", endDate.format("YYYY-MM-DD HH:mm:ss"));
    console.log("🚀 ~ curDate:", curDate.format("YYYY-MM-DD HH:mm:ss"));
    //reset the start date and end date to 00:00:00 because we need to calculate the difference by day
    const newStartDate = startDate
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0);
    const newEndDate = endDate.set("hour", 0).set("minute", 0).set("second", 0);
    const endOfWeek = curDate.endOf("week");
    const startOfWeek = curDate.startOf("week");
    if (
      startOfWeek.isSameOrBefore(newStartDate) &&
      endOfWeek.isSameOrAfter(newEndDate)
    ) {
      return Math.ceil(newEndDate.diff(newStartDate, "hour") / 24) + 1;
    } else if (newEndDate.isAfter(endOfWeek)) {
      return Math.ceil(endOfWeek.diff(newStartDate, "hour") / 24);
    } else if (newStartDate.isBefore(startOfWeek)) {
      return Math.ceil(newEndDate.diff(startOfWeek, "hour") / 24) + 1;
    }
    return 0;
  }
  /**
   * to calculate the duration in day mode
   * if the current date is between start date and end date
   * we can calculate the duration by the time in start date and time in end date
   * we calculate the difference in minutes then divide by default interval 15
   * the maximum duration is 24 hours * 60 minutes / 15 interval = 96
   * if the duration more than 96 hours, we
   *
   * Logic Threshold:
   * if start date is equal to end date (by day)
   * Do: the duration is diff between start date and end date
   * if the current date is equal or after to start date (day) else return 0
   * DO: the threshold is current date + 1 day (end of day)
   * if the current date is equal or before to end date or before
   * the threshold is current date
   */
  // If current date is inside the range,
  // if (mode === "day") {
  // }
  const isOneDay = startDate.isSame(endDate, "days");

  if (
    (curDate.isSameOrBefore(endDate, "days") &&
      curDate.isSameOrAfter(startDate, "days")) ||
    curDate.isSame(startDate)
  ) {
    const interval = 15;
    const maxDuration = (24 * 60) / interval;
    const endCurrentTime = curDate.add(1, "day");
    const endThreshold = endDate.isAfter(endCurrentTime)
      ? endCurrentTime
      : endDate;
    const duration = endThreshold.diff(startDate, "minutes") / interval;
    const durationInDay = duration % maxDuration;
    console.log("durationInDay: ", durationInDay);

    if (isOneDay) {
      return Math.ceil(duration);
    }
    if (curDate.isSame(endDate, "day")) {
      return endDate.diff(curDate, "minutes") / interval;
    }
    if (curDate.isSame(startDate)) {
      return endCurrentTime.diff(startDate, "minutes") / interval;
    } else if (duration > maxDuration) {
      return durationInDay;
    }
    return Math.ceil(duration);
  } else {
    return 0;
  }
}
