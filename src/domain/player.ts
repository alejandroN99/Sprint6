import {IRoll} from '../domain/utilities/IRoll'

export class Player {
	public id: number;
	public name: string;
	public date: string;
	public rolls: IRoll[];
	public winPercentage: number;

	constructor(name: string) {
		this.id = 0;
		this.name = name;
		this.date = '';
		this.rolls = [];
		this.winPercentage = 0;

	}
}
