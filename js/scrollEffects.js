// Scroll-triggered animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Set up parallax effects
    setupParallax();
    
    // Animate sections on scroll
    animateSections();
    
    // Add cute interactive elements
    addInteractiveElements();
});

function setupParallax() {
    // Parallax for background elements
    gsap.to(".layer-1", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
    
    gsap.to(".layer-2", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
    
    // 3D tilt effect on scroll
    gsap.to(".scroll-container", {
        rotationX: -5,
        rotationY: 5,
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "+=1000",
            scrub: true
        }
    });
}

function animateSections() {
    // Animate each section with different effects
    gsap.utils.toArray("section").forEach(section => {
        const heading = section.querySelector("h2");
        const content = section.querySelector(".section-content");
        
        if (heading) {
            gsap.from(heading, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: heading,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
        
        if (content) {
            gsap.from(content, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 0.3,
                scrollTrigger: {
                    trigger: content,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
        
        // Special effects for specific sections
        if (section.id === "characters") {
            animateCharacterCards();
        }
    });
}

function animateCharacterCards() {
    const cards = gsap.utils.toArray(".character-card");
    
    cards.forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
        
        // Hover effect
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

function addInteractiveElements() {
    // Add floating hearts when clicking
    document.addEventListener("click", (e) => {
        createFloatingHeart(e.clientX, e.clientY);
    });
    
    // Cute cursor effect
    const cursor = document.createElement("div");
    cursor.className = "kawaii-cursor";
    document.body.appendChild(cursor);
    
    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    // Make cursor interactive with clickable elements
    const interactiveElements = document.querySelectorAll("a, button, .character-card");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: "rgba(255, 159, 243, 0.5)",
                duration: 0.2
            });
        });
        
        el.addEventListener("mouseleave", () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: "rgba(255, 159, 243, 0.2)",
                duration: 0.2
            });
        });
    });
}

function createFloatingHeart(x, y) {
    const heart = document.createElement("div");
    heart.className = "floating-click-heart";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    
    anime({
        targets: heart,
        translateY: -100,
        opacity: 0,
        scale: [0.5, 1.2],
        duration: 1000,
        easing: "easeOutExpo",
        complete: () => heart.remove()
    });
}