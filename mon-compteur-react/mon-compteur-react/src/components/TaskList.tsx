import { useState, useEffect } from 'react';

// Définition de l'interface pour une tâche [cite: 179-183]
interface Task {
  id: number;
  label: string;
  isDone: boolean;
}

export default function TaskList() {
  // 1. Les Données : stockées dans un tableau [cite: 185-186]
  const [tasks, setTasks] = useState<Task[]>([]);

  // 2. L'état de chargement : true par défaut pendant l'attente [cite: 187]
  const [isLoading, setIsLoading] = useState(true);

  // 3. L'erreur : null par défaut, stocke le message en cas de problème [cite: 188]
  const [error, setError] = useState<string | null>(null);

  // Déclenchement de la récupération au montage du composant [cite: 189-191]
  useEffect(() => {
    fetchTasks();
  }, []);

  // Logique de récupération robuste (Try / Catch / Finally) [cite: 213-214]
  const fetchTasks = async () => {
    try {
      // On réinitialise l'erreur avant de commencer [cite: 215, 222]
      setError(null);
      setIsLoading(true);

      // Appel vers le serveur Node (port 3001) [cite: 223]
      const response = await fetch('http://localhost:3001/api/tasks');

      // Vérification du statut HTTP car fetch ne plante pas sur un 404 ou 500 [cite: 217, 224-225]
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`); // [cite: 227]
      }

      const data = await response.json();
      setTasks(data); // Mise à jour des données [cite: 228]

    } catch (err: any) {
      // Capture de l'erreur réseau ou de l'erreur levée manuellement [cite: 218, 229-231]
      setError(err.message || "Impossible de contacter le serveur"); // [cite: 232]
      
    } finally {
      // On arrête le chargement quoi qu'il arrive (succès ou échec) [cite: 219, 233-235]
      setIsLoading(false);
    }
  };

  // --- RENDU CONDITIONNEL ---

  // Cas 1 : Chargement en cours [cite: 196-199]
  if (isLoading) {
    return <div className="loading-spinner">Chargement des tâches...</div>;
  }

  // Cas 2 : Affichage de l'erreur [cite: 200-203]
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Cas 3 : Succès, affichage de la liste [cite: 204-206]
  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>Liste des tâches serveur</h3>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.label} - {t.isDone ? "(Terminé)" : "(En cours)"}
          </li>
        ))}
      </ul>
    </div>
  );
}