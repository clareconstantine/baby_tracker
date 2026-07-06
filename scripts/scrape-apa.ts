/**
 * One-time script: fetches week-by-week content from the American Pregnancy Association
 * and merges it with the animal size dataset. Run with:
 *   npx tsx scripts/scrape-apa.ts
 *
 * Output: data/weekly-content.json
 *
 * TODO: Replace APA with a more neutral, medically reputable source (Mayo Clinic, ACOG, NHS).
 * The APA is an anti-abortion advocacy group and not an appropriate long-term content source.
 * Source: https://americanpregnancy.org/week-by-week/
 */

import * as fs from "fs";
import * as path from "path";

// Clare's animal size dataset
const animalData = [
  { week: 4,  size: "1 mm",     animal: "ant larva",                      emoji: "🐜" },
  { week: 5,  size: "1–3 mm",   animal: "fruit fly",                      emoji: "🪰" },
  { week: 6,  size: "6 mm",     animal: "ladybug",                        emoji: "🐞" },
  { week: 7,  size: "13 mm",    animal: "honeybee",                       emoji: "🐝" },
  { week: 8,  size: "16 mm",    animal: "bumblebee",                      emoji: "🐝" },
  { week: 9,  size: "23 mm",    animal: "newborn opossum",                emoji: "🐾" },
  { week: 10, size: "3 cm",     animal: "newborn mouse",                  emoji: "🐭" },
  { week: 11, size: "4 cm",     animal: "newborn hamster",                emoji: "🐹" },
  { week: 12, size: "5.4 cm",   animal: "newborn squirrel",               emoji: "🐿️" },
  { week: 13, size: "7.4 cm",   animal: "baby hedgehog",                  emoji: "🦔" },
  { week: 14, size: "8.7 cm",   animal: "newborn kitten",                 emoji: "🐱" },
  { week: 15, size: "10.1 cm",  animal: "baby chinchilla",                emoji: "🐭" },
  { week: 16, size: "11.6 cm",  animal: "newborn guinea pig",             emoji: "🐾" },
  { week: 17, size: "12.9 cm",  animal: "baby skunk",                     emoji: "🦨" },
  { week: 18, size: "14.2 cm",  animal: "duckling",                       emoji: "🐣" },
  { week: 19, size: "15.3 cm",  animal: "baby muskrat",                   emoji: "🐀" },
  { week: 20, size: "16.4 cm",  animal: "baby rabbit",                    emoji: "🐰" },
  { week: 21, size: "20.0 cm",  animal: "baby fox kit",                   emoji: "🦊" },
  { week: 22, size: "23.4 cm",  animal: "baby groundhog",                 emoji: "🐾" },
  { week: 23, size: "26.7 cm",  animal: "baby porcupine",                 emoji: "🦔" },
  { week: 24, size: "30 cm",    animal: "newborn puppy (medium breed)",   emoji: "🐶" },
  { week: 25, size: "31.9 cm",  animal: "baby otter pup",                 emoji: "🦦" },
  { week: 26, size: "33.8 cm",  animal: "baby beaver kit",                emoji: "🦫" },
  { week: 27, size: "35.7 cm",  animal: "baby capybara",                  emoji: "🐾" },
  { week: 28, size: "37.6 cm",  animal: "baby raccoon",                   emoji: "🦝" },
  { week: 29, size: "38.8 cm",  animal: "baby goat kid",                  emoji: "🐐" },
  { week: 30, size: "40.0 cm",  animal: "newborn lamb",                   emoji: "🐑" },
  { week: 31, size: "41.2 cm",  animal: "newborn piglet",                 emoji: "🐷" },
  { week: 32, size: "42.4 cm",  animal: "newborn beagle",                 emoji: "🐶" },
  { week: 33, size: "43.7 cm",  animal: "baby Patagonian mara",           emoji: "🐇" },
  { week: 34, size: "44.9 cm",  animal: "newborn chimpanzee",             emoji: "🐒" },
  { week: 35, size: "46.2 cm",  animal: "newborn baboon",                 emoji: "🐒" },
  { week: 36, size: "47.4 cm",  animal: "newborn large-breed puppy",      emoji: "🐶" },
  { week: 37, size: "48.3 cm",  animal: "newborn fawn",                   emoji: "🦌" },
  { week: 38, size: "49.4 cm",  animal: "newborn mandrill",               emoji: "🐒" },
  { week: 39, size: "50.3 cm",  animal: "newborn spider monkey",          emoji: "🐒" },
  { week: 40, size: "51.2 cm",  animal: "newborn human baby",             emoji: "👶" },
];

// APA URL pattern for week pages
function apaUrl(week: number): string {
  return `https://americanpregnancy.org/${week}-weeks-pregnant/`;
}

// Section headings to extract (APA uses these exact headings)
const TARGET_SECTIONS = [
  "What changes are occurring with your body?",
  "How big is your baby?",
  "What is happening with your baby?",
];

async function fetchApaPage(week: number): Promise<string> {
  const url = apaUrl(week);
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; baby-tracker-scraper/1.0)" },
  });
  if (!res.ok) throw new Error(`Failed to fetch week ${week}: ${res.status} ${url}`);
  return res.text();
}

function extractSections(html: string, week: number): Record<string, string> {
  const sections: Record<string, string> = {};

  for (const heading of TARGET_SECTIONS) {
    // Match the heading and capture text until the next heading or end of content block
    const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Look for h2/h3 tag containing the heading text, then capture following <p> tags
    const headingPattern = new RegExp(
      `<h[23][^>]*>[^<]*${escapedHeading}[^<]*</h[23]>(.*?)(?=<h[23]|$)`,
      "is"
    );
    const match = html.match(headingPattern);
    if (match) {
      // Strip HTML tags and clean up whitespace
      const text = match[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (text) sections[heading] = text;
    }
  }

  if (Object.keys(sections).length === 0) {
    console.warn(`  ⚠️  Week ${week}: no sections found — HTML structure may differ`);
  }

  return sections;
}

async function main() {
  const results = [];

  for (const entry of animalData) {
    const { week } = entry;
    process.stdout.write(`Fetching week ${week}...`);

    try {
      const html = await fetchApaPage(week);
      const sections = extractSections(html, week);

      results.push({
        week,
        size: entry.size,
        animal: entry.animal,
        emoji: entry.emoji,
        apaUrl: apaUrl(week),
        bodyChanges: sections[TARGET_SECTIONS[0]] ?? null,
        babySize: sections[TARGET_SECTIONS[1]] ?? null,
        babyDevelopment: sections[TARGET_SECTIONS[2]] ?? null,
      });

      console.log(` ✓`);
    } catch (err) {
      console.error(` ✗ ${err}`);
      results.push({
        week,
        size: entry.size,
        animal: entry.animal,
        emoji: entry.emoji,
        apaUrl: apaUrl(week),
        bodyChanges: null,
        babySize: null,
        babyDevelopment: null,
      });
    }

    // Small delay to be polite to APA's servers
    await new Promise((r) => setTimeout(r, 500));
  }

  const outPath = path.join(process.cwd(), "data", "weekly-content.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nWrote ${results.length} weeks to ${outPath}`);

  const missing = results.filter((r) => !r.bodyChanges && !r.babyDevelopment);
  if (missing.length > 0) {
    console.warn(`\n⚠️  ${missing.length} weeks had no content extracted (weeks: ${missing.map((r) => r.week).join(", ")})`);
    console.warn("   Check those entries in data/weekly-content.json and fill them in manually.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
