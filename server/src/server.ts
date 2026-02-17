import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Configuration du serveur 
app.use(cors()); // Autorise le frontend à communiquer avec le serveur
app.use(express.json()); // Permet au serveur de lire les données JSON envoyées par le client

// Contrat de données : définit à quoi ressemble une tâche 
interface Task {
  id: number;
  label: string;
  isDone: boolean;
}

// Base de données temporaire en mémoire (RAM) 
let tasks: Task[] = [
  { id: 1, label: "tache 1", isDone: true },
  { id: 2, label: "tache 2", isDone: false }
];

// Route 1 : Récupérer toutes les tâches 
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Route 2 : Ajouter une tâche 
app.post('/api/tasks', (req, res) => {
  const { label } = req.body;
  const newTask: Task = {
    id: Date.now(), // ID unique basé sur l'heure actuelle 
    label: label,
    isDone: false // Une tâche est toujours incomplète au début 
  };
  tasks.push(newTask);
  res.status(201).json(newTask); // Status 201 signifie "Créé avec succès" 
});

// Route 3 : Modifier l'état (terminé/en cours) 
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.isDone = !task.isDone; // Inverse la valeur de isDone 
    res.json(task);
  }
});

// Route 4 : Supprimer une tâche 
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id); // Retire la tâche du tableau 
  res.json({ message: "Tâche supprimée" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});