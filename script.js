// Initialize Lucide Icons
lucide.createIcons();



// --- Smooth Scrolling for Navigation --- //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});



// === ADVANCED UX FEATURES === //
document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Background Element Generation --- //
    const dataFlow = document.querySelector('.data-flow');
    const nodesContainer = document.querySelector('.nodes-container');

    if (dataFlow) {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = `${Math.random() * 100}%`;
            p.style.animationDelay = `${Math.random() * 8}s`;
            p.style.animationDuration = `${6 + Math.random() * 10}s`;
            dataFlow.appendChild(p);
        }
    }

    if (nodesContainer) {
        for (let i = 0; i < 15; i++) {
            const n = document.createElement('div');
            n.classList.add('node');
            n.style.left = `${Math.random() * 100}%`;
            n.style.top = `${Math.random() * 100}%`;
            n.style.animationDelay = `${Math.random() * 5}s`;
            nodesContainer.appendChild(n);
        }
    }

    // --- 1. Custom Cursor --- //
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // A slight delay on the outline for a fluid feel
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // --- 1.2 Magnetic Button Effect --- //
        const magneticElements = document.querySelectorAll('.btn, .social-icon, .glass-nav a');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = `translate(0, 0)`;
            });
        });
    }

    // --- 2. Advanced Scroll Animations --- //
    const animatedElements = document.querySelectorAll('.section-title, .glass-container, .skill-card, .project-card');
    
    // Add base hidden class
    animatedElements.forEach(el => el.classList.add('scroll-hidden'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-show');
            } else {
                // Remove class to re-animate when scrolling past again
                entry.target.classList.remove('scroll-show');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => observer.observe(el));

    // --- 3. Dynamic Typing Effect --- //
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const textArray = ["Aspiring Web Developer", "CS Student", "UI/UX Enthusiast", "Creative Problem Solver"];
        const typingDelay = 100;
        const erasingDelay = 40;
        const newTextDelay = 2000; // Delay between current and next text
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 500);
            }
        }
        
        // Start typing effect on load
        setTimeout(type, newTextDelay);
    }

    // --- 4. Advanced 3D Hover Tracking --- //
    const tiltElements = document.querySelectorAll('.effect-3d');
    
    tiltElements.forEach(el => {
        // Remove default static CSS hover transform to avoid conflict with JS
        el.style.transition = 'none';

        // Inject Glare wrapper
        const glareWrapper = document.createElement('div');
        glareWrapper.classList.add('glare-wrapper');
        const glare = document.createElement('div');
        glare.classList.add('glare');
        glareWrapper.appendChild(glare);
        el.appendChild(glareWrapper);

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation (-10 to +10 degrees)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Move glare
            glare.style.transform = `translate(${x - rect.width}px, ${y - rect.height}px)`;
            glare.style.opacity = '1';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            el.style.transition = 'transform 0.5s ease-out';
            glare.style.opacity = '0';
            
            // Reset transition for next enter
            setTimeout(() => { el.style.transition = 'none'; }, 500);
        });
    });

    // --- 5. Mobile Gyroscope 3D Effect --- //
    // Enable 3D tilt tracking for mobile devices using device orientation (gyroscope)
    if (window.DeviceOrientationEvent && window.matchMedia("(pointer: coarse)").matches) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.beta === null || e.gamma === null) return;
            
            // Assume user holds phone at around 40 degrees naturally
            let centeredBeta = e.beta - 40;
            
            // Clamp values so it doesn't get crazy when laid totally flat or upside down
            let beta = Math.max(-25, Math.min(25, centeredBeta));
            let gamma = Math.max(-25, Math.min(25, e.gamma)); 

            // Scale the rotation down slightly for a smooth, premium feel
            const rotateX = beta * -0.6;
            const rotateY = gamma * 0.6;

            tiltElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                // Performance safeguard: only tip cards currently visible on screen
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                   el.style.transition = 'transform 0.2s ease-out';
                   el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
                }
            });
        });
    }
});
