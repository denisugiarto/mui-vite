import { expect } from "vitest";
import { test } from "vitest";
import { calculateDurationOffShift } from "../src/utils/calculateDurationOffShift";

test("DAY: start date and end date is same day", () => {
  const startDate = "2024-08-12 00:00:00";
  const endDate = "2024-08-12 23:59:59";
  const currentDate = "2024-08-12 00:00:00";
  expect(
    calculateDurationOffShift({
      startTime: startDate,
      endTime: endDate,
      currentDate: currentDate,
      mode: "day",
    })
  ).toBe(96);
});

test("DAY: start date and end date is not same day", () => {
  const startDate = "2024-08-12 00:00:00";
  const endDate = "2024-08-13 01:00:00";
  const currentDate = "2024-08-12 00:00:00";
  expect(
    calculateDurationOffShift({
      startTime: startDate,
      endTime: endDate,
      currentDate: currentDate,
      mode: "day",
    })
  ).toBe(96);
});

test("DAY: current date equal to start date", () => {
  const startDate = "2024-08-12 20:00:00";
  const endDate = "2024-08-13 01:00:00";
  const currentDate = "2024-08-12 00:00:00";
  expect(
    calculateDurationOffShift({
      startTime: startDate,
      endTime: endDate,
      currentDate: currentDate,
      mode: "day",
    })
  ).toBe(16);
});

test("DAY: current date is equal to end date time", () => {
  const startDate = "2024-08-12 23:00:00";
  const endDate = "2024-08-13 01:30:00";
  const currentDate = "2024-08-13 00:00:00";
  expect(
    calculateDurationOffShift({
      startTime: startDate,
      endTime: endDate,
      currentDate: currentDate,
      mode: "day",
    })
  ).toBe(6);
});

test("DAY: current date equal to end date time", () => {
  const startDate = "2024-08-12 0:00:00";
  const endDate = "2024-08-13 01:00:00";
  const currentDate = "2024-08-13 00:00:00";
  expect(
    calculateDurationOffShift({
      startTime: startDate,
      endTime: endDate,
      currentDate: currentDate,
      mode: "day",
    })
  ).toBe(4);
});

test("WEEK: current date is equal to end date time", () => {
  const startDate = "2024-08-16 10:00:00";
  const endDate = "2024-08-17 23:59:59";
  const currentDate = "2024-08-11 00:00:00";
  expect(
    calculateDurationOffShift({
      startTime: startDate,
      endTime: endDate,
      currentDate: currentDate,
      mode: "week",
    })
  ).toBe(2);
});

test("WEEK: start date outside week", () => {
  const startDate = "2024-08-10 00:00:00";
  const endDate = "2024-08-11 23:59:59";
  const currentDate = "2024-08-11 00:00:00";
  expect(
    calculateDurationOffShift({
      startTime: startDate,
      endTime: endDate,
      currentDate: currentDate,
      mode: "week",
    })
  ).toBe(1);
});

test("WEEK: current date outside start date and end date", () => {
  const startDate = "2024-08-8 10:00:00";
  const endDate = "2024-08-10 01:00:00";
  const currentDate = "2024-08-11 00:00:00";
  expect(
    calculateDurationOffShift({
      startTime: startDate,
      endTime: endDate,
      currentDate: currentDate,
      mode: "week",
    })
  ).toBe(0);
});
