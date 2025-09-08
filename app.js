// Nexus Creative - Advanced Interactive JavaScript
class NexusCreative {
    constructor() {
        this.currentTheme = 'light';
        this.isLoading = true;
        this.portfolioFilter = 'all';
        this.currentTestimonial = 0;
        this.scrollPosition = 0;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.initializeLoading();
        this.setupEventListeners();
        this.initCustomCursor();
        this.initNavigation();
        this.initHeroCanvas();
        this.initThemeToggle();
        this.initScrollEffects();
        this.initPortfolioFilters();
        this.initTestimonials();
        this.initContactForm();
        this.initBackToTop();
        this.initAnimations();
        this.initInteractiveEffects();
        this.initSmoothScrolling();
    }

    // Loading Screen Animation
    initializeLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = document.querySelector('.progress-bar');
        const percentage = document.querySelector('.loading-percentage');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            percentage.textContent = `${Math.floor(progress)}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    document.body.style.overflow = 'visible';
                    this.isLoading = false;
                    this.startHeroAnimations();
                    this.initCounterAnimation();
                }, 500);
            }
        }, 100);
    }

    // Custom Cursor
    initCustomCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;
        
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (cursorDot) {
                cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
        });
        
        const animateOutline = () => {
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            
            if (cursorOutline) {
                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            }
            requestAnimationFrame(animateOutline);
        };
        animateOutline();
        
        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .team-member');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursorOutline) cursorOutline.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                if (cursorOutline) cursorOutline.classList.remove('active');
            });
        });
    }

    // Navigation
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        const progressBar = document.querySelector('.nav-progress-bar');
        
        if (!navbar || !hamburger || !navMenu) return;
        
        // Mobile menu toggle
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Scroll effects
        let lastScrollTop = 0;
        window.addEventListener('scroll', this.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / scrollHeight;
            
            // Progress bar
            if (progressBar) {
                progressBar.style.transform = `scaleX(${scrollPercent})`;
            }
            
            // Navbar background
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            this.updateActiveNavLink();
        }, 16));
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        // Handle View Our Work button
        const viewWorkBtn = document.getElementById('viewWorkBtn');
        if (viewWorkBtn) {
            viewWorkBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) {
                    portfolioSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }

        // Handle Start Project button
        const startProjectBtn = document.getElementById('startProjectBtn');
        if (startProjectBtn) {
            startProjectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }

        // Handle CTA button in nav
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    // Hero Canvas Animation
    initHeroCanvas() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -10;
                this.speed = Math.random() * 2 + 1;
                this.size = Math.random() * 3 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = this.getRandomColor();
            }
            
            getRandomColor() {
                const colors = ['#32808D', '#32B8C5', '#2DA6B2'];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.y += this.speed;
                this.x += Math.sin(this.y * 0.01) * 0.5;
                
                if (this.y > canvas.height + 10) {
                    this.reset();
                }
            }
            
            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            animationId = requestAnimationFrame(animate);
        };
        
        initParticles();
        animate();
        
        window.addEventListener('resize', () => {
            cancelAnimationFrame(animationId);
            resizeCanvas();
            initParticles();
            animate();
        });
    }

    // Theme Toggle
    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        // Check for saved theme or system preference
        const savedTheme = localStorage.getItem('nexus-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        this.setTheme(initialTheme);
        
        themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(this.currentTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('nexus-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nexus-theme', theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }

        // Update theme toggle button appearance
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
        }
    }

    // Counter Animation
    initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + (target > 99 ? '+' : '');
            }, 40);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counter.textContent = '0';
            observer.observe(counter);
        });
    }

    // Scroll Effects
    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements with AOS attributes
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(60px)';
            element.style.transition = `all 0.8s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // Portfolio Filters
    initPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter items with animation
                portfolioItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                });
            });
        });
        
        // Portfolio item hover effects
        portfolioItems.forEach(item => {
            const btn = item.querySelector('.portfolio-btn');
            
            btn?.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Project details coming soon!');
            });
        });
    }

    // Testimonials Carousel
    initTestimonials() {
        const track = document.querySelector('.testimonial-track');
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.pagination-dot');
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');
        
        if (!track || !slides.length) return;
        
        let currentSlide = 0;
        let autoPlayInterval;
        
        const updateCarousel = (index) => {
            // Update slides
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // Move track
            track.style.transform = `translateX(-${index * 100}%)`;
            this.currentTestimonial = index;
        };
        
        const nextSlide = () => {
            const next = (this.currentTestimonial + 1) % slides.length;
            updateCarousel(next);
        };
        
        const prevSlide = () => {
            const prev = this.currentTestimonial === 0 ? slides.length - 1 : this.currentTestimonial - 1;
            updateCarousel(prev);
        };
        
        // Button controls
        nextBtn?.addEventListener('click', () => {
            nextSlide();
            this.restartAutoPlay();
        });
        
        prevBtn?.addEventListener('click', () => {
            prevSlide();
            this.restartAutoPlay();
        });
        
        // Dot controls
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateCarousel(index);
                this.restartAutoPlay();
            });
        });
        
        // Auto play
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        };
        
        this.restartAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };
        
        startAutoPlay();
        
        // Pause on hover
        const carousel = document.querySelector('.testimonials-carousel');
        carousel?.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carousel?.addEventListener('mouseleave', startAutoPlay);
        
        // Touch/swipe support
        this.initTouchSupport(track, slides.length, updateCarousel);
    }

    // Touch Support for Testimonials
    initTouchSupport(element, totalSlides, updateCallback) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        element.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    const next = (this.currentTestimonial + 1) % totalSlides;
                    updateCallback(next);
                } else {
                    // Swipe right - previous slide
                    const prev = this.currentTestimonial === 0 ? totalSlides - 1 : this.currentTestimonial - 1;
                    updateCallback(prev);
                }
                this.restartAutoPlay();
            }
            
            isDragging = false;
        });
    }

    // Contact Form
    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const formInputs = form.querySelectorAll('.form-input');
        const formStatus = document.getElementById('formStatus');
        
        // Real-time validation
        formInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
        
        // Enhanced form interactions
        formInputs.forEach(input => {
            const label = form.querySelector(`label[for="${input.id}"]`);
            
            input.addEventListener('focus', () => {
                if (label) {
                    label.style.color = 'var(--color-primary)';
                    label.style.transform = 'translateY(-2px)';
                }
            });
            
            input.addEventListener('blur', () => {
                if (label && !input.value) {
                    label.style.color = '';
                    label.style.transform = '';
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous errors
        this.clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required.`;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = 'var(--color-error)';
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.opacity = '1';
        }
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.opacity = '0';
        }
    }

    getFieldLabel(fieldName) {
        const labels = {
            name: 'Full Name',
            email: 'Email Address',
            message: 'Project Details'
        };
        return labels[fieldName] || fieldName;
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const formStatus = document.getElementById('formStatus');
        const submitButton = form.querySelector('.form-submit');
        
        // Validate all fields
        const formInputs = form.querySelectorAll('.form-input[required]');
        let isFormValid = true;
        
        formInputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showFormStatus('Please correct the errors above.', 'error');
            return;
        }
        
        // Show loading state
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Sending...</span>';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            this.showFormStatus('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            this.showToast('Message sent successfully!');
            
        } catch (error) {
            // Error
            this.showFormStatus('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    showFormStatus(message, type) {
        const formStatus = document.getElementById('formStatus');
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }

    // Back to Top Button
    initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;
        
        window.addEventListener('scroll', this.throttle(() => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, 100));
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Toast Notifications
    showToast(message, duration = 3000) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        const toastMessage = toast.querySelector('.toast-message');
        
        if (toastMessage) {
            toastMessage.textContent = message;
        }
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    // Animations
    initAnimations() {
        // Initialize any additional animations here
        this.initScrollReveal();
    }

    initScrollReveal() {
        const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .testimonial-slide');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            revealObserver.observe(element);
        });
    }

    // Interactive Effects
    initInteractiveEffects() {
        this.initButtonRippleEffect();
        this.initParallaxEffect();
        this.initServiceCardEffects();
        this.initTeamMemberEffects();
    }

    initButtonRippleEffect() {
        const buttons = document.querySelectorAll('.btn, .cta-button, .portfolio-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.height, rect.width);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
        
        // Add ripple animation CSS if not exists
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(3);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero-gradient, .hero-canvas');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        }, 16));
    }

    initServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const features = card.querySelectorAll('.service-features li');
            
            card.addEventListener('mouseenter', () => {
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.transform = 'translateX(8px)';
                        feature.style.color = 'var(--color-text)';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                features.forEach(feature => {
                    feature.style.transform = 'translateX(0)';
                    feature.style.color = 'var(--color-text-secondary)';
                });
            });
            
            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    initTeamMemberEffects() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            const socialLinks = member.querySelectorAll('.social-link');
            
            member.addEventListener('mouseenter', () => {
                socialLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.transform = 'scale(1.2) rotate(5deg)';
                    }, index * 100);
                });
            });
            
            member.addEventListener('mouseleave', () => {
                socialLinks.forEach(link => {
                    link.style.transform = 'scale(1) rotate(0deg)';
                });
            });
        });
    }

    // Hero Animations
    startHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const titleWords = heroTitle.querySelectorAll('.title-word');
        
        titleWords.forEach((word, index) => {
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu if open
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('navMenu');
                
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Accessibility improvements
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('.nav-link, .btn, button, a')) {
                e.target.style.outline = 'var(--focus-outline)';
                e.target.style.outlineOffset = '2px';
            }
        });
        
        document.addEventListener('focusout', (e) => {
            if (e.target.matches('.nav-link, .btn, button, a')) {
                e.target.style.outline = '';
                e.target.style.outlineOffset = '';
            }
        });
    }

    // Utility Functions
    throttle(func, wait) {
        let time = Date.now();
        return function(...args) {
            if ((time + wait - Date.now()) < 0) {
                func.apply(this, args);
                time = Date.now();
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Animation utilities
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    // Performance monitoring
    initPerformanceMonitoring() {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // Lazy load non-critical features
                this.initLazyLoading();
            });
        }
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const nexusCreative = new NexusCreative();
    
    // Global error handling
    window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
    });
    
    // Preload critical resources
    const criticalResources = [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
    ];
    
    criticalResources.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NexusCreative;
}