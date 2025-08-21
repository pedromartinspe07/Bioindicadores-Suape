// Consolidated JavaScript Utilities for Bioindicadores Suape Website

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

// Function for smooth scrolling with error handling
function smoothScroll(target) {
    try {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    } catch (error) {
        console.error('Erro ao fazer scroll:', error);
    }
}

// Dynamically load Google Fonts for better performance
const loadFonts = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
};

// Function to update the copyright year in the footer
function updateCopyright() {
    try {
        const footer = document.querySelector('footer p:last-child');
        if (footer) {
            footer.innerHTML = `© ${new Date().getFullYear()} BioIndicadores Suape. Todos os direitos reservados.`;
        }
    } catch (error) {
        console.error('Erro ao atualizar copyright:', error);
    }
}

// Function to highlight the active navigation link
function highlightActiveLink() {
    try {
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a').forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    } catch (error) {
        console.error('Erro ao destacar link ativo:', error);
    }
}

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

    const debouncedSearch = debounce((query) => {
        performSearch(query);
    }, 300);

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
            if (page.title.toLowerCase().includes(lowerCaseQuery)) {
                pageMatches.push({ type: 'title', text: page.title });
            }
            if (page.content.includes(lowerCaseQuery)) {
                const startIndex = page.content.indexOf(lowerCaseQuery);
                const endIndex = startIndex + lowerCaseQuery.length;
                let snippet = page.content.substring(Math.max(0, startIndex - 100), Math.min(page.content.length, endIndex + 100));
                snippet = '...' + snippet + '...';
                pageMatches.push({ type: 'content', text: snippet });
            }

            if (pageMatches.length > 0) {
                foundMatches.push({
                    url: page.url,
                    title: page.title,
                    matches: pageMatches
                });
            }
        });

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

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
});

// Function to initialize all common events
function initializeCommonEvents() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Update copyright year
    updateCopyright();

    // Highlight active link
    highlightActiveLink();

    // Add listener for URL changes (useful for SPA)
    window.addEventListener('popstate', debounce(highlightActiveLink, 100));
}

// Initialize common events when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCommonEvents);

// CSV parsing utility function
async function parseCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(header => header.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(value => value.trim());
        if (values.length === headers.length) {
            let row = {};
            for (let j = 0; j < headers.length; j++) {
                row[headers[j]] = values[j];
            }
            data.push(row);
        }
    }
    return data;
} 
