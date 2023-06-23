export const roll = () => {
    return Math.floor(Math.random() * 6) + 1;
};

export const total = (roll1: number, roll2: number): number => {
    return roll1 + roll2;
};

export const playGame = (): string => {
    const roll1 = roll();
    const roll2 = roll();
    const totalRoll = total(roll1, roll2);
    
    if (totalRoll === 7) {
        return 'win';
    } else {
        return 'lose';
    }
}