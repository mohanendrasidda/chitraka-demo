document.addEventListener('DOMContentLoaded', () => {

    // --- Stats Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower inc for float handling if needed (though logic uses ceil)
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger animation when stats section is in view
    let animated = false;
    const statsSection = document.querySelector('.stats-section');

    const onScroll = () => {
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos && !animated) {
            animateCounters();
            animated = true;
        }
    };

    window.addEventListener('scroll', onScroll);


    // --- Simulated Live Dashboard Updates ---

    // Randomly fluctuate the temperature and humidity bars slightly
    const bars = document.querySelectorAll('.bar');

    setInterval(() => {
        bars.forEach(bar => {
            // Get current width logic would be here, but for simple effect we stir it
            // This is just a visual flicker effect
            const originalWidth = bar.style.width;
            // We won't change width deeply to avoid layout breaks, 
            // but we can toggle opacity or brightness slightly
            bar.style.opacity = (Math.random() * 0.5) + 0.5;
        });
    }, 2000);

    // Pulse effect for the "Live" status dot is handled in CSS, 
    // but we can randomly "receive" a new doc

    // --- Glass Card Tilt Effect (Optional Polish) ---
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Subtle lighting effect
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), rgba(255,255,255,0.05) 40%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = ''; // reset
        });
    });

});
