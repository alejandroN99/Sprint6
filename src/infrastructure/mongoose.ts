import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/prueba', {}).then(() => {
    console.log('Conexión exitosa a la base de datos');
}).catch((error: Error) => {
    console.error('Error al conectar a la base de datos:', error);
});

interface IPlayer extends Document {
    id: number;
    name: string;
    date: Date;
    winPercentage: number;
}

interface ISequence extends Document {
    name: string;
    value: number;
}

mongoose.connection.on('connected', () => {
    console.log('Conexión establecida a MongoDB');
});

mongoose.connection.on('error', (error: Error) => {
    console.error('Error en la conexión a MongoDB:', error);
});

const sequenceSchema: Schema<ISequence> = new Schema({
    name: String,
    value: {
        type: Number,
        default: 1,
    },
});

const Sequence = mongoose.model<ISequence>('Sequence', sequenceSchema);

const playerSchema: Schema<IPlayer> = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: String,
    date: {
        type: Date,
        default: Date.now,
    },
    winPercentage: Number,
});

const Player = mongoose.model<IPlayer>('Player', playerSchema);

app.post('/players', async (req: Request, res: Response) => {
    try {
        let sequence: ISequence | null = await Sequence.findOne({ name: 'playerId' });
        if (!sequence) {
            sequence = new Sequence({ name: 'playerId' });
        }

        const nuevoJugador: IPlayer = new Player({
            id: sequence.value,
            name: req.body.name,
            winPercentage: 0,
        });

        await nuevoJugador.save();

        sequence.value += 1;
        await sequence.save();

        res.status(201).json({ message: 'Jugador creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el jugador:', error);
        res.status(500).json({ error: 'Error al crear el jugador' });
    }
});

app.get('/players', (_req: Request, res: Response) => {
    Player.find()
        .then((jugadores: IPlayer[]) => {
            res.status(200).json(jugadores);
        })
        .catch((error: Error) => {
            console.error('Error al leer los jugadores:', error);
            res.status(500).json({ error: 'Error al leer los jugadores' });
        });
});

app.delete('/players/:id', async (req: Request, res: Response) => {
    const playerId = parseInt(req.params.id);

    try {
        const result = await Player.deleteOne({ id: playerId });

        if (result.deletedCount && result.deletedCount > 0) {
            res.status(200).json({ message: 'Jugador eliminado exitosamente' });
        } else {
            res.status(404).json({ error: `No se encontró ningún jugador con el ID ${playerId}` });
        }
    } catch (error) {
        console.error('Error al eliminar el jugador:', error);
        res.status(500).json({ error: 'Error al eliminar el jugador' });
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

















// Eliminar un jugador por su ID
// Player.deleteOne({ _id: jugadorId })
//     .then(() => {
//         console.log('Jugador eliminado exitosamente');
//     })
//     .catch((error:any) => {
//         console.error('Error al eliminar el jugador:', error);
//     });
