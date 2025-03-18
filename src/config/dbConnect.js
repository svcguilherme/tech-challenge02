import mongoose from 'mongoose';

async function conectaNaDatabase() {
  mongoose.connect(
    process.env.DB_CONNECTION_STRING ||
      'mongodb+srv://admin:admin933106@escola-avanco-postech.e0yfy.mongodb.net/EscolaAvanco?retryWrites=true&w=majority&appName=Escola-Avanco-Postech',
  );
  return mongoose.connection;
}

export default conectaNaDatabase;

// pass: admin933106
