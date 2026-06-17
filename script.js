// ===========================
// ADVANCED PORTFOLIO JAVASCRIPT
// ===========================

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ===========================
// HERO 3D SCENE WITH THREE.JS
// ===========================

class Hero3DScene {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        
        this.setup();
        this.createObjects();
        this.animate();
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setup() {
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setClearColor(0x1a1a1a, 1);
        this.camera.position.z = 5;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x3B82F6, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x10B981, 0.5);
        pointLight.position.set(-5, 5, 3);
        this.scene.add(pointLight);
    }

    createObjects() {
        // Animated Cube
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshPhongMaterial({
            color: 0x3B82F6,
            emissive: 0x3B82F6,
            emissiveIntensity: 0.3,
            shininess: 100,
        });
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.cube.position.set(-1.5, 0, 0);
        this.scene.add(this.cube);

        // Animated Sphere
        const sphereGeometry = new THREE.IcosahedronGeometry(0.7, 4);
        const sphereMaterial = new THREE.MeshPhongMaterial({
            color: 0x10B981,
            emissive: 0x10B981,
            emissiveIntensity: 0.2,
            shininess: 100,
        });
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position.set(1.5, 0.5, 0);
        this.scene.add(this.sphere);

        // Animated Torus
        const torusGeometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
        const torusMaterial = new THREE.MeshPhongMaterial({
            color: 0xF59E0B,
            emissive: 0xF59E0B,
            emissiveIntensity: 0.3,
            shininess: 100,
        });
        this.torus = new THREE.Mesh(torusGeometry, torusMaterial);
        this.torus.position.set(0, -1.2, -1);
        this.scene.add(this.torus);

        // Floating particles
        this.createParticles();
    }

    createParticles() {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x3B82F6,
            size: 0.1,
            sizeAttenuation: true,
            opacity: 0.6,
            transparent: true,
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Cube rotation
        this.cube.rotation.x += 0.005;
        this.cube.rotation.y += 0.007;
        gsap.to(this.cube.position, {
            y: Math.sin(Date.now() * 0.001) * 0.3,
            duration: 0,
        });

        // Sphere rotation
        this.sphere.rotation.y += 0.004;
        this.sphere.rotation.z += 0.003;
        gsap.to(this.sphere.position, {
            y: 0.5 + Math.sin(Date.now() * 0.0008) * 0.3,
            duration: 0,
        });

        // Torus rotation
        this.torus.rotation.x += 0.003;
        this.torus.rotation.y += 0.005;

        // Particles animation
        if (this.particles) {
            this.particles.rotation.x += 0.0002;
            this.particles.rotation.y += 0.0003;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}

// Initialize 3D scene when page loads
window.addEventListener('DOMContentLoaded', () => {
    new Hero3DScene();
});

// ===========================
// HERO TEXT ANIMATIONS
// ===========================

window.addEventListener('load', () => {
    // Animate hero letters
    gsap.utils.toArray('.letter').forEach((letter, index) => {
        gsap.to(letter, {
            delay: index * 0.05,
            duration: 0.8,
            opacity: 1,
            y: 0,
        });
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

// Animate project cards on scroll
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            once: true,
        },
        duration: 0.8,
        opacity: 1,
        y: 0,
        delay: index * 0.1,
        clearProps: 'all',
    });

    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
});

// Animate skill bars on scroll
gsap.utils.toArray('.skill-fill').forEach((fill) => {
    const width = fill.style.width;
    fill.style.width = '0';

    gsap.to(fill, {
        scrollTrigger: {
            trigger: fill.closest('.skill-category'),
            start: 'top 80%',
            once: true,
        },
        duration: 1.5,
        width: width,
    });
});

// Animate testimonial cards
gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            once: true,
        },
        duration: 0.8,
        opacity: 1,
        y: 0,
        delay: index * 0.15,
        clearProps: 'all',
    });

    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
});

// ===========================
// NAVIGATION FUNCTIONALITY
// ===========================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                duration: 2,
            });
        }
    });
});

// ===========================
// SECTION REVEAL ANIMATION
// ===========================

const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    gsap.to(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            once: true,
        },
        duration: 1,
        opacity: 1,
        y: 0,
    });

    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
});

// ===========================
// INTERACTIVE SKILL ITEMS
// ===========================

document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const skillName = this.getAttribute('data-skill');
        gsap.to(this.querySelector('.skill-fill'), {
            duration: 0.3,
            filter: 'brightness(1.3)',
        });
    });

    item.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('.skill-fill'), {
            duration: 0.3,
            filter: 'brightness(1)',
        });
    });
});

// ===========================
// PROJECT CARD PARALLAX
// ===========================

document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('.project-image img');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) * 0.1;
        const rotateY = (centerX - x) * 0.1;

        gsap.to(card, {
            duration: 0.5,
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.5,
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        });
    });
});

// ===========================
// CONTACT FORM
// ===========================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const button = contactForm.querySelector('.btn-primary');
        const originalText = button.textContent;

        button.textContent = 'Sending...';
        button.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Message Sent! ✓';
            button.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';

            setTimeout(() => {
                contactForm.reset();
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// ===========================
// PARALLAX BACKGROUND
// ===========================

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const elements = document.querySelectorAll('.float-elem');

    elements.forEach((elem, index) => {
        const speed = 0.5 + index * 0.1;
        elem.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ===========================
// RESPONSIVE MENU
// ===========================

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// ===========================
// SMOOTH PAGE TRANSITIONS
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    gsap.to(document.body, {
        duration: 0.8,
        opacity: 1,
    });
});

// ===========================
// CURSOR FOLLOWING EFFECT (Optional)
// ===========================

const cursor = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
};

document.addEventListener('mousemove', (e) => {
    cursor.targetX = e.clientX;
    cursor.targetY = e.clientY;
});

// Animate cursor position
function animateCursor() {
    cursor.x += (cursor.targetX - cursor.x) * 0.1;
    cursor.y += (cursor.targetY - cursor.y) * 0.1;
    requestAnimationFrame(animateCursor);
}

animateCursor();

// ===========================
// REVEAL ON SCROLL - ADDITIONAL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with reveal class
document.querySelectorAll('.project-card, .testimonial-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// ===========================
// THEME TOGGLE (Optional)
// ===========================

function initThemeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
        document.documentElement.style.colorScheme = 'dark';
    }
}

initThemeToggle();

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 150);
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Portfolio initialized with advanced animations and 3D effects!');