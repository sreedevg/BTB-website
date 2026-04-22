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

    // Initial Hero Animations
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(".reveal-text", 
        { y: 50, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.2 }
    )
    .fromTo(".reveal-fade",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 },
        "-=0.8"
    );

    // Scroll Animations for sections
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    scrollRevealElements.forEach((el, index) => {
        // Check if element has a delay class
        let delayVal = 0;
        if(el.classList.contains('delay-1')) delayVal = 0.15;
        if(el.classList.contains('delay-2')) delayVal = 0.3;
        if(el.classList.contains('delay-3')) delayVal = 0.45;

        gsap.fromTo(el,
            { y: 40, autoAlpha: 0 },
            {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                delay: delayVal,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Animation starts when top of element hits 85% of viewport
                    toggleActions: "play none none reverse" // Plays on scroll down, reverses on scroll up
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
