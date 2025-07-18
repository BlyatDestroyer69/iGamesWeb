// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Dashboard Preview Screens and Navigation
    const screens = document.querySelectorAll('.screen');
    const tabButtons = document.querySelectorAll('.tab-button');
    const prevButton = document.querySelector('.arrow-button.prev');
    const nextButton = document.querySelector('.arrow-button.next');
    let currentScreenIndex = 0;

    function showScreen(index) {
        screens.forEach((screen, i) => {
            screen.classList.toggle('active', i === index);
        });
        
        tabButtons.forEach((button, i) => {
            button.classList.toggle('active', i === index);
        });
        
        currentScreenIndex = index;
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showScreen(index);
        });
    });

    prevButton.addEventListener('click', () => {
        currentScreenIndex = (currentScreenIndex - 1 + screens.length) % screens.length;
        showScreen(currentScreenIndex);
    });

    nextButton.addEventListener('click', () => {
        currentScreenIndex = (currentScreenIndex + 1) % screens.length;
        showScreen(currentScreenIndex);
    });

    // Auto-rotate dashboard preview screens
    let slideInterval = setInterval(() => {
        currentScreenIndex = (currentScreenIndex + 1) % screens.length;
        showScreen(currentScreenIndex);
    }, 5000);

    // Pause auto-rotation when hovering
    const dashboardPreview = document.querySelector('.dashboard-preview');
    dashboardPreview.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    dashboardPreview.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentScreenIndex = (currentScreenIndex + 1) % screens.length;
            showScreen(currentScreenIndex);
        }, 5000);
    });

    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.demo-section');
    
    function animateStats() {
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const suffix = stat.textContent.includes('M') ? 'M' : '';
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        stat.textContent = Math.floor(count) + suffix;
                        setTimeout(updateCount, 16);
                    } else {
                        stat.textContent = target + suffix;
                    }
                };
                
                updateCount();
            });
            
            // Remove event listener after animation
            window.removeEventListener('scroll', animateStats);
        }
    }
    
    window.addEventListener('scroll', animateStats);

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 7000);

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Video Modal
    const playButton = document.getElementById('play-video');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const demoVideo = document.getElementById('demoVideo');
    
    playButton.addEventListener('click', () => {
        videoModal.classList.add('active');
        demoVideo.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    });
    
    closeModal.addEventListener('click', () => {
        videoModal.classList.remove('active');
        demoVideo.src = '';
    });
    
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            demoVideo.src = '';
        }
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const organization = document.getElementById('organization').value;
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, organization, interest, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});