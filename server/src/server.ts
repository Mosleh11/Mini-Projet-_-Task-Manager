import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Importation de notre routeur externe créé précédemment
import movieRoutes from './routes/movie.routes';

const app = express();
// Le TP indique le port 3000 pour le backend afin de le lier au frontend
const PORT = 3000;

// 1. Configuration de la sécurité et des données
// Autoriser le Frontend à communiquer avec l'API
app.use(cors());
app.use(express.json());

// 2. Connexion à la base de données MongoDB Atlas
const uri = "mongodb+srv://moslehmohammed320_db_user:k3rigB6zQvVWKlVb@mernstarter.dupmppf.mongodb.net/test?appName=MernStarter";

mongoose.connect(uri)
  .then(() => console.log("Connexion réussie à MongoDB Atlas!"))
  .catch((error) => console.error("Erreur de connexion à la base de données:", error));

// 3. Liaison des routes
// On indique au serveur d'utiliser nos routes avec le préfixe /api/movies
app.use('/api/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});