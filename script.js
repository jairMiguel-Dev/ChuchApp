document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading screen
    setTimeout(function() {
        document.querySelector('.loading-screen').classList.add('fade-out');
        
        // Remove loading screen after animation
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 2000);
    
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show the corresponding content section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Scroll to top of the section
            document.getElementById(sectionId).scrollTo(0, 0);
        });
    });
    
    // Audio player functionality
    const audioPlayer = document.querySelector('.audio-player');
    const playPauseBtn = document.querySelector('.play-pause');
    let isPlaying = false;
    
    // Show audio player after 5 seconds (simulating audio starting)
    setTimeout(function() {
        audioPlayer.classList.add('active');
    }, 5000);
    
    playPauseBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            this.innerHTML = '<i class="fas fa-pause"></i>';
            audioPlayer.classList.add('playing');
            simulateProgress();
        } else {
            this.innerHTML = '<i class="fas fa-play"></i>';
            audioPlayer.classList.remove('playing');
        }
    });
    
    // Simulate progress bar movement
    function simulateProgress() {
        if (!isPlaying) return;
        
        const progressBar = document.querySelector('.progress');
        let width = parseFloat(progressBar.style.width) || 0;
        
        if (width >= 100) {
            width = 0;
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            audioPlayer.classList.remove('playing');
        } else {
            width += 0.5;
            progressBar.style.width = width + '%';
            setTimeout(simulateProgress, 100);
        }
    }
    
    // Live banner pulse effect
    const liveBanner = document.querySelector('.live-banner');
    
    if (liveBanner) {
        setInterval(function() {
            liveBanner.classList.toggle('pulse');
        }, 1500);
    }
    
    // Verse of the day share functionality
    const shareButtons = document.querySelectorAll('.verse-actions button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const verseText = document.querySelector('.verse-text').textContent;
            const verseRef = document.querySelector('.verse-reference').textContent;
            
            if (this.querySelector('.fa-share-alt')) {
                // Share functionality
                if (navigator.share) {
                    navigator.share({
                        title: 'Versículo do Dia',
                        text: `${verseText} - ${verseRef}`,
                        url: window.location.href
                    }).catch(err => {
                        console.log('Error sharing:', err);
                    });
                } else {
                    // Fallback for browsers that don't support Web Share API
                    alert('Compartilhar: ' + verseText + ' - ' + verseRef);
                }
            } else {
                // Save functionality
                this.innerHTML = '<i class="fas fa-check"></i> Salvo';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-bookmark"></i> Salvar';
                }, 2000);
            }
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.action-card, .sermon-card, .timeline-content, .give-option, .more-option');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const parallaxHeader = document.querySelector('.parallax-header');
        
        if (parallaxHeader) {
            parallaxHeader.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Check if PWA is installed
    window.addEventListener('appinstalled', () => {
        console.log('App installed successfully');
    });
    
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});

// Manifest for PWA
const manifest = {
    "name": "Igreja Vida Nova",
    "short_name": "Vida Nova",
    "start_url": ".",
    "display": "standalone",
    "background_color": "#8e44ad",
    "description": "Aplicativo oficial da Igreja Vida Nova - Conexão Divina",
    "theme_color": "#8e44ad",
    "icons": [
        {
            "src": "icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
        },
        {
            "src": "icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
        },
        {
            "src": "icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
        },
        {
            "src": "icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
        },
        {
            "src": "icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
        },
        {
            "src": "icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
        },
        {
            "src": "icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
};

// Service Worker (sw.js)
const CACHE_NAME = 'igreja-vida-nova-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Playfair+Display:wght@700&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});