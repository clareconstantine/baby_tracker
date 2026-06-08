export function gestationalWeek(dueDate: Date, today: Date = new Date()): number {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksRemaining = Math.ceil((dueDate.getTime() - today.getTime()) / msPerWeek);
  return 40 - weeksRemaining;
}

// Returns true if today is the day of the week that the pregnancy week turns over
// (i.e. the same day of week as the due date)
export function isWeekTurnoverDay(dueDate: Date, today: Date = new Date()): boolean {
  return dueDate.getDay() === today.getDay();
}
