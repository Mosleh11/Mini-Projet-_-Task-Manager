import { Request, Response } from 'express';
import Movie from '../models/movie.model';

// 1. Créer un film (POST)
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création", error });
  }
};

// 2. Récupérer tous les films avec FILTRES (GET) 
export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    
    // Filtrage par titre (regex pour recherche partielle) 
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: 'i' };
    }

    // Filtrage par genre 
    if (req.query.genre) {
      filter.genre = req.query.genre;
    }

    // Gestion du tri par année 
    const sortOption: any = {};
    if (req.query.sort === 'year') {
      sortOption.year = -1;
    }

    const movies = await Movie.find(filter).sort(sortOption); 
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération", error });
  }
};

// 3. Récupérer un seul film par son ID (GET) 
export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ message: "Film non trouvé" });
      return;
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur", error });
  }
};

// 4. Modifier un film (PUT) 
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ message: "Film non trouvé" });
      return;
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erreur de mise à jour", error });
  }
};

// 5. Supprimer un film (DELETE) 
export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Film non trouvé" });
      return;
    }
    res.status(200).json({ message: "Film supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur de suppression", error });
  }
};