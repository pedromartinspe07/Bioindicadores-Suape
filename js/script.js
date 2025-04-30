// Função para debounce - melhora performance em eventos que podem ser disparados muitas vezes
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

// Função para rolagem suave com tratamento de erro
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

// Função para atualizar o ano do copyright
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

// Função para destacar link ativo
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

// Função para inicializar todos os eventos
function initializeEvents() {
    // Rolagem suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Atualiza o ano do copyright
    updateCopyright();

    // Destaca o link ativo
    highlightActiveLink();

    // Adiciona listener para mudanças na URL (útil para SPA)
    window.addEventListener('popstate', debounce(highlightActiveLink, 100));
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializeEvents);
