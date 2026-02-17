import { useState, useEffect } from 'react';
import * as api from './services/api';

interface Task {
  id: number;
  label: string;
  isDone: boolean;
}

export default function App() {
  // États pour stocker les tâches et le texte du formulaire 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newLabel, setNewLabel] = useState("");

  // Charge les données au démarrage 
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await api.getAllTasks();
    setTasks(data);
  };

  // Ajout : met à jour le serveur PUIS l'écran 
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    const task = await api.createTask(newLabel);
    setTasks([...tasks, task]); // Ajoute la nouvelle tâche à la liste existante
    setNewLabel(""); // Vide le champ de saisie
  };

  const handleToggle = async (id: number) => {
    const updated = await api.toggleTask(id);
    setTasks(tasks.map(t => t.id === id ? updated : t));
  };

  const handleDelete = async (id: number) => {
    await api.deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>

      {/* Formulaire de saisie  */}
      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input 
          value={newLabel} 
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Nouvelle tâche..."
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* Liste des tâches  */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
            <span style={{ 
              textDecoration: task.isDone ? 'line-through' : 'none', // Barre le texte si fini 
              flex: 1 
            }}>
              {task.label}
            </span>
            <button onClick={() => handleToggle(task.id)}>
              {task.isDone ? "Annuler" : "Valider"} {/* Bouton Check/Uncheck  */}
            </button>
            <button onClick={() => handleDelete(task.id)} style={{ color: 'red' }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}