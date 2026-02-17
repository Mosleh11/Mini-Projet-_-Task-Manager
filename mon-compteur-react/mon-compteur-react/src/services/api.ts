const BASE_URL = '/api/tasks';

// Récupération globale
export const getAllTasks = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

// Envoi d'une nouvelle tâche 
export const createTask = async (label: string) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ label }) // Envoie seulement le texte de la tâche 
  });
  return response.json();
};

// Inversion de l'état (Check/Uncheck) 
export const toggleTask = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT'
  });
  return response.json();
};

// Suppression définitive 
export const deleteTask = async (id: number) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
};