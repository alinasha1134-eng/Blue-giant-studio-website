/*
 * Blue Giant Studio - Premium Digital Marketing Agency Script
 * Contains page loaders, dark/light theme toggle, bubble generation, sticky navbar,
 * statistics counters, package pre-filling, email submission, page transitions,
 * click bubbles, and dynamic WhatsApp redirects.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. PRELOADER REMOVAL ---
    const preloader = document.querySelector('.loader-overlay');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 800); // Slight delay for visual satisfaction
        });
        if (document.readyState === 'complete') {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 800);
        }
    }

    // --- 2. DARK/LIGHT THEME TOGGLE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const savedTheme = localStorage.getItem('theme');
    
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    };

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(systemPrefersDark ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    function updateThemeIcon(theme) {
        const icons = document.querySelectorAll('.theme-toggle-btn i');
        icons.forEach(icon => {
            if (theme === 'dark') {
                icon.className = 'bi bi-sun-fill';
            } else {
                icon.className = 'bi bi-moon-stars-fill';
            }
        });
    }

    // --- 3. STICKY NAVBAR & ACTIVE NAV LINKS ---
    const navbar = document.querySelector('.custom-navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-custom');

    const handleScroll = () => {
        const scrollY = window.pageYOffset;

        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- 4. SCROLL PROGRESS BAR & BACK TO TOP BUTTON & STICKY CTA ---
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    const stickyCtaBar = document.getElementById('sticky-cta-bar');

    window.addEventListener('scroll', () => {
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScrollPercent = (window.pageYOffset / totalScrollHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = currentScrollPercent + '%';
        }

        if (backToTopBtn) {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        if (stickyCtaBar) {
            const heroHeight = document.querySelector('.hero-wrapper')?.offsetHeight || 600;
            const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - window.pageYOffset;
            
            if (window.pageYOffset > heroHeight && scrollBottom > 350) {
                stickyCtaBar.classList.add('visible');
            } else {
                stickyCtaBar.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 5. INTERACTIVE STATISTICS COUNTERS ---
    const counters = document.querySelectorAll('.stat-counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const speed = 200;
                const updateCount = () => {
                    const targetVal = parseInt(target.getAttribute('data-target'));
                    const currentVal = parseInt(target.innerText);
                    const increment = Math.ceil(targetVal / speed);

                    if (currentVal < targetVal) {
                        target.innerText = currentVal + increment > targetVal ? targetVal : currentVal + increment;
                        setTimeout(updateCount, 15);
                    } else {
                        target.innerText = targetVal;
                    }
                };
                updateCount();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- 6. DYNAMIC BUBBLE GENERATOR (BACKGROUND) ---
    const bubbleContainers = document.querySelectorAll('.bubble-container');
    bubbleContainers.forEach(container => {
        const createBubble = () => {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            const size = Math.random() * 20 + 8;
            const left = Math.random() * 100;
            const duration = Math.random() * 6 + 6;
            const delay = Math.random() * 4;

            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = left + '%';
            bubble.style.animationDuration = duration + 's';
            bubble.style.animationDelay = delay + 's';

            container.appendChild(bubble);

            setTimeout(() => {
                bubble.remove();
            }, (duration + delay) * 1000);
        };

        for (let i = 0; i < 8; i++) {
            createBubble();
        }
        setInterval(createBubble, 1800);
    });

    // --- 7. DYNAMIC CLICK BUBBLES INTERACTION ---
    document.addEventListener('click', (e) => {
        const tag = e.target.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'button' || e.target.closest('a') || e.target.closest('button')) {
            return;
        }

        const bubble = document.createElement('div');
        bubble.classList.add('click-bubble');

        const size = Math.random() * 25 + 15;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = e.clientX + 'px';
        bubble.style.top = e.clientY + 'px';

        document.body.appendChild(bubble);

        setTimeout(() => {
            bubble.remove();
        }, 1200);
    });

    // --- 8. DYNAMIC WHATSAPP REDIRECTS (GEN Z DYNAMIC CTA FUNCTION) ---
    window.triggerWhatsApp = function(event) {
        if (event) event.preventDefault();
        const phone = "919944470698";
        
        const bizInput = document.getElementById('business-name') || document.querySelector('[name="business-name"]') || document.querySelector('.business-name-input');
        const businessName = bizInput ? bizInput.value.trim() : "";
        
        let message = "";
        if (businessName) {
            message = `Hi Alin,\n\nI'm from ${businessName}.\n\nI'd like to know more about your digital marketing services.`;
        } else {
            message = `Hi Alin,\n\nI'd like to know more about your digital marketing services.\n\nPlease contact me.`;
        }
        
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // Attach trigger to every WhatsApp action link dynamically
    const bindWhatsAppActions = () => {
        const waElements = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"], .whatsapp-float, .whatsapp-btn, [data-action="whatsapp"]');
        waElements.forEach(el => {
            el.addEventListener('click', window.triggerWhatsApp);
        });
    };
    bindWhatsAppActions();

    // --- 9. URL QUERY PARAM PRE-FILLING FOR PACKAGE SUBMISSION ---
    const selectPackageInput = document.getElementById('selected-package');
    const priceDisplay = document.getElementById('package-price-display');
    const priceInput = document.getElementById('package-price');

    if (selectPackageInput) {
        const urlParams = new URLSearchParams(window.location.search);
        const urlPackage = urlParams.get('package');
        const urlPrice = urlParams.get('price');

        if (urlPackage) {
            selectPackageInput.value = decodeURIComponent(urlPackage);
        }
        if (urlPrice) {
            const formattedPrice = '₹' + parseInt(urlPrice).toLocaleString('en-IN');
            if (priceDisplay) priceDisplay.innerText = formattedPrice;
            if (priceInput) priceInput.value = urlPrice;
        }

        selectPackageInput.addEventListener('change', () => {
            const selectedOpt = selectPackageInput.value;
            let val = '0';
            if (selectedOpt.includes('Starter')) val = '9965';
            else if (selectedOpt.includes('Growth')) val = '14965';
            else if (selectedOpt.includes('Elite') || selectedOpt.includes('Blue Giant')) val = '19965';
            else if (selectedOpt.includes('Landing Page')) val = '4999';
            else if (selectedOpt.includes('Responsive Business Website')) val = '14965';

            if (val !== '0') {
                const formattedPrice = '₹' + parseInt(val).toLocaleString('en-IN');
                if (priceDisplay) priceDisplay.innerText = formattedPrice;
                if (priceInput) priceInput.value = val;
            } else {
                if (priceDisplay) priceDisplay.innerText = 'Custom Pricing';
                if (priceInput) priceInput.value = 'Custom';
            }
        });
    }

    // --- 10. LEAD GENERATION FORM HANDLER & SUCCESS ANIMATION ---
    const leadForm = document.getElementById('lead-generation-form');
    const formCard = document.getElementById('form-card-container');
    const successCard = document.getElementById('success-card-container');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!leadForm.checkValidity()) {
                e.stopPropagation();
                leadForm.classList.add('was-validated');
                return;
            }

            const submitBtn = leadForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

const data = {
    name: leadForm.querySelector('[name="name"]').value,
    company: leadForm.querySelector('[name="company"]').value,
    business_name: leadForm.querySelector('[name="business_name"]').value,
    business_niche: leadForm.querySelector('[name="business_niche"]').value,
    whatsapp: leadForm.querySelector('[name="whatsapp"]').value,
    package: leadForm.querySelector('[name="package"]').value,
    email: leadForm.querySelector('[name="email"]').value,
    message: leadForm.querySelector('[name="message"]').value
};

fetch("https://script.google.com/macros/s/AKfycbwkjVSANS9l3-eGoeJyxP0BlrrYh4P2dsZKdh0E61LMiXCH6x_VuiybfnEEWgS8IDg3/exec", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
}) 
    .then(() => {
                showSuccessState();
            })
            .catch(() => {
                showSuccessState(); // Fallback to showcase checkout success modal state
            });

            function showSuccessState() {
                if (formCard && successCard) {
                    formCard.classList.add('d-none');
                    successCard.classList.remove('d-none');
                    successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // --- 11. SMOOTH PAGE TRANSITIONS OVERLAY (WAVE TRANSITION) ---
    const setupPageTransitions = () => {
        const transitionOverlay = document.getElementById('page-transition-overlay');
        if (!transitionOverlay) return;

        // Start visible and slide out
        transitionOverlay.classList.add('active');
        setTimeout(() => {
            transitionOverlay.classList.add('exit');
            setTimeout(() => {
                transitionOverlay.classList.remove('active', 'exit');
            }, 700);
        }, 150);

        const localLinks = document.querySelectorAll('a[href$=".html"]:not([href^="http"]):not([target="_blank"])');
        localLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const destination = link.getAttribute('href');
                if (destination && destination !== '#' && !destination.includes('javascript:')) {
                    e.preventDefault();
                    transitionOverlay.classList.remove('exit');
                    transitionOverlay.classList.add('active');
                    setTimeout(() => {
                        window.location.href = destination;
                    }, 550);
                }
            });
        });
    };
    setupPageTransitions();

    // --- 12. DYNAMIC FLOATING SILHOUETTE SPINNER ---
    const spawnSilhouette = () => {
        const container = document.body;
        const silhouette = document.createElement('div');
        silhouette.classList.add('bg-whale-silhouette');
        
        // Inline whale tail silhouette SVG
        silhouette.innerHTML = `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="fill: var(--accent-blue);">
                <path d="M50,75 C50,55 35,40 15,35 C35,35 45,45 50,55 C55,45 65,35 85,35 C65,40 50,55 50,75 Z" />
            </svg>
        `;
        
        container.appendChild(silhouette);

        // Remove silhouette after swimming keyframe animation ends
        setTimeout(() => {
            silhouette.remove();
        }, 35000);
    };

    // Spawn silhouettes periodically
    setTimeout(spawnSilhouette, 5000);
    setInterval(spawnSilhouette, 45000);
});
