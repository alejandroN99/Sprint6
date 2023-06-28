import { Player } from '../../domain/player';

// find from array
export const find = (array: Player[], key: string, value: number | string): Player | undefined => {
	return array.find((item: any): boolean => item[key] === value);
};
