import mongoose from "mongoose";
import { IRollMongo } from "./IRollMongo";

// Interfaz para representar un jugador
export interface IPlayer extends mongoose.Document {
  name: string;
  date: Date;
  rolls: IRollMongo[];
  winPercentage: number;
  createdAt: Date;
  updatedAt: Date;
};

export const PlayerSchema = new mongoose.Schema<IPlayer>({
  name: {
    type: String
  },
  date: {
    type: Date,
    default: () => Date.now()
  },
  rolls: [{
    roll1:{ type: Number},
    roll2:{ type: Number},
    total:{ type: Number},
    result: { type: String}
  }],
  winPercentage: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
  type: Date,
  default: () => Date.now(),
  }
});

export const playerModel: mongoose.Model<IPlayer> =  mongoose.model<IPlayer>('Player', PlayerSchema);