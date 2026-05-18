import assert from "node:assert/strict";
import test from "node:test";

import { getCalendarColor } from "./calendarColors.js";

test("returns the same color for the same course code", () => {
  assert.deepEqual(getCalendarColor("COMP3161"), getCalendarColor("COMP3161"));
});

test("returns different deterministic colors for common different course codes", () => {
  assert.notEqual(getCalendarColor("COMP3161").key, getCalendarColor("MATH1141").key);
});

test("uses the neutral color when course code is missing", () => {
  assert.equal(getCalendarColor("").key, "neutral");
  assert.equal(getCalendarColor(null).key, "neutral");
});
