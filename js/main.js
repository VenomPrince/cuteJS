// Main JavaScript file for KawaiiScroll
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                preloader.style.display = 'none';
            }
        });
    });

    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            
            // Burger animation
            burger.classList.toggle('toggle');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: targetElement,
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Kawaii button effects
    const kawaiiButtons = document.querySelectorAll('.kawaii-button');
    kawaiiButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutElastic'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic'
            });
        });
        
        button.addEventListener('click', () => {
            anime({
                targets: button,
                scale: 0.95,
                duration: 100,
                easing: 'easeInOutQuad',
                direction: 'alternate'
            });
            
            // Create sparkle effect
            for (let i = 0; i < 5; i++) {
                createButtonSparkle(button);
            }
        });
    });

    // Initialize scroll animations
    initScrollAnimations();

    // Add background music toggle
    addMusicToggle();

    // Add sakura petal falling effect
    addSakuraEffect();
});

function initScrollAnimations() {
    // Initialize scroll-triggered animations
    const animateOnScroll = (elements, animation) => {
        elements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight * 0.75) {
                element.classList.add(animation);
            }
        });
    };

    // Check on initial load
    const fadeElements = document.querySelectorAll('[data-scroll]');
    animateOnScroll(fadeElements, 'is-visible');

    // Check on scroll
    window.addEventListener('scroll', () => {
        animateOnScroll(fadeElements, 'is-visible');
    });
}

function createButtonSparkle(button) {
    const sparkle = document.createElement('div');
    sparkle.className = 'button-sparkle';
    
    const buttonRect = button.getBoundingClientRect();
    const x = Math.random() * buttonRect.width;
    const y = Math.random() * buttonRect.height;
    
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    button.appendChild(sparkle);
    
    anime({
        targets: sparkle,
        translateX: () => anime.random(-10, 10),
        translateY: () => anime.random(-10, 10),
        scale: [0, 1.5],
        opacity: [1, 0],
        duration: 800,
        easing: 'easeOutExpo',
        complete: () => sparkle.remove()
    });
}

function addMusicToggle() {
    const music = new Audio('sounds/bg-music.mp3');
    music.loop = true;
    music.volume = 0.3;
    
    const musicToggle = document.createElement('div');
    musicToggle.className = 'music-toggle';
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    document.body.appendChild(musicToggle);
    
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            music.play();
            musicToggle.classList.add('active');
            anime({
                targets: musicToggle,
                rotate: 360,
                duration: 1000,
                easing: 'linear'
            });
        } else {
            music.pause();
            musicToggle.classList.remove('active');
        }
        
        // Play chime sound
        const chime = new Audio('sounds/chime.wav');
        chime.volume = 0.2;
        chime.play();
    });
}

function addSakuraEffect() {
    const sakuraContainer = document.createElement('div');
    sakuraContainer.className = 'sakura-container';
    document.body.appendChild(sakuraContainer);
    
    // Create sakura petals
    for (let i = 0; i < 15; i++) {
        createSakuraPetal(sakuraContainer);
    }
}

function createSakuraPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    
    // Random properties
    const size = Math.random() * 15 + 10;
    const startX = Math.random() * window.innerWidth;
    const animationDuration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${startX}px`;
    petal.style.opacity = Math.random() * 0.5 + 0.3;
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    container.appendChild(petal);
    
    // Animate petal falling
    anime({
        targets: petal,
        translateY: window.innerHeight + 100,
        translateX: () => anime.random(-100, 100),
        rotate: () => anime.random(-180, 180),
        duration: animationDuration * 1000,
        delay: delay * 1000,
        easing: 'linear',
        complete: () => {
            petal.remove();
            createSakuraPetal(container); // Create new petal
        }
    });
}