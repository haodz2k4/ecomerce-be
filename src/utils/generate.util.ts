export const generateRandomNumber = (length: number): string => {
    const numbers = '0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += numbers[Math.floor(Math.random() * numbers.length)];
    }

    return result;
}
