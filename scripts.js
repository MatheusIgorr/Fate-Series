// Global variables
let currentSlide = 0;
let autoPlayInterval;
let progressInterval;
const slideCount = 7;
const autoPlayDuration = 7000; // Aumentado para 7 segundos (era 5s)

// Rain Effect for Video Section - Mais lento
function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    const rainCount = 150;

    for (let i = 0; i < rainCount; i++) {
        const rainDrop = document.createElement('div');
        rainDrop.className = 'rain';
        rainDrop.style.left = Math.random() * 100 + '%';
        rainDrop.style.animationDelay = Math.random() * 30 + 's'; // Aumentado de 20s
        rainDrop.style.animationDuration = (8 + Math.random() * 6) + 's'; // Aumentado de 5-10s
        rainContainer.appendChild(rainDrop);
    }
}

// Rain Effect for Characters Section - Mais lento
function createCharactersRain() {
    const rainContainer = document.getElementById('charactersRainContainer');
    const rainCount = 100;

    for (let i = 0; i < rainCount; i++) {
        const rainDrop = document.createElement('div');
        rainDrop.className = 'characters-rain';
        rainDrop.style.left = Math.random() * 100 + '%';
        rainDrop.style.animationDelay = Math.random() * 35 + 's'; // Aumentado de 25s
        rainDrop.style.animationDuration = (10 + Math.random() * 6) + 's'; // Aumentado de 8-12s
        rainContainer.appendChild(rainDrop);
    }
}

// Carousel functionality - Transição mais lenta
function goToSlide(slideIndex) {
    const slides = document.getElementById('carouselSlides');
    const navDots = document.querySelectorAll('.nav-dot');
    const characterSlides = document.querySelectorAll('.character-slide');
    const progressBar = document.getElementById('progressBar');
    
    currentSlide = slideIndex;
    
    // Transição mais suave (0.8s em vez de 0.4s)
    slides.style.transition = 'transform 0.8s ease-in-out';
    const translateX = -slideIndex * 14.2857;
    slides.style.transform = `translateX(${translateX}%)`;
    
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
}

// Progress bar functionality - Mais lento
function startProgressBar() {
    const progressBar = document.getElementById('progressBar');
    let progress = 0;
    // Mais suave (incremento menor)
    const increment = 100 / (autoPlayDuration / 100);
    
    progressInterval = setInterval(() => {
        progress += increment;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 100); // Atualização a cada 100ms (era 50ms)
}

// Restante do código permanece igual...
