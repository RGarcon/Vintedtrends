document.addEventListener('DOMContentLoaded', () => {
  const trendsURL = 'https://vinted-trends-backend-1.onrender.com/trends';
  const keywordsBaseURL = 'https://vinted-trends-backend-1.onrender.com/keywords/';
  const contentDiv = document.getElementById('content');
  const keywordsDiv = document.getElementById('keywords'); // à ajouter dans ton HTML

  fetch(trendsURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur de réponse du réseau');
      }
      return response.json();
    })
    .then(hashtags => {
      contentDiv.innerHTML = ''; // vide l’ancien contenu

      if (hashtags.length > 0) {
        const list = document.createElement('ul');
        list.classList.add('tag-list');

        hashtags.forEach(tag => {
          const li = document.createElement('li');
          li.classList.add('tag-item');

          const a = document.createElement('a');
          let tagName = tag.startsWith('#') ? tag.slice(1) : tag;
          a.textContent = '#' + tagName;
          a.href = `https://www.tiktok.com/tag/${tagName}`;
          a.target = '_blank';

          // Ajout du clic pour charger les mots-clés
          a.addEventListener('click', (e) => {
            e.preventDefault(); // empêche le lien de s’ouvrir
            loadKeywords(tagName);
          });

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

  function loadKeywords(tag) {
    keywordsDiv.innerHTML = `<p>Chargement des mots-clés pour #${tag}...</p>`;

    fetch(keywordsBaseURL + tag)
      .then(response => response.json())
      .then(words => {
        if (words.error) {
          keywordsDiv.innerHTML = `<p>Erreur : ${words.error}</p>`;
          return;
        }

        const list = document.createElement('ul');
        words.forEach(word => {
          const li = document.createElement('li');
          li.textContent = word;
          list.appendChild(li);
        });

        keywordsDiv.innerHTML = `<h3>Mots-clés TikTok pour #${tag}</h3>`;
        keywordsDiv.appendChild(list);
      })
      .catch(error => {
        keywordsDiv.innerHTML = `<p>Erreur lors du chargement : ${error.message}</p>`;
      });
  }
});
