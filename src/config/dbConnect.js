import mongoose from 'mongoose';

async function conectaNaDatabase() {
  mongoose.connect(
    process.env.DB_CONNECTION_STRING ||
      'mongodb://mongo:27017/techChallenge',
  );
  return mongoose.connection;
}

export default conectaNaDatabase;

// pass: admin933106
