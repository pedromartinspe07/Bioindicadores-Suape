document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let selectedResultIndex = -1;
  
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

    // Debounce function to limit search frequency
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };
  
    // Search function with improved matching
    const performSearch = (query) => {
      try {
        if (!query.trim()) {
          searchResults.style.display = 'none';
          return;
        }

        searchResults.innerHTML = '<div class="search-loading">Buscando...</div>';
        searchResults.style.display = 'block';
        
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        
        const results = siteContent.filter(item => {
          const titleLower = item.title.toLowerCase();
          const contentLower = item.content.toLowerCase();
          
          return searchTerms.every(term => 
            titleLower.includes(term) || contentLower.includes(term)
          );
        });
  
        displayResults(results);
      } catch (error) {
        console.error('Erro na busca:', error);
        searchResults.innerHTML = '<div class="search-error">Ocorreu um erro durante a busca</div>';
      }
    };
  
    // Display results with improved UI
    const displayResults = (results) => {
      searchResults.innerHTML = '';
      selectedResultIndex = -1;
      
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">Nenhum resultado encontrado</div>';
      } else {
        results.forEach((result, index) => {
          const resultElement = document.createElement('a');
          resultElement.href = result.url;
          resultElement.className = 'search-result-item';
          resultElement.innerHTML = `
            <div class="search-result-title">${highlightMatches(result.title, searchInput.value)}</div>
            <div class="search-result-content">${highlightMatches(result.content, searchInput.value)}</div>
          `;
          resultElement.dataset.index = index;
          resultElement.addEventListener('mouseover', () => {
            selectedResultIndex = index;
            updateSelectedResult();
          });
          searchResults.appendChild(resultElement);
        });
      }
      
      searchResults.style.display = 'block';
    };

    // Update selected result styling
    const updateSelectedResult = () => {
      const results = searchResults.querySelectorAll('.search-result-item');
      results.forEach((result, index) => {
        result.classList.toggle('selected', index === selectedResultIndex);
      });
    };
  
    // Highlight matching text with improved regex
    const highlightMatches = (text, query) => {
      if (!query) return text;
      const terms = query.split(' ').filter(term => term.length > 0);
      let highlightedText = text;
      
      terms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="search-highlight">$1</span>');
      });
      
      return highlightedText;
    };
  
    // Event listeners
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      performSearch(searchInput.value);
    });
  
    searchInput.addEventListener('input', debounce(() => {
      performSearch(searchInput.value);
    }, 300));

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
      const results = searchResults.querySelectorAll('.search-result-item');
      
      switch(e.key) {
        case 'ArrowDown':
          e.preventDefault();
          selectedResultIndex = Math.min(selectedResultIndex + 1, results.length - 1);
          updateSelectedResult();
          break;
        case 'ArrowUp':
          e.preventDefault();
          selectedResultIndex = Math.max(selectedResultIndex - 1, 0);
          updateSelectedResult();
          break;
        case 'Enter':
          if (selectedResultIndex >= 0 && results[selectedResultIndex]) {
            e.preventDefault();
            results[selectedResultIndex].click();
          }
          break;
      }
    });
  
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchForm.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  });
