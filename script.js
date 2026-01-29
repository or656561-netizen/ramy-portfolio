// Debounce Function for Better Performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Check for saved dark mode preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'true' || (savedMode === null && prefersDark)) {
        html.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
    
    darkModeToggle.addEventListener('click', () => {
        html.classList.toggle('dark-mode');
        const isDarkMode = html.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        updateDarkModeIcon(isDarkMode);
    });
    
    function updateDarkModeIcon(isDarkMode) {
        const icon = darkModeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
});

// Hamburger Menu Toggle
const linksDiv = document.querySelector('.links');
const icon = document.querySelector('.links .icon');
const menuItems = document.querySelector('.links ul');

// Toggle menu on icon click
icon.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    linksDiv.classList.toggle('active');
});

// Close menu when clicking on a menu item
const menuLinks = document.querySelectorAll('.links ul li a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        linksDiv.classList.remove('active');
        updateActiveMenuLink(link);
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!linksDiv.contains(e.target)) {
        linksDiv.classList.remove('active');
    }
});

// Update Active Menu Link
function updateActiveMenuLink(clickedLink) {
    menuLinks.forEach(link => {
        link.style.color = '';
        link.style.fontWeight = '';
    });
    clickedLink.style.color = 'var(--secondary)';
    clickedLink.style.fontWeight = '700';
}

// Scroll Reveal Animation
const revealElements = () => {
    const elements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Back to Top Button Functionality
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Update Scroll Progress Bar
        const scrollTop = window.pageYOffset;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / pageHeight) * 100;
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }, 50));
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Page Loader - Hide after page loads
window.addEventListener('load', () => {
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hide');
        }, 500);
    }
});

// Hide loader if page loads quickly
document.addEventListener('DOMContentLoaded', () => {
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader && document.readyState === 'complete') {
        pageLoader.classList.add('hide');
    }
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize scroll reveal when DOM is loaded
document.addEventListener('DOMContentLoaded', revealElements);

// Auto-generate card captions from image alt attributes for accessibility
// Filter Functionality for Certification Page
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sections = {
        certificates: document.querySelector('[data-section="certificates"]'),
        honors: document.querySelector('[data-section="honors"]'),
        radio: document.querySelector('[data-section="radio"]'),
        culture: document.querySelector('[data-section="culture"]'),
        share: document.querySelector('[data-section="share"]')
    };

    // Get section titles for hiding/showing
    const sectionTitles = {
        certificates: 'الشهادات',
        honors: 'التكريمات',
        radio: 'الإذاعة المدرسية',
        culture: 'الثقافة العامة',
        share: 'المشاركة اللاصفية'
    };

    // Find and store section title elements
    const titleMap = {};
    document.querySelectorAll('.gallery-title').forEach((title, index) => {
        const keys = Object.keys(sectionTitles);
        if (index < keys.length) {
            titleMap[keys[index]] = title;
        }
    });

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/Hide sections
            Object.keys(sections).forEach(key => {
                const section = sections[key];
                const title = titleMap[key];
                
                if (filterValue === 'all') {
                    // Show all sections
                    if (section) {
                        section.classList.remove('hidden');
                        section.classList.add('visible');
                    }
                    if (title) {
                        title.classList.remove('hidden');
                        title.classList.add('visible');
                    }
                } else if (filterValue === key) {
                    // Show specific section
                    if (section) {
                        section.classList.remove('hidden');
                        section.classList.add('visible');
                    }
                    if (title) {
                        title.classList.remove('hidden');
                        title.classList.add('visible');
                    }
                } else {
                    // Hide other sections
                    if (section) {
                        section.classList.add('hidden');
                        section.classList.remove('visible');
                    }
                    if (title) {
                        title.classList.add('hidden');
                        title.classList.remove('visible');
                    }
                }
            });

            // Hide/Show hr elements between sections
            const hrs = document.querySelectorAll('main > hr');
            let hrIndex = 0;
            let sectionCount = 0;

            document.querySelectorAll('.gallery-title').forEach((title, idx) => {
                if (!title.classList.contains('hidden')) {
                    sectionCount++;
                }
            });

            hrs.forEach(hr => {
                if (filterValue === 'all') {
                    hr.style.display = 'block';
                } else {
                    hr.style.display = 'none';
                }
            });

            // Smooth scroll to first visible section
            if (filterValue !== 'all') {
                const visibleSection = document.querySelector(
                    `[data-section="${filterValue}"]`
                );
                if (visibleSection) {
                    setTimeout(() => {
                        visibleSection.getBoundingClientRect();
                        window.scrollTo({
                            top: visibleSection.offsetTop - 150,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        });
    });
});