// Menu de navegación móvil

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Efecto de desplazamiento suave y cambio de color del encabezado al hacer scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// Desplazamiento suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            

            navLinks.classList.remove('active');
        }
    });
});


// Formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    this.reset();
});


//Observador de intersección para animaciones 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50% 0px'
};

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);


//Observar elementos para animación
document.querySelectorAll('.service-card, .testimonial-card, .about-text').forEach(el => {
    observer.observe(el);
});


// Botones de envío con efecto de carga
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.type === 'submit') {
            const originalText = this.textContent;
            this.textContent = 'Enviando...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Efecto de paralaje en la sección hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});


// Efecto de hover en tarjetas de servicios
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function(){
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function(){
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Cerrar el menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Validación del formulario de contacto
const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input[requiered], textarea[required]');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#ff6b6b';
        } else {
            this.style.boderColor = '#28a745';
        }
    });

    input.addEventListener('input', function(){
        if (this.style.borderColor === 'rgb(255, 107, 107)') {
            this.style.borderColor = '#dee2e6';
        }
    });
});


// indicador de progreso de scroll
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, #ff6b6b, #ff5252);
        z-index: 9999;
        transition: width 0.3s ease;
    `;

    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
};

// Inicializar el indicador de progreso

createScrollIndicator();


// Mejora el desplazamiento suave con injección de CSS
const smoothScrollCSS = `
    html {
        scroll-behavior: smooth !important;
        scroll-padding-top: 80px; /* Altura del header */
    }
    
    body {
        scroll-behavior: smooth !important;
    }
    
    /* Para navegadores webkit (Chrome, Safari) */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #ff6b6b;
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #ff5252;
    }
`;

//Inyectar CSS para desplazamiento suave
const styleSheet = document.createElement('style');
styleSheet.textContent = smoothScrollCSS;
document.head.appendChild(styleSheet);


// Función adicional para scroll ultra suave
const smoothScroll = (target, duration = 1000) => {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    
    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    
    requestAnimationFrame(animation);
};

// Animacion de contador para estadiscicas (por si se necesitan a futuro)

const animateCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Empezar animacion cuando el contador entre en vista
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
};

// Precarga 
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});


// Efecto de escritura para el "Hero Title"

const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const typing = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    };
    
    typing();
};

// Iniciar efecto de escritura en el título del hero

document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }

    let isScrolling = false;

    window.addEventListener('wheel', (e) => {
        e.preventDefault();

        if (!isScrolling) {
            isScrolling = true;

            const delta = e.deltaY;
            const scrollAmount = delta * 0.8;

            window.scrollBy({
                top: scrollAmount,
                behavior: 'auto'
            });

            setTimeout(() => {
                isScrolling = false;
            }, 16); 
        }
    }, { passive: false });

    let touchStartY = 0;
    let touchEndY = 0;

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        const delta = touchStartY - touchEndY;

        window.scrollBy({
            top: delta * 0.5,
            behavior: 'auto'
        });

        touchStartY = touchEndY; 
    }, { passive: true });
});