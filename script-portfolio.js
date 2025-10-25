/**
 * script-portfolio.js
 * Lógica do Portfólio: Navegação Suave e Menu Mobile.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
    const btnMenu = document.querySelector('.btn-menu');
    const navMenu = document.querySelector('.menu');

    // ===========================================
    // 1. Navegação Suave (Smooth Scrolling)
    // ===========================================
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Fechar menu mobile (se estiver aberto)
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }

            const targetId = link.getAttribute('href');
            if (targetId === '#home') {
                // Scroll para o topo
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Obter a altura do cabeçalho fixo para ajustar o scroll
                const headerHeight = document.querySelector('.fixed-header').offsetHeight;
                
                // Calcular a posição de destino com um pequeno offset
                const offsetPosition = targetElement.offsetTop - headerHeight - 20; 

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================
    // 2. Menu Mobile (Hamburger)
    // ===========================================
    function toggleMenu() {
        const isExpanded = btnMenu.getAttribute('aria-expanded') === 'true';
        btnMenu.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    btnMenu.addEventListener('click', toggleMenu);

    // Fechar menu mobile ao clicar em qualquer lugar fora (exceto o botão)
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !btnMenu.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ===========================================
    // 3. Destacar Link Ativo na Navegação (Active Link)
    // ===========================================
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -80% 0px", // Ajusta a margem para considerar quando a seção está no topo
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.menu a[href="#${id}"]`);
            
            if (navLink) {
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                });

                if (entry.isIntersecting) {
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===========================================
    // 4. Animações AOS (simulação simples)
    // ===========================================
    // Para um portfólio, é bom ter algumas animações de entrada. 
    // Como você usou o AOS, vou simular uma implementação simples.

    const animatedElements = document.querySelectorAll('[data-aos]');

    const aosObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const aosObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, aosObserverOptions);

    // Adiciona a classe de transição inicial
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'all 0.6s ease-out';
        aosObserver.observe(el);
    });
    
    // Estilos de Animação (para o JS funcionar sem a biblioteca AOS)
    const style = document.createElement('style');
    style.textContent = `
        /* Animação de entrada (Fade Up) */
        [data-aos] {
            opacity: 0;
            transform: translateY(30px);
        }
        
        [data-aos].aos-animate {
            opacity: 1;
            transform: translateY(0);
        }

        /* Animação para o menu mobile */
        .btn-menu span {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px;
            background: var(--text-primary);
            transition: all 0.3s ease-in-out;
        }

        .menu.active {
            transform: translateX(0);
        }

        /* Animação do ícone do menu para "X" */
        .btn-menu[aria-expanded="true"] span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .btn-menu[aria-expanded="true"] span:nth-child(2) {
            opacity: 0;
        }
        .btn-menu[aria-expanded="true"] span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
    `;
    document.head.appendChild(style);


    console.log('Portfólio JS Carregado! Pronto para a Interatividade.');
});