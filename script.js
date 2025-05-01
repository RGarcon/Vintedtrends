document.addEventListener('DOMContentLoaded', () => {
  const apiURL = 'https://vinted-trends-backend-1.onrender.com';
  const contentDiv = document.getElementById('content');

  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur de réponse du réseau');
      }
      return response.json();
    })
    .then(hashtags => {
      // Effacer le message de chargement
      contentDiv.innerHTML = '';

      if (hashtags.length > 0) {
        const list = document.createElement('ul');
        list.classList.add('tag-list');

        hashtags.forEach(tag => {
          const li = document.createElement('li');
          li.classList.add('tag-item');

          const a = document.createElement('a');
          // Supprimer le caractère # pour construire le lien
          let tagName = tag.startsWith('#') ? tag.slice(1) : tag;
          a.textContent = '#' + tagName;
          a.href = `https://www.tiktok.com/tag/${tagName}`;
          a.target = '_blank';

          li.appendChild(a);
          list.appendChild(li);
        });

        contentDiv.appendChild(list);
      } else {
        contentDiv.textContent = 'Aucune tendance trouvée.';
      }
    })
    .catch(error => {
      console.error('Erreur de chargement :', error);
      contentDiv.innerHTML = '<p>Erreur de chargement des données. Veuillez réessayer plus tard.</p>';
    });
});
