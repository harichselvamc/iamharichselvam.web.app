document.addEventListener('DOMContentLoaded', function() {
    // Progress bars animation
    var progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(function(bar) {
        var width = bar.style.width;
        bar.style.width = '0';
        setTimeout(function() {
            bar.style.width = width;
        }, 100);
    });

    // Filter buttons and certificates functionality
    var filterButtons = document.querySelectorAll('.button-28');
    var certificates = document.querySelectorAll('.certificate');

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'transparent';
                btn.style.color = '#000000';
            });

            this.classList.add('active');
            this.style.backgroundColor = '#000000';
            this.style.color = '#ffffff';

            var filter = this.getAttribute('data-filter');
            certificates.forEach(function(certificate) {
                if (filter === 'all' || certificate.getAttribute('data-category') === filter) {
                    certificate.style.display = 'block';
                } else {
                    certificate.style.display = 'none';
                }
            });
        });
    });

    // Dynamic role text change
    const roles = [
    "a Data Analyst",
    "a Python Developer",
    "an AI Engineer",
    "a Machine Learning Engineer",
    "a Cloud Developer (AWS)",
    "a Backend Engineer (FastAPI)"
    ];

    let roleIndex = 0;
    const roleElement = document.getElementById('role');

    function changeRole() {
        roleElement.textContent = roles[roleIndex];
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(changeRole, 2000);
    }

    changeRole();

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('header nav');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});
document.querySelectorAll('.award-img').forEach(img => {
    img.addEventListener('click', () => {
        document.getElementById('imgLightbox').style.display = "block";
        document.getElementById('lightboxImg').src = img.src;
    });
});

document.querySelector('.lightbox-close').onclick = function() {
    document.getElementById('imgLightbox').style.display = "none";
};