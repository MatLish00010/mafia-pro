export const formatToThousand = (val: number) => val * 1000;
export const formatFromThousand = (val: number) => val / 1000;

export const sumTwoNotIntegerNumbers = (a: number, b: number) =>
	formatFromThousand(formatToThousand(a) + formatToThousand(b));
