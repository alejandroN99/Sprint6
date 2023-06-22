export const roll = () => {
    return Math.floor(Math.random() * 6) + 1;
};

export const total = (roll1: number, roll2: number): number => {
    return roll1 + roll2;
};