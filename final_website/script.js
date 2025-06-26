// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Color swatch interaction
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
        const colorName = this.getAttribute('title');
        const colorValue = window.getComputedStyle(this).backgroundColor;
        
        // Create a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = `${colorName} - Click to copy!`;
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
            transform: translate(-50%, -100%);
            margin-top: -10px;
        `;
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width/2 + 'px';
        tooltip.style.top = rect.top + 'px';
        
        document.body.appendChild(tooltip);
        
        // Copy color to clipboard
        navigator.clipboard.writeText(colorValue).then(() => {
            tooltip.textContent = 'Color copied! 🎨';
        });
        
        // Remove tooltip after 2 seconds
        setTimeout(() => {
            tooltip.remove();
        }, 2000);
        
        // Add a little animation to the swatch
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe all room cards
document.querySelectorAll('.room-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Fun easter egg - click on emojis for surprises!
const easterEggEmojis = ['🛋️', '🛏️', '🛁', '📚', '🐱', '🌿', '✨'];
const surpriseMessages = [
    "Yes, you DO need another throw pillow! 💅",
    "Your plants are judging your decorating choices 🌱",
    "That expensive candle? Totally worth it! 🕯️",
    "Your cat has better taste than most interior designers 😸",
    "Pinterest saved... again 📌",
    "Your bank account is crying but your house is gorgeous! 💸",
    "Remember: more is more, unless it's less, then less is more 🤷‍♀️"
];

document.body.addEventListener('click', function(e) {
    const clickedText = e.target.textContent;
    if (easterEggEmojis.some(emoji => clickedText.includes(emoji))) {
        const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
        
        // Create floating message
        const message = document.createElement('div');
        message.textContent = randomMessage;
        message.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            background: linear-gradient(135deg, #2d5d31, #4a7c59);
            color: white;
            padding: 12px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1001;
            pointer-events: none;
            transform: translate(-50%, -50%);
            animation: floatUp 3s ease-out forwards;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
});

// Add the floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Theme pill interaction
document.querySelectorAll('.theme-pill').forEach(pill => {
    pill.addEventListener('click', function() {
        const theme = this.textContent.toLowerCase();
        let targetSection;
        
        if (theme.includes('warm')) {
            targetSection = '#living';
        } else if (theme.includes('jungle')) {
            targetSection = '#living';
        } else if (theme.includes('academia')) {
            targetSection = '#study';
        }
        
        if (targetSection) {
            document.querySelector(targetSection).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect to furniture list items
document.querySelectorAll('.furniture-list li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Console easter egg for the curious
console.log(`
    🎨 Welcome to your dream home design! 
    
    Psst... click on the emojis for some sassy design advice! 
    
    Built with love, caffeine, and questionable taste decisions ✨
`);

// Add a subtle parallax effect to the hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Animate vibe meters on hover
document.querySelectorAll('.vibe-meter').forEach(meter => {
    meter.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    meter.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Dynamic title change based on current section
const sections = document.querySelectorAll('.room-section');
const originalTitle = document.title;

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const sectionTitle = entry.target.querySelector('h2').textContent;
            document.title = `${sectionTitle} | ${originalTitle}`;
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Reset title when at top of page
window.addEventListener('scroll', () => {
    if (window.scrollY < 200) {
        document.title = originalTitle;
    }
});