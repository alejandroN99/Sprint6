export class Player {
	public id: number;
	public name: string;
	public date: string;
	public winPercentage: number;

	constructor(name: string) {
		this.id = 0;
		this.name = name;
		this.date = '';
		this.winPercentage = 0;
	}
}
