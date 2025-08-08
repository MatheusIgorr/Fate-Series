// Global variables
let currentSlide = 0;
let autoPlayInterval;
let progressInterval;
const slideCount = 7;
const autoPlayDuration = 8000; // Aumentado para 8 segundos
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
        rainDrop.style.animationDelay = Math.random() * 20 + 's';
        rainDrop.style.animationDuration = (5 + Math.random() * 5) + 's';
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
        rainDrop.style.animationDelay = Math.random() * 25 + 's';
        rainDrop.style.animationDuration = (8 + Math.random() * 4) + 's';
        rainContainer.appendChild(rainDrop);
    }
}

// Video fade effect on scroll
function handleVideoFade() {
    const videoSection = document.getElementById('videoSection');
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    const fadeStart = windowHeight * 0.3;
    const fadeEnd = windowHeight * 0.8;
    
    let opacity = 1;
    
    if (scrolled > fadeStart) {
        opacity = 1 - ((scrolled - fadeStart) / (fadeEnd - fadeStart));
        opacity = Math.max(0, Math.min(1, opacity));
    }
    
    videoSection.style.opacity = opacity;
}

// Characters section fade effect on scroll
function handleCharactersFade() {
    const charactersSection = document.getElementById('charactersSection');
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const sectionTop = charactersSection.offsetTop;
    const sectionHeight = charactersSection.offsetHeight;
    
    const fadeOutStart = sectionTop + sectionHeight - windowHeight;
    const fadeOutEnd = sectionTop + sectionHeight;
    const fadeInStart = sectionTop - windowHeight * 0.5;
    const fadeInEnd = sectionTop;
    
    let opacity = 1;
    
    if (scrolled > fadeOutStart && scrolled < fadeOutEnd) {
        opacity = 1 - ((scrolled - fadeOutStart) / (fadeOutEnd - fadeOutStart));
    } else if (scrolled >= fadeOutEnd) {
        opacity = 0;
    } else if (scrolled > fadeInStart && scrolled < fadeInEnd) {
        opacity = (scrolled - fadeInStart) / (fadeInEnd - fadeInStart);
    } else if (scrolled <= fadeInStart) {
        opacity = 0;
    }
    
    charactersSection.style.opacity = Math.max(0, Math.min(1, opacity));
}

// Classes title animation on scroll
function handleClassesTitleAnimation() {
    const classesTitle = document.getElementById('classesTitle');
    const classesSubtitle = document.getElementById('classesSubtitle');
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const titleTop = classesTitle.offsetTop;
    
    if (scrolled + windowHeight > titleTop + 100) {
        classesTitle.classList.add('animate-in');
        classesSubtitle.classList.add('animate-in');
    }
}

// Carousel functionality
function goToSlide(slideIndex, instant = false) {
    if (isAnimating) return;
    isAnimating = true;
    
    const slides = document.getElementById('carouselSlides');
    const navDots = document.querySelectorAll('.nav-dot');
    const characterSlides = document.querySelectorAll('.character-slide');
    const progressBar = document.getElementById('progressBar');
    
    currentSlide = slideIndex;
    
    const translateX = -slideIndex * (100 / slideCount);
    
    if (instant) {
        slides.style.transition = 'none';
        slides.style.transform = `translateX(${translateX}%)`;
        // Forçar reflow
        void slides.offsetWidth;
        slides.style.transition = '';
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
    
    // Reset animation flag after transition ends
    slides.addEventListener('transitionend', () => {
        isAnimating = false;
    }, { once: true });
}

// Auto-play functionality
function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % slideCount;
        goToSlide(nextSlide);
    }, autoPlayDuration);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Progress bar functionality - CORRIGIDO
function startProgressBar() {
    resetProgressBar();
    const progressBar = document.getElementById('progressBar');
    const startTime = Date.now();
    
    progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed / autoPlayDuration) * 100;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        } else {
            progressBar.style.width = `${progress}%`;
        }
    }, 16); // ~60fps
}

function resetProgressBar() {
    clearInterval(progressInterval);
    document.getElementById('progressBar').style.width = '0%';
}

// Navigation dot click handlers
function setupNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentSlide !== index) {
                goToSlide(index);
                resetAutoPlay();
            }
        });
        
        dot.addEventListener('mouseenter', stopAutoPlay);
        dot.addEventListener('mouseleave', startAutoPlay);
    });
}

// Button hover effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.contract-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.filter = 'brightness(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.filter = 'brightness(1)';
        });
        
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                button.style.transform = 'scale(1.05)';
            }, 100);
        });
    });
}

// Ability items hover effects
function addAbilityHoverEffects() {
    const abilityItems = document.querySelectorAll('.ability-item');
    
    abilityItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();
        }
        
        switch(e.key) {
            case 'ArrowLeft':
                const prevSlide = currentSlide === 0 ? slideCount - 1 : currentSlide - 1;
                goToSlide(prevSlide);
                resetAutoPlay();
                break;
            case 'ArrowRight':
                const nextSlide = (currentSlide + 1) % slideCount;
                goToSlide(nextSlide);
                resetAutoPlay();
                break;
            case ' ':
                if (autoPlayInterval) {
                    stopAutoPlay();
                    resetProgressBar();
                } else {
                    startAutoPlay();
                }
                break;
        }
    });
}

// Touch/swipe support for mobile - MELHORADO
function setupTouchNavigation() {
    const carousel = document.querySelector('.carousel-container');
    let startX = 0;
    let startTime = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startTime = Date.now();
        stopAutoPlay();
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Impede scroll durante o swipe
    }, { passive: false });
    
    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endTime = Date.now();
        handleSwipe(startX, endX, endTime - startTime);
        startAutoPlay();
    }, { passive: true });
    
    function handleSwipe(startX, endX, duration) {
        const diff = startX - endX;
        const absDiff = Math.abs(diff);
        const threshold = 50;
        const velocity = absDiff / duration;
        
        // Só considera swipe se passar do threshold e não for muito rápido (evita acionamento acidental)
        if (absDiff > threshold && velocity < 0.6) {
            if (diff > 0) {
                goToSlide((currentSlide + 1) % slideCount);
            } else {
                goToSlide(currentSlide === 0 ? slideCount - 1 : currentSlide - 1);
            }
            resetAutoPlay();
        }
    }
}

// Pause auto-play when page is not visible
function setupVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Combined scroll handler with requestAnimationFrame
function handleScroll() {
    if (!window.requestAnimationFrame) {
        handleVideoFade();
        handleCharactersFade();
        handleClassesTitleAnimation();
    } else {
        window.requestAnimationFrame(() => {
            handleVideoFade();
            handleCharactersFade();
            handleClassesTitleAnimation();
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createRain();
    createCharactersRain();
    setupNavigation();
    addButtonEffects();
    addAbilityHoverEffects();
    setupKeyboardNavigation();
    setupTouchNavigation();
    setupVisibilityChange();
    
    // Initialize first slide
    goToSlide(0, true);
    startAutoPlay();
    
    // Add scroll event listener with debounce
    window.addEventListener('scroll', debounce(handleScroll, 16));
    
    // Initial scroll check
    handleScroll();
});

// Parallax effect for anime history section
document.addEventListener('DOMContentLoaded', function() {
    const animeStories = document.querySelectorAll('.anime-story');
    
    animeStories.forEach(story => {
        const bg = story.querySelector('.parallax-bg');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const storyPosition = story.offsetTop;
            const storyHeight = story.offsetHeight;
            const progress = (scrollPosition - storyPosition) / storyHeight;
            
            if (progress >= 0 && progress <= 1) {
                const parallaxValue = progress * 100;
                bg.style.transform = `scale(1.1) translateY(${parallaxValue * 0.3}px)`;
            }
        });
    });
});