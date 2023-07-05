import mongoose, { Schema, Document } from 'mongoose';

mongoose.connect('mongodb://localhost:27017/prueba', {
})
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error: Error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

// Definir el tipo para el modelo de jugador
interface IPlayer extends Document {
    id: number;
    name: string;
    date: Date;
    winPercentage: number;
}

// Definir el esquema para la secuencia de ID
interface ISequence extends Document {
    name: string;
    value: number;
}

// Evento de conexión exitosa
mongoose.connection.on('connected', () => {
    console.log('Conexión establecida a MongoDB');
});

// Evento de error en la conexión
mongoose.connection.on('error', (error: Error) => {
    console.error('Error en la conexión a MongoDB:', error);
});

// Define el esquema para la secuencia de ID
const sequenceSchema: Schema<ISequence> = new Schema({
    name: String,
    value: {
        type: Number,
        default: 1,
    },
});

// Crea un modelo para la secuencia de ID
const Sequence = mongoose.model<ISequence>('Sequence', sequenceSchema);

// Define el esquema para el jugador
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

// Crea un modelo para el jugador
const Player = mongoose.model<IPlayer>('Player', playerSchema);

(async () => {
    try {
        // Obtiene la secuencia actualizada o crea una nueva si no existe
        let sequence: ISequence | null = await Sequence.findOne({ name: 'playerId' });
        if (!sequence) {
            sequence = new Sequence({ name: 'playerId' });
        }

        // Asigna el ID al nuevo jugador
        const nuevoJugador: IPlayer = new Player({
            id: sequence.value,
            name: 'John Doe',
            winPercentage: 0,
        });

        // Guarda el jugador en la base de datos
        await nuevoJugador.save();

        // Incrementa el valor de la secuencia
        sequence.value += 1;
        await sequence.save();

        console.log('Jugador creado exitosamente');
    } catch (error) {
        console.error('Error al crear el jugador:', error);
    }
})();

Player.find()
    .then((jugadores: IPlayer[]) => {
        console.log('Jugadores encontrados:', jugadores);
    })
    .catch((error: Error) => {
        console.error('Error al leer los jugadores:', error);
    });

async function deletePlayerById(playerId: number): Promise<void> {
    try {
        // Busca y elimina al jugador por su ID
        const result = await Player.deleteOne({ id: playerId });

        if (result.deletedCount && result.deletedCount > 0) {
            console.log('Jugador eliminado exitosamente');
        } else {
            console.log(`No se encontró ningún jugador con el ID ${playerId}`);
        }
    } catch (error) {
        console.error('Error al eliminar el jugador:', error);
    }
}

deletePlayerById(1);
















// Eliminar un jugador por su ID
// Player.deleteOne({ _id: jugadorId })
//     .then(() => {
//         console.log('Jugador eliminado exitosamente');
//     })
//     .catch((error:any) => {
//         console.error('Error al eliminar el jugador:', error);
//     });
