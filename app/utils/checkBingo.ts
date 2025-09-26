// utils/checkBingo.ts
export type Card = { 
  card_id: number; 
  B: (number | null)[]; 
  I: (number | null)[]; 
  N: (number | null)[]; 
  G: (number | null)[]; 
  O: (number | null)[] 
};

export function checkBingo(card: Card, numbersDrawn: number[]): boolean {
  // Flatten the card into a 25-number array, using 0 for FREE space
  const cardNumbers: number[] = [
    ...card.B,
    ...card.I,
    ...card.N.map((n, idx) => (idx === 2 ? 0 : n)), // center free space
    ...card.G,
    ...card.O,
  ].map((n) => n || 0); // convert null to 0

  if (cardNumbers.length !== 25) return false;

  const drawnSet = new Set(numbersDrawn);

  // Build 5x5 grid
  const grid: number[][] = [];
  for (let i = 0; i < 5; i++) {
    grid.push(cardNumbers.slice(i * 5, (i + 1) * 5));
  }

  let bingo = false;

  // --- Full card ---
  if (grid.every((row) => row.every((n) => n === 0 || drawnSet.has(n)))) bingo = true;

  // --- Horizontal lines ---
  if (!bingo && grid.some((row) => row.every((n) => n === 0 || drawnSet.has(n)))) bingo = true;

  // --- Vertical lines ---
  if (!bingo) {
    for (let col = 0; col < 5; col++) {
      if (grid.every((row) => row[col] === 0 || drawnSet.has(row[col]))) {
        bingo = true;
        break;
      }
    }
  }

  // --- Corners ---
  if (!bingo) {
    const corners = [grid[0][0], grid[0][4], grid[4][0], grid[4][4]];
    if (corners.every((n) => n === 0 || drawnSet.has(n))) bingo = true;
  }

  return bingo;
}
