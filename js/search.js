// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchForm = document.getElementById('search-form');

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

        try {
            // Search through the current page content
            const content = document.body.innerText.toLowerCase();
            const words = query.toLowerCase().split(' ');
            
            // Find matches in the content
            const matches = [];
            const paragraphs = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
            
            paragraphs.forEach(element => {
                const text = element.innerText.toLowerCase();
                if (words.every(word => text.includes(word))) {
                    matches.push({
                        text: element.innerText,
                        element: element.tagName.toLowerCase()
                    });
                }
            });

            // Display results
            if (matches.length > 0) {
                searchResults.innerHTML = matches
                    .map(match => `
                        <div class="search-result-item">
                            <${match.element}>${match.text}</${match.element}>
                        </div>
                    `)
                    .join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="search-result-item">Nenhum resultado encontrado</div>';
                searchResults.style.display = 'block';
            }
        } catch (error) {
            console.error('Erro na busca:', error);
            searchResults.innerHTML = '<div class="search-result-item">Erro ao realizar a busca</div>';
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
