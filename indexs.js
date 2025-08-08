function createMagicParticles() {
  const container = document.createElement('div');
  container.className = 'particles-container';
  document.querySelector('.fate-anime-history').prepend(container);
  
  // Criar efeito de brilho
  const glow = document.createElement('div');
  glow.className = 'glow-effect';
  container.appendChild(glow);
  
  // Criar partículas
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'magic-particle';
    
    // Tamanho aleatório entre 2px e 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posição aleatória
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${size}px`;
    
    // Atraso e duração aleatórios
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${10 + Math.random() * 20}s`;
    
    // Opacidade aleatória
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    container.appendChild(particle);
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  createMagicParticles();
  
  // Efeito de digitação nos títulos
  const titles = document.querySelectorAll('.anime-synopsis h2');
  
  titles.forEach(title => {
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
  });
});
