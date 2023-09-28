export const positionDisplay = (posChange) => {
  if (posChange > 0) {
    return `▲ ${posChange}`;
  } else if (posChange < 0) {
    return `▼ ${Math.abs(posChange)}`
  } else {
    return posChange;
  }
}