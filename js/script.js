// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTestimonialsSlider();
    initFAQAccordion();
    initSmoothScrolling();
    initScrollEffects();
    initGSAPAnimations();
    initPortfolioModals();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Testimonials slider
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    let currentTestimonial = 0;

    if (!testimonials.length) return;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

    // Auto-play testimonials
    setInterval(nextTestimonial, 5000);
}

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-image');
        if (parallax) {
            const speed = scrolled * 0.2;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Fade in animation on scroll
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

    // Observe elements for fade-in animation
    document.querySelectorAll('.service-item, .portfolio-item, .award-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// GSAP Animations
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP library not loaded');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero title animation
    gsap.fromTo('.hero-title', 
        {
            opacity: 0,
            y: 100,
            scale: 0.8
        }, 
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3
        }
    );

    // Hero subtitle animation
    gsap.fromTo('.hero-subtitle', 
        {
            opacity: 0,
            x: -50
        }, 
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.8
        }
    );

    // Hero image animation
    gsap.fromTo('.hero-image', 
        {
            opacity: 0,
            scale: 0.9,
            y: 30
        }, 
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 1
        }
    );

    // Social icons animation
    gsap.fromTo('.social-icon', 
        {
            opacity: 0,
            x: 50
        }, 
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 1.2,
            stagger: 0.1
        }
    );

    // Scrolling banner continuous animation
    gsap.to('.banner-content', {
        xPercent: -100,
        repeat: -1,
        duration: 30,
        ease: 'none'
    });

    // Portfolio banner animation (opposite direction)
    gsap.to('.portfolio-banner .banner-content', {
        xPercent: 100,
        repeat: -1,
        duration: 25,
        ease: 'none'
    });

    // Section titles animation on scroll
    gsap.utils.toArray('section h2').forEach((title) => {
        gsap.fromTo(title, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Capabilities grid animation
    gsap.fromTo('.capability-item', 
        {
            opacity: 0,
            y: 30,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.capabilities-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Services grid animation
    gsap.fromTo('.service-item', 
        {
            opacity: 0,
            y: 50,
            rotationY: 15
        },
        {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Portfolio items animation
    gsap.fromTo('.portfolio-item', 
        {
            opacity: 0,
            y: 60,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach((stat) => {
        const endValue = parseInt(stat.textContent);
        gsap.fromTo(stat, 
            { 
                innerText: 0 
            },
            {
                innerText: endValue,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                onUpdate: function() {
                    stat.textContent = Math.ceil(this.targets()[0].innerText) + '+';
                }
            }
        );
    });

    // Awards timeline animation
    gsap.fromTo('.award-item', 
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.awards-timeline',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Testimonials fade animation
    gsap.fromTo('.testimonial-item.active', 
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }
    );

    // FAQ items animation
    gsap.fromTo('.faq-item', 
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.faq-list',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Contact section animation
    gsap.fromTo('.contact h2, .contact p, .contact-btn', 
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mobile menu styles (add to CSS if not present)
const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 80px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 50px;
        transition: left 0.3s ease;
        z-index: 999;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu li {
        margin: 20px 0;
    }
    
    .nav-menu li a {
        font-size: 1.2rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
`;

// Add mobile menu styles if not present
if (!document.querySelector('#mobile-menu-styles')) {
    const style = document.createElement('style');
    style.id = 'mobile-menu-styles';
    style.textContent = mobileMenuStyles;
    document.head.appendChild(style);
}

// Performance optimization
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Portfolio Modal functionality
function initPortfolioModals() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    const portfolioButtons = document.querySelectorAll('.portfolio-tag-btn');

    // Modal content data
    const modalContent = {
        'nextvion-plan': {
            title: 'NEXTVION 기획서 / 개인 프로젝트',
            content: `
                <h2>NEXTVION 기획서 / 개인 프로젝트</h2>
                <img src="images/vion_p1.png" alt="NEXTVION 기획서" style="width:100%; height:auto;" />
                <div class="modal-separator"></div>
                <p>제작기간 : 4주</p>
                <p>기술스택 : Figma, Illustrator, Photoshop, HTML, CSS, JavaScript, Github</p>
            `
        },
        'mn-team': {
            title: '멍냥상회 / 팀 프로젝트',
            content: `
                <h2>멍냥상회 / 팀 프로젝트</h2>
                <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/slides/5aW6VWNa80SHdNHufutwTu/%ED%8C%80-%EB%AC%B4%ED%95%9C%EB%8F%84%EC%A0%84-%ED%94%84%EB%A0%88%EC%A0%A0%ED%85%8C%EC%9D%B4%EC%85%98--%EB%B3%B5%EC%82%AC-?node-id=38-771&embed-host=share" allowfullscreen></iframe>
                <div class="modal-separator"></div>
                <p>제작기간 : 4주</p>
                <p>기여도 : 15% </p>
                <p>역할 : 팀원들이 취합한 로고 디자인 제작 및 UI/UX 디자인</p>
                <p>기술스택 : Figma, Illustrator, Photoshop, After Effects, Premiere Pro, Canva, Capcut</p>
            `
        },
        'mn-team1': {
            title: '멍냥상회 구현 / 팀 프로젝트',
            content: `
                <h2>멍냥상회 피그마 구현</h2>
                <div class="media-frame">
                    <iframe style="border: 0; width:100%; height:450px;" src="https://embed.figma.com/proto/zoeFkosJz3FdOtKf57VzKW/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85-%EC%A0%9C%EC%9E%91?page-id=135%3A8600&node-id=135-9203&viewport=-76%2C123%2C0.35&scaling=scale-down&content-scaling=fixed&starting-point-node-id=135%3A9203&embed-host=share" allowfullscreen></iframe>
                </div>

                <div class="modal-separator"></div>

                <h2>멍냥상회 AI를 이용한 영상</h2>
                <div class="media-frame">
                    <iframe src="https://drive.google.com/file/d/1RFmO6BCeokcfsDyiRBYQ0PYRFxUPBuR2/preview" style="border:0; width:100%; height:450px;" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            `
        },
        'aivory-ux': {
            title: '아이보리 UX/UI Design',
            content: `
                <h2>아이보리 기획서 / 개인 프로젝트</h2>
                <img src="images/aivory_p2.png" alt="아이보리 기획서" style="width:100%; height:auto;" />
                <div class="modal-separator"></div>
                <p>개인 프로젝트</p>
                <p>제작기간 : 1주</p>
                <p>기술스택 : Figma, Illustrator, Photoshop</p>
            `
        },
        'aivory-design': {
            title: '아이보리 피그마 구현',
            content: `
                <h2>아이보리 피그마 구현</h2>
                <div class="media-frame">
                    <iframe style="border: 0; width:100%; height:950px;" src="https://embed.figma.com/proto/59YPP7a7K5T0I7X1KBx1px/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B82--%EC%95%84%EC%9D%B4%EB%B3%B4%EB%A6%AC-?page-id=0%3A1&node-id=1-1094&viewport=-30%2C1%2C0.3&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A1071&embed-host=share" allowfullscreen></iframe>
                </div>
            `
        },
        'since-ux': {
            title: 'SINCE EIGHTEEN UX/UI Design',
            content: `
                <h2>SINCE EIGHTEEN 기획서</h2>
                <img src="images/since_p1.png" alt="since 기획서" style="width:100%; height:auto;" />
                <div class="modal-separator"></div>
                <p>개인 프로젝트</p>
                <p>제작기간 : 2주</p>
                <p>기술스택 : Figma, Illustrator, Photoshop, After Effects, Premiere Pro</p>
            `
        },
        'since-design': {
            title: 'SINCE EIGHTEEN Design System',
            content: `
                <h2>SINCE EIGHTEEN 피그마 구현</h2>
                <div class="media-frame">
                    <iframe style="border: 0; width:100%; height:950px;" src="https://embed.figma.com/proto/KsstKbzPZEtUfoLdWQQQMM/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B83_Since-18?page-id=0%3A1&node-id=1-28&viewport=146%2C-495%2C0.44&scaling=min-zoom&content-scaling=fixed&embed-host=share" allowfullscreen></iframe>
                </div>
                <p>확대해서 확인해보세요.</p>
                <p>재생버튼을 누르면 동영상이 재생됩니다.</p>
            `
        },
        'morgo-ux': {
            title: '모르고 UX/UI Design',
            content: `
                <img src="images/morgo_p1.png" alt="모르고 기획서" style="width:100%; height:auto;" />
                    <div class="modal-separator"></div>
                    <p>개인 프로젝트</p>
                    <p>제작기간 : 1주</p>
                    <p>기술스택 : PPT참고</p>
                `

        },
        'aivorypersonal-ux': {
            title: 'aivory personal',
            content: `
                <img src="images/aivory_p3.png" alt="아이보리 기획서" style="width:100%; height:auto;" />
                <div class="modal-separator"></div>
                <p>개인 프로젝트</p>
                <p>제작기간 : 1주</p>
                <p>기술스택 : PPT참고</p>        
            `
        }
        
    };

    // Open modal
    portfolioButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            const content = modalContent[modalId];
            
            if (content) {
                modalBody.innerHTML = content.content;
                modalOverlay.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        modalOverlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
            closeModal();
        }
    });
}

