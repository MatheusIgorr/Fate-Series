// Global variables
let currentSlide = 0;
let autoPlayInterval;
let progressInterval;
const slideCount = 7;
const autoPlayDuration = 5000; // Reduzido de 8000 para 5000ms (5 segundos)
let isAnimating = false;
let touchStartTime = 0;

// Rain Effect for Video Section - Mais rápido
function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    const rainCount = 150;

    for (let i = 0; i < rainCount; i++) {
        const rainDrop = document.createElement('div');
        rainDrop.className = 'rain';
        rainDrop.style.left = Math.random() * 100 + '%';
        rainDrop.style.animationDelay = Math.random() * 10 + 's'; // Reduzido de 20s
        rainDrop.style.animationDuration = (2 + Math.random() * 3) + 's'; // Reduzido de 5-10s
        rainContainer.appendChild(rainDrop);
    }
}

// Rain Effect for Characters Section - Mais rápido
function createCharactersRain() {
    const rainContainer = document.getElementById('charactersRainContainer');
    const rainCount = 100;

    for (let i = 0; i < rainCount; i++) {
        const rainDrop = document.createElement('div');
        rainDrop.className = 'characters-rain';
        rainDrop.style.left = Math.random() * 100 + '%';
        rainDrop.style.animationDelay = Math.random() * 15 + 's'; // Reduzido de 25s
        rainDrop.style.animationDuration = (4 + Math.random() * 2) + 's'; // Reduzido de 8-12s
        rainContainer.appendChild(rainDrop);
    }
}

// Carousel functionality - Transição mais rápida
function goToSlide(slideIndex, instant = false) {
    if (isAnimating) return;
    isAnimating = true;
    
    const slides = document.getElementById('carouselSlides');
    const navDots = document.querySelectorAll('.nav-dot');
    const characterSlides = document.querySelectorAll('.character-slide');
    const progressBar = document.getElementById('progressBar');
    
    currentSlide = slideIndex;
    const translateX = -slideIndex * (100 / slideCount);
    
    // Configura transição mais rápida (400ms em vez do padrão)
    slides.style.transition = instant ? 'none' : 'transform 0.4s ease-in-out';
    
    if (instant) {
        slides.style.transform = `translateX(${translateX}%)`;
        void slides.offsetWidth; // Forçar reflow
    } else {
        slides.style.transform = `translateX(${translateX}%)`;
    }
    
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
    
    characterSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });
    
    const currentTheme = characterSlides[slideIndex].classList[1];
    progressBar.className = `progress-bar ${currentTheme}`;
    
    resetProgressBar();
    startProgressBar();
    
    slides.addEventListener('transitionend', () => {
        isAnimating = false;
    }, { once: true });
}

// Progress bar functionality - Mais eficiente
function startProgressBar() {
    resetProgressBar();
    const progressBar = document.getElementById('progressBar');
    progressBar.style.transition = `width ${autoPlayDuration}ms linear`;
    progressBar.style.width = '100%';
}

// Restante do código permanece igual...
