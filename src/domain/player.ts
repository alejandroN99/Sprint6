export class Player {
	public id: number;
	public name: string;
	private date: string;
	public rolls: object[] = [];
	public winPercentage: number = 0;

	constructor(name: string) {
		this.id = 0;
		this.name = name;
		this.date = '';
	}
}
