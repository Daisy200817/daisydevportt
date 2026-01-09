// Modal functionality for Resume
const modal = document.getElementById('resume-modal');
const viewResumeBtn = document.getElementById('view-resume-btn');
const closeModal = document.getElementById('close-modal');
const resumeImg = document.getElementById('resume-img');
const downloadBtn = document.getElementById('download-btn');
const printBtn = document.getElementById('print-btn');

// Contact Me button functionality
const contactMeBtn = document.getElementById('contact-me-btn');
contactMeBtn.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

viewResumeBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});



// Download functionality
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = resumeImg.src;
    link.download = 'Daisy_Espinosa_Resume.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Print functionality
printBtn.addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Daisy Espinosa - Resume</title>
                <style>
                    body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: white; }
                    img { max-width: 100%; max-height: 100vh; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                    @media print {
                        body { margin: 0; }
                        img { max-width: 100%; height: auto; box-shadow: none; }
                    }
                </style>
            </head>
            <body>
                <img src="${resumeImg.src}" alt="Resume" onload="window.print(); window.close();">
            </body>
        </html>
    `);
    printWindow.document.close();
});

// Tab switching in Professional Background
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding content
        const target = btn.getAttribute('data-tab');
        document.getElementById(target).classList.add('active');
    });
});

// Animate progress bars on load
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach((bar, index) => {
        const width = bar.textContent.trim();
        setTimeout(() => {
            bar.style.width = width;
        }, 1000 + index * 300);
    });

    // Fade in images
    const images = document.querySelectorAll('img:not(.floating-flower)');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });

    // Handle modal resume image loading
    const resumeImage = document.querySelector('.resume-image');
    if (resumeImage) {
        if (resumeImage.complete) {
            resumeImage.style.opacity = '1';
        } else {
            resumeImage.addEventListener('load', () => {
                resumeImage.style.opacity = '1';
            });
        }
    }

    // Floating flowers animation
    const flowers = document.querySelectorAll('.floating-flower');
    flowers.forEach((flower) => {
        const section = flower.closest('section');
        const sectionHeight = section ? section.clientHeight : window.innerHeight;
        let position = Math.random() * sectionHeight; // random initial positions
        const speed = 6.0 + Math.random() * 3.0; // random speed between 6.0 and 9.0

        function animate() {
            position += speed;
            if (position > sectionHeight) {
                position = 0;
            }
            flower.style.transform = `translateY(-${position}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    });

    // Start typing animation
    typeWriter();
});

// Navigation active link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing animation for subtitle
const phrases = [
    "Senior High School Students"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;
const subtitleElement = document.querySelector('.subtitle');

function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];
    if (isDeleting) {
        subtitleElement.textContent = currentPhrase.substring(0, currentCharIndex--);
        if (currentCharIndex < 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, deletingSpeed);
        }
    } else {
        subtitleElement.textContent = currentPhrase.substring(0, currentCharIndex++);
        if (currentCharIndex > currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseTime);
        } else {
            setTimeout(typeWriter, typingSpeed);
        }
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

const animateSections = document.querySelectorAll('.about, .professional-background, .contact');
animateSections.forEach(section => {
    observer.observe(section);
});
