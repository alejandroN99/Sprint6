const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/prueba', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error: any) => {
        console.error('Error al conectar a la base de datos:', error);
    });


// Evento de conexión exitosa
mongoose.connection.on('connected', () => {
    console.log('Conexión establecida a MongoDB');
});

// Evento de error en la conexión
mongoose.connection.on('error', (error: any) => {
    console.error('Error en la conexión a MongoDB:', error);
});



// Define el esquema
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    id: Number,
    name: String,
    date: String,
    winPercentage: Number
});

// Crea un modelo a partir del esquema
const Player = mongoose.model('Player', playerSchema);

// Crea un nuevo jugador
const nuevoJugador = new Player({
    id: 1,
    name: 'John Doe',
    date: '2023-07-04',
    winPercentage: 75.5
});

// Guarda el jugador en la base de datos
nuevoJugador.save()
    .then(() => {
        console.log('Jugador creado exitosamente');
    })
    .catch((error: any) => {
        console.error('Error al crear el jugador:', error);
    });

Player.find()
    .then((jugadores:any) => {
        console.log('Jugadores encontrados:', jugadores);
    })
    .catch((error:any) => {
        console.error('Error al leer los jugadores:', error);
    });
