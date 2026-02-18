import { Router } from 'express';
// Importation les fonctions nécessaires au CRUD complet 
import { 
  createMovie, 
  getAllMovies, 
  getMovieById, 
  updateMovie, 
  deleteMovie 
} from '../controllers/movie.controller';

const router = Router();

// Routes définies selon le cahier des charges 
router.post('/', createMovie);       // Créer un film
router.get('/', getAllMovies);       // Récupérer tous les films 
router.get('/:id', getMovieById);    // Récupérer un film précis
router.put('/:id', updateMovie);     // Modifier un film
router.delete('/:id', deleteMovie);  // Supprimer un film

export default router;