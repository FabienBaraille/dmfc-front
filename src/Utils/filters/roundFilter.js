export const phaseFilter = (roundList, phase) => {
    return roundList.filter(round => round.category === phase);
}