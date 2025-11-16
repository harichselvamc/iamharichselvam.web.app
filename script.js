// script.js

document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       0. DARK/LIGHT THEME SETUP (Auto + Manual Toggle)
    ========================================================= */

    const themeToggleBtn = document.createElement("button");
    themeToggleBtn.id = "themeToggle";
    themeToggleBtn.style.border = "none";
    themeToggleBtn.style.background = "transparent";
    themeToggleBtn.style.cursor = "pointer";
    themeToggleBtn.style.fontSize = "22px";
    themeToggleBtn.style.marginLeft = "10px";
    themeToggleBtn.title = "Toggle Theme";

    document.querySelector("header").appendChild(themeToggleBtn);

    // Detect user system preference
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem("theme");

    // Apply theme
    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        themeToggleBtn.innerHTML = theme === "dark" ? "☀️" : "🌙";
    }

    // Initialize theme
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(systemPrefersDark ? "dark" : "light");
    }

    // Toggle on click
    themeToggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
    });

    /* =========================================================
       1. PROGRESS BARS ANIMATION
    ========================================================= */
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((bar) => {
        const finalWidth = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
            bar.style.width = finalWidth;
        }, 100);
    });

    /* =========================================================
       2. CERTIFICATION FILTER BUTTONS
    ========================================================= */
    const filterButtons = document.querySelectorAll(".button-28");
    const certificates = document.querySelectorAll(".certificate");

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
                btn.style.backgroundColor = "transparent";
                btn.style.color = "var(--text-color)";
            });

            this.classList.add("active");
            this.style.backgroundColor = "var(--text-color)";
            this.style.color = "var(--bg-color)";

            const filter = this.getAttribute("data-filter");
            certificates.forEach((certificate) => {
                certificate.style.display =
                    filter === "all" || certificate.getAttribute("data-category") === filter
                        ? "block"
                        : "none";
            });
        });
    });

    /* =========================================================
       3. DYNAMIC ROLE TEXT (GSAP fade)
    ========================================================= */
    const roles = [
        "a Data Analyst",
        "a Python Developer",
        "an AI Engineer",
        "a Machine Learning Engineer",
        "a Cloud Developer (AWS)",
        "a Backend Engineer (FastAPI)"
    ];

    let roleIndex = 0;
    const roleElement = document.getElementById("role");

    function changeRole() {
        if (!roleElement) return;

        const newText = roles[roleIndex];

        if (typeof gsap !== "undefined") {
            gsap.fromTo(
                roleElement,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    onStart: () => {
                        roleElement.textContent = newText;
                    }
                }
            );
        }

        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(changeRole, 2000);
    }
    changeRole();

    /* =========================================================
       4. HAMBURGER MENU
    ========================================================= */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("header nav");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("open");
        });
    }

    /* =========================================================
       5. LIGHTBOX FOR AWARD IMAGE
    ========================================================= */
    const awardImages = document.querySelectorAll(".award-img");
    const lightbox = document.getElementById("imgLightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    awardImages.forEach((img) => {
        img.addEventListener("click", () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
        });
    });

    document.querySelector(".lightbox-close").onclick = () => {
        lightbox.style.display = "none";
    };

    /* =========================================================
       6. GSAP ANIMATIONS
    ========================================================= */
    if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // HERO
        gsap.from(".hero img", {
            duration: 1,
            x: -60,
            opacity: 0,
            ease: "power3.out"
        });

        gsap.from(".hero-text h1", {
            duration: 0.8,
            y: 40,
            opacity: 0,
            delay: 0.15,
            ease: "power3.out"
        });

        gsap.from(".hero-text .role", {
            duration: 0.8,
            y: 30,
            opacity: 0,
            delay: 0.35
        });

        gsap.from(".hero-text p:not(.role)", {
            duration: 0.9,
            y: 30,
            opacity: 0,
            delay: 0.55
        });

        // SCROLL EFFECTS
        const animateOnScroll = (selector, options = {}) => {
            document.querySelectorAll(selector).forEach((el, index) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    },
                    duration: options.duration || 0.8,
                    y: options.y ?? 40,
                    x: options.x ?? 0,
                    opacity: 0,
                    scale: options.scale ?? 1,
                    ease: "power3.out",
                    delay: options.stagger ? index * options.stagger : 0
                });
            });
        };

        animateOnScroll(".section h2", { y: 20, scale: 0.95 });
        animateOnScroll("#experience .skill", { stagger: 0.1 });
        animateOnScroll("#about .service-card", { x: -40, stagger: 0.12 });
        animateOnScroll("#works .project", { x: 40, stagger: 0.12 });
        animateOnScroll(".education-card", { y: 35, stagger: 0.1 });
        animateOnScroll(".research-card", { scale: 0.9 });
        animateOnScroll(".award-card");
        animateOnScroll(".certifications .certificate", { scale: 0.9, stagger: 0.04 });
        animateOnScroll(".contact-card", { y: 30, stagger: 0.05 });

        gsap.to(".hero img", {
            y: -8,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
});
