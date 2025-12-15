document.addEventListener('DOMContentLoaded', () => {

    // --- Highlight Active Nav Link ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.substring(currentPath.lastIndexOf('/') + 1)) {
            link.classList.add('active');
        }
    });

    // --- Timeline Animation (Problem Page) ---
    const goodBar = document.querySelector('.good-bar');
    if (goodBar) {
        // Simple intersection observer to trigger animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate width to represent "5 Seconds" vs the full width
                    // Visually we want it to shrink to a tiny sliver to show speed
                    // But for the label to be readable we keep it small but visible
                    // Actually, the CSS set it to 1% initially. Let's expand it slightly or keep it small.
                    // The contrast is: Bad Bar = 100%, Good Bar = 2%
                    // We can just add a class or set width directly if needed. 
                    // Let's just ensure the transition happens.
                    goodBar.style.width = '2%'; // Ensure it stays small or animates to this
                }
            });
        });
        observer.observe(goodBar);
    }

    // --- Pilot Form Handling ---
    const form = document.getElementById('pilotForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = 'Submitting...';
            btn.style.opacity = '0.7';

            // Mock submission
            setTimeout(() => {
                btn.innerText = 'Application Received';
                btn.style.background = 'var(--india-green)'; // Using var even if not defined locally, fallback to color
                btn.style.backgroundColor = '#138808';
                form.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = ''; // Reset to CSS
                    btn.style.backgroundColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // --- Hero Pulse Effect (Index Page) ---
    // The CSS animation handles the red pulse, but we could add random data glitches here for "tech" feel
    // if requested. For now, CSS keeps it clean.

});
