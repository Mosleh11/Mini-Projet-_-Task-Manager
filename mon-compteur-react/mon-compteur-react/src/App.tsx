import { useState, useEffect } from 'react';

interface Movie {
  _id: string; 
  title: string;
  director: string;
  year: number;
  genre: string;
  poster?: string;
  description?: string;
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  
  //  Pour gérer le tri par année 
  const [sortByYear, setSortByYear] = useState(false);

  useEffect(() => {
    // Construction de l'URL avec les paramètres 
    let url = `http://localhost:3000/api/movies?title=${search}`;
    if (genre) url += `&genre=${genre}`;
    
    // Si le tri est activé, on ajoute le paramètre sort=year 
    if (sortByYear) url += `&sort=year`;

    fetch(url)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  }, [search, genre, sortByYear]); // On ajoute sortByYear aux dépendances 

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Ciné-Explore</h1>

      <div style={{ marginBottom: '30px', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <input 
          placeholder="Rechercher un film..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '10px', flex: 2, borderRadius: '5px', border: '1px solid #ccc' }}
        />
        
        <select 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)}
          style={{ padding: '10px', flex: 1, borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">Tous les genres</option>
          <option value="Action">Action</option>
          <option value="fantasie">Fantasie</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>

        {/* Bouton de Tri   */}
        <button 
          onClick={() => setSortByYear(!sortByYear)}
          style={{ 
            padding: '10px 15px', 
            borderRadius: '5px', 
            border: 'none', 
            cursor: 'pointer',
            backgroundColor: sortByYear ? '#28a745' : '#6c757d',
            color: 'white'
          }}
        >
          {sortByYear ? "Tri : Plus récents" : "Trier par année"}
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {movies.map(movie => (
          <div key={movie._id} style={{ 
            border: '1px solid #eee', 
            borderRadius: '10px', 
            overflow: 'hidden', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
          }}>
            <img 
              src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'} 
              alt={movie.title}
              style={{ width: '100%', height: '350px', objectFit: 'cover' }}
            />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{movie.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9em' }}>{movie.genre} • {movie.year}</p>
              <p style={{ fontSize: '0.85em', color: '#444' }}>{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
