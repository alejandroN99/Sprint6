// find from array
export const find = (array: any, key: any, value: any) => {
	return array.find((item: any) => item[key] === value);
};
