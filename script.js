
javascript
// Theme Toggle Function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.querySelector('.theme-toggle').textContent = isDark ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle').textContent = '☀️';
    }
});

// Smooth scrolling for navigation
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

// Load projects dynamically
function loadProjects() {
    const container = document.getElementById('projectsContainer');
    
    if (!container || !window.projectsData) return;
    
    container.innerHTML = window.projectsData.map(project => `
        <div class="project-card">
            ${project.image
                ? `<img src="${project.image}" class="project-img" alt="${project.title}">`
                : `<div class="project-img-placeholder">${project.icon || '🚀'}</div>`
            }
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', loadProjects);

