document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.custom-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animations (Only for the hero section)
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo("#home .hero-title", 
        { y: 50, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.2 }
    )
    .fromTo("#home .hero-subtitle, #home .btn-premium",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 },
        "-=0.8"
    );

    // Premium Scroll Animations for all other sections
    gsap.utils.toArray('section').forEach(section => {
        // Skip hero since it's animated on load
        if(section.id === 'home' || section.classList.contains('hero-section')) return;

        // Select major blocks to animate within the section
        const elementsToAnimate = section.querySelectorAll('.col-lg-8, .col-lg-9, .col-lg-10, .col-lg-12, .col-lg-5, .col-lg-6, .col-md-6, .col-md-4, .col-md-3, .col-12 > a, .col-12 > img, footer');
        
        if(elementsToAnimate.length === 0) return;

        gsap.fromTo(elementsToAnimate,
            { y: 50, autoAlpha: 0 },
            {
                y: 0,
                autoAlpha: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // Triggers when the top of the section is 80% down the viewport
                    toggleActions: "play none none none" // Plays once, doesn't reverse
                }
            }
        );
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Adjust scroll position for fixed header (scrolled height is ~100px now)
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
});
