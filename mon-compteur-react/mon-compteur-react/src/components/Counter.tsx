import { useState, useEffect } from 'react';

const Counter = () => {
  // 1. Initialisation : Au lieu de partir de 0, on lit le localStorage
  const [count, setCount] = useState(() => {
    // On essaie de récupérer la valeur sauvegardée avec la clé 'monCompteur'
    const savedCount = localStorage.getItem('monCompteur');
    // Si elle existe, on la transforme en nombre (parseInt), sinon on met 0
    return savedCount ? parseInt(savedCount) : 0;
  });

  // 2. Sauvegarde : Utilisation de useEffect pour réagir aux changements
  // Ce code s'exécute à chaque fois que la variable 'count' change
  useEffect(() => {
    // On sauvegarde la nouvelle valeur dans le localStorage
    localStorage.setItem('monCompteur', count.toString());
  }, [count]); // Le tableau de dépendances contient 'count'

  // Fonctions de gestion
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div style={{ border: '2px dashed #007BFF', padding: '20px', margin: '20px', textAlign: 'center' }}>
      <h3>Compteur Persistant</h3>
      <p style={{ fontSize: '40px', fontWeight: 'bold', color: count < 0 ? 'red' : 'black' }}>
        {count}
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={decrement} style={{ padding: '10px' }}>- Diminuer</button>
        <button onClick={increment} style={{ padding: '10px' }}>+ Augmenter</button>
      </div>
    </div>
  );
};

export default Counter;