export interface WeekContent {
  week: number;
  size: string;
  animal: string;
  emoji: string;
  apaUrl: string;
  bodyChanges: string | null;
  babySize: string | null;
  babyDevelopment: string | null;
  fruitSize: string | null;
  funFact: string | null;
}

export function findWeekContent(
  weeklyContent: WeekContent[],
  week: number
): WeekContent | undefined {
  return weeklyContent.find((c) => c.week === week);
}
