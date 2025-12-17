document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Dashboard Scenario Toggle ---
    const toggleBtn = document.getElementById('toggleScenario');
    const pointBad = document.getElementById('pointBad');
    const pointGood = document.getElementById('pointGood');
    const timeVal = document.getElementById('timeVal');
    const impactVal = document.getElementById('impactVal');

    let isTraditional = true;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (isTraditional) {
                // Switch to Chitraka (Good)
                pointBad.style.display = 'none';
                pointGood.style.display = 'block';

                timeVal.innerText = '5s';
                timeVal.style.color = 'var(--accent-safe)';

                impactVal.innerText = '1';
                impactVal.style.color = 'var(--accent-safe)';

                toggleBtn.innerText = 'View Traditional Scenario';
                isTraditional = false;
            } else {
                // Switch to Traditional (Bad)
                pointBad.style.display = 'block';
                pointGood.style.display = 'none';

                timeVal.innerText = '72h';
                timeVal.style.color = '#ef4444'; // Red

                impactVal.innerText = '37';
                impactVal.style.color = '#ef4444';

                toggleBtn.innerText = 'View Chitraka Scenario';
                isTraditional = true;
            }
        });
    }

    // --- Vertical Scroll Animation ---
    const nodes = document.querySelectorAll('.chain-node');
    const drawLine = document.getElementById('draw-line');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate line to this node's position roughly
                const index = entry.target.getAttribute('data-index');
                if (drawLine) {
                    const yPos = index * 160; // Approx px per node spacing
                    // drawLine.setAttribute('y2', yPos); // Needs more complex calc for precise SVG
                    // For simplicitly we rely on the CSS reveal mostly
                }
            }
        });
    }, observerOptions);

    nodes.forEach(node => {
        observer.observe(node);
    });

    // SVG Line Drawing Logic
    // We want the orange line to grow as we scroll down the container
    const chainSection = document.querySelector('.scrolly-chain');

    window.addEventListener('scroll', () => {
        if (!chainSection || !drawLine) return;

        const sectionTop = chainSection.offsetTop;
        const sectionHeight = chainSection.offsetHeight;
        const scrollY = window.scrollY;
        const screenHeight = window.innerHeight;

        // Calculate percentage scrolled within the section
        // Start drawing when section enters half viewport
        const startPoint = sectionTop - screenHeight / 2;
        const endPoint = sectionTop + sectionHeight - screenHeight;

        if (scrollY > startPoint) {
            let progress = (scrollY - startPoint) / (endPoint - startPoint);
            if (progress > 1) progress = 1;
            if (progress < 0) progress = 0;

            // Map progress to line Y2 coordinate
            const maxY = 800; // ViewBox height
            drawLine.setAttribute('y2', progress * maxY);
        }
    });

    // --- Join Pilot Form Handling ---
    const pilotForm = document.getElementById('pilotForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    if (pilotForm) {
        pilotForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // validation handled by required attributes mostly, but good to have safety
            const company = document.getElementById('companyName').value;
            const contact = document.getElementById('contactName').value;
            const email = document.getElementById('workEmail').value;
            const role = document.getElementById('supplyRole').value;
            const msg = document.getElementById('message').value;

            // Show Loading
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.spinner');

            btnText.style.display = 'none';
            spinner.style.display = 'block';
            submitBtn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                console.log('Pilot Application:', { company, contact, email, role, msg });

                // Hide Form & Show Success
                pilotForm.querySelectorAll('.form-group').forEach(el => el.style.display = 'none');
                submitBtn.style.display = 'none';
                document.querySelector('.trust-indicator').style.display = 'none';

                successMessage.style.display = 'block';

                // Scroll to message if needed
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            }, 1500);
        });
    }

});
