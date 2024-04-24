const LOWER_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGIT_CHARS = '0123456789';

const ALL_CHARS = LOWER_CHARS + UPPER_CHARS + DIGIT_CHARS;

const randomChar = () => {
	const randomIndex = Math.floor(Math.random() * ALL_CHARS.length);
	return ALL_CHARS[randomIndex];
};

export const randomString = (length: number) => {
	return new Array(length).fill(null).map(randomChar).join('');
};
