// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .skill-category');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };

    // Add fade-in class to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .project-card, .skill-category {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Initial check and event listener for scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Handle WebGL Embeds - Responsive behavior
    function setupWebGLEmbeds() {
        const embeds = document.querySelectorAll('.webgl-container iframe');
        embeds.forEach(embed => {
            // Ensure embeds maintain aspect ratio and responsiveness
            embed.addEventListener('load', function() {
                const container = this.parentElement;
                const aspectRatio = this.getAttribute('data-aspect-ratio') || '16:9';
                
                // Parse aspect ratio
                const [width, height] = aspectRatio.split(':').map(Number);
                const paddingBottom = (height / width * 100) + '%';
                
                container.style.paddingBottom = paddingBottom;
            });
        });
    }

    // Call embed setup function
    setupWebGLEmbeds();
});

// WebGL Embed Helper Functions
const WebGLEmbed = {
    // Function to create an itch.io embed
    createItchIoEmbed: function(gameId, options = {}) {
        const defaultOptions = {
            width: '100%',
            aspectRatio: '16:9',
            allowFullscreen: true,
            darkMode: false
        };
        
        const settings = {...defaultOptions, ...options};
        
        // Create container
        const container = document.createElement('div');
        container.className = 'webgl-container';
        
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://itch.io/embed-upload/${gameId}?dark=${settings.darkMode ? '1' : '0'}`;
        iframe.setAttribute('data-aspect-ratio', settings.aspectRatio);
        iframe.width = settings.width;
        iframe.frameBorder = "0";
        if (settings.allowFullscreen) {
            iframe.allowFullscreen = true;
        }
        
        // Append iframe to container
        container.appendChild(iframe);
        
        return container;
    },
    
    // Function to embed game from other platforms
    // Can be expanded for other platforms as needed
    embedGame: function(platform, gameId, targetElement, options = {}) {
        let embedElement;
        
        if (platform === 'itch.io') {
            embedElement = this.createItchIoEmbed(gameId, options);
        } else {
            console.error(`Platform ${platform} not supported for embedding.`);
            return;
        }
        
        // Find target element
        const target = document.querySelector(targetElement);
        if (target) {
            target.appendChild(embedElement);
        } else {
            console.error(`Target element ${targetElement} not found.`);
        }
    }
};

// Example usage (commented out - can be used on project detail pages)
// WebGLEmbed.embedGame('itch.io', '123456', '#game-container', { aspectRatio: '4:3' });
