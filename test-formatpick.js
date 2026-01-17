// Test the formatPickDisplay logic
function getTeamDraftPosition(team, initialDraftOrder) {
  const position = initialDraftOrder.indexOf(team);
  return position !== -1 ? position : 15;
}

function formatPickDisplay(round, year, team, actualPickNum, initialDraftOrder) {
  if (year === 2026 && actualPickNum !== undefined) {
    return team ? `Pick #${actualPickNum + 1} (from ${team})` : `Pick #${actualPickNum + 1}`;
  } else if (year === 2026 && team) {
    const teamPosition = getTeamDraftPosition(team, initialDraftOrder);
    const pickNum = (round - 1) * 32 + teamPosition;
    return `Pick #${pickNum + 1} (from ${team})`;
  } else if (year === 2026) {
    return `2026 R${round}`;
  } else {
    return team ? `${year} R${round} (from ${team})` : `${year} R${round}`;
  }
}

const initialDraftOrder = ['TEN', 'CLE', 'NYG', 'JAX', 'CAR', 'LV', 'NYJ'];

console.log("Test 1 - With actualPickNum:", formatPickDisplay(2, 2026, undefined, 47, initialDraftOrder));
console.log("Test 2 - With team:", formatPickDisplay(2, 2026, 'TEN', undefined, initialDraftOrder));
console.log("Test 3 - Future year:", formatPickDisplay(2, 2027, 'TEN', undefined, initialDraftOrder));
console.log("Test 4 - 2026 no team:", formatPickDisplay(2, 2026, undefined, undefined, initialDraftOrder));
