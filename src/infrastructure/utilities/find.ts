import { Player } from '../../domain/player';

// find from array
export const find = (array: Player[], key: string, value: number) => {
	return array.find((item: object) => item[key] === value);
};
