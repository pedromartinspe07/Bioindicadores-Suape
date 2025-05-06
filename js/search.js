document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Sample content to search (replace with your actual content)
  const siteContent = [
    { 
      title: "Protocolo de Amostragem", 
      url: "protocolo.pdf", 
      content: "Métodos para coleta de macroinvertebrados bentônicos no Porto de Suape" 
    },
    { 
      title: "Resultados 2023", 
      url: "resultados.html", 
      content: "Dados preliminares das estações E1-E3 mostrando impactos ambientais" 
    },
    { 
      title: "Referencial Teórico", 
      url: "referencial.html", 
      content: "Bioindicadores aquáticos segundo Callisto et al. aplicados ao ecossistema costeiro" 
    },
    { 
      title: "Projeto de Pesquisa", 
      url: "projeto.html", 
      content: "Metodologia completa do monitoramento ecológico no complexo portuário" 
    }
  ];

  // Search function
  const performSearch = (query) => {
    if (!query.trim()) {
      searchResults.style.display = 'none';
      return;
    }

    const results = siteContent.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.content.toLowerCase().includes(query.toLowerCase())
    );

    displayResults(results);
  };

  // Display results
  const displayResults = (results) => {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">Nenhum resultado encontrado</div>';
    } else {
      results.forEach(result => {
        const resultElement = document.createElement('a');
        resultElement.href = result.url;
        resultElement.className = 'search-result-item';
        resultElement.innerHTML = highlightMatches(result.title, searchInput.value);
        searchResults.appendChild(resultElement);
      });
    }
    
    searchResults.style.display = 'block';
  };

  // Highlight matching text
  const highlightMatches = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(query, 'gi');
    return text.replace(regex, match => `<span class="search-highlight">${match}</span>`);
  };

  // Event listeners
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch(searchInput.value);
  });

  searchInput.addEventListener('input', () => {
    performSearch(searchInput.value);
  });

  // Close results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });
});