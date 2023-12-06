export const phaseFilter = (roundList, phase) => {
    return roundList.filter(round => round.category === phase);
}

export const toptenId = (array, conf) => {
    const ids = [];
    array.forEach(element => {
        if (element.topTens.length !== 0) {
            element.topTens.forEach(topTen => {
                if (topTen.conference === conf) {
                    ids.push(topTen.id)
                }
            })
        }
    });
    return ids;
}