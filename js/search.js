// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchForm = document.getElementById('search-form');

    const pagesToSearch = [
        { url: 'index.html', title: 'Home' },
        { url: 'projeto.html', title: 'O Projeto' },
        { url: 'referencial.html', title: 'Referencial' },
        { url: 'resultados.html', title: 'Resultados' },
        { url: 'sobre.html', title: 'Sobre o Projeto' },
        { url: 'publicacoes.html', title: 'Publicações' },
        { url: 'dados.html', title: 'Dados' },
        { url: 'glossario.html', title: 'Glossário' },
        { url: 'contato.html', title: 'Contato' }
    ];

    let pageContent = [];

    async function fetchPageContent() {
        for (const page of pagesToSearch) {
            try {
                const response = await fetch(page.url);
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                // Extract relevant text content from the main section or body
                const contentElements = doc.querySelectorAll('main p, main h1, main h2, main h3, main h4, main h5, main h6, .card p, .card h3, .publication-item p, .publication-item h3, .data-set-item p, .data-set-item h4, .glossary-item p, .glossary-item h3');
                let fullContent = '';
                contentElements.forEach(el => {
                    fullContent += el.innerText + ' ';
                });
                pageContent.push({ ...page, content: fullContent.toLowerCase() });
            } catch (error) {
                console.error(`Erro ao carregar o conteúdo de ${page.url}:`, error);
            }
        }
    }

    fetchPageContent();

    // Debounce function to limit how often the search function runs
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Function to perform the search
    async function performSearch(query) {
        if (!query.trim()) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const words = lowerCaseQuery.split(' ');
        const foundMatches = [];

        pageContent.forEach(page => {
            const pageMatches = [];
            // Search in page title
            if (page.title.toLowerCase().includes(lowerCaseQuery)) {
                pageMatches.push({ type: 'title', text: page.title });
            }
            // Search in content
            if (page.content.includes(lowerCaseQuery)) {
                // Simple way to get some context, more advanced snippet generation could be done here
                const startIndex = page.content.indexOf(lowerCaseQuery);
                const endIndex = startIndex + lowerCaseQuery.length;
                let snippet = page.content.substring(Math.max(0, startIndex - 100), Math.min(page.content.length, endIndex + 100));
                snippet = '...' + snippet + '...';
                pageMatches.push({ type: 'content', text: snippet });
            }

            // If matches found for this page, add to overall results
            if (pageMatches.length > 0) {
                foundMatches.push({
                    url: page.url,
                    title: page.title,
                    matches: pageMatches
                });
            }
        });

        // Display results
        if (foundMatches.length > 0) {
            searchResults.innerHTML = foundMatches
                .map(pageMatch => `
                    <a href="${pageMatch.url}" class="search-result-item">
                        <h3>${pageMatch.title}</h3>
                        ${pageMatch.matches.map(match => `<p>${match.text}</p>`).join('')}
                    </a>
                `)
                .join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-result-item">Nenhum resultado encontrado</div>';
            searchResults.style.display = 'block';
        }
    }

    // Debounced search function
    const debouncedSearch = debounce((query) => {
        performSearch(query);
    }, 300);

    // Event listeners
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}); 
