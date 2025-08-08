// Global variables
let currentSlide = 0;
let autoPlayInterval;
let progressInterval;
const slideCount = 7;
const autoPlayDuration = 5000; // Reduzido para 5 segundos
let isAnimating = false;
let touchStartTime = 0;

// Rain Effect for Video Section
function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    const rainCount = 150;

    for (let i = 0; i < rainCount; i++) {
        const rainDrop = document.createElement('div');
        rainDrop.className = 'rain';
        rainDrop.style.left = Math.random() * 100 + '%';
        rainDrop.style.animationDelay = Math.random() * 10 + 's'; // Reduzido
        rainDrop.style.animationDuration = (3 + Math.random() * 3) + 's'; // Mais rápido
        rainContainer.appendChild(rainDrop);
    }
}

// Rain Effect for Characters Section
function createCharactersRain() {
    const rainContainer = document.getElementById('charactersRainContainer');
    const rainCount = 100;

    for (let i = 0; i < rainCount; i++) {
        const rainDrop = document.createElement('div');
        rainDrop.className = 'characters-rain';
        rainDrop.style.left = Math.random() * 100 + '%';
        rainDrop.style.animationDelay = Math.random() * 15 + 's'; // Reduzido
        rainDrop.style.animationDuration = (5 + Math.random() * 3) + 's'; // Mais rápido
        rainContainer.appendChild(rainDrop);
    }
}

// [Restante das funções permanecem as mesmas, exceto pelos ajustes abaixo]

// Carousel functionality
function goToSlide(slideIndex, instant = false) {
    if (isAnimating) return;
    isAnimating = true;
    
    const slides = document.getElementById('carouselSlides');
    // Adiciona transição mais rápida
    slides.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
    
    // ... restante da função permanece igual
}

// Progress bar functionality - Mais rápido
function startProgressBar() {
    resetProgressBar();
    const progressBar = document.getElementById('progressBar');
    progressBar.style.transition = `width ${autoPlayDuration}ms linear`;
    progressBar.style.width = '100%';
}

// [O restante do código permanece igual]
