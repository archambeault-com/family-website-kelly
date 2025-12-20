// Shared Header Component
function createHeader() {
    return `
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <img src="assets/logo2.png" alt="Kelly Archambeault" class="logo">
                <span>Kelly Archambeault</span>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="achievements.html" class="nav-link">Achievements</a></li>
                <li><a href="academics.html" class="nav-link">Academics</a></li>
                <li><a href="gallery.html" class="nav-link">Media</a></li>
                <li><a href="contact.html" class="nav-link">Contact</a></li>
                <li><a href="resume.html" class="nav-link resume-btn">Resume</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    `;
}

// Shared Footer Component
function createFooter() {
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Kelly Athletics</h4>
                    <p>Dedicated to excellence in cross country and track athletics</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="achievements.html">Achievements</a></li>
                        <li><a href="academics.html">Academics</a></li>
                        <li><a href="resume.html">Resume</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p><i class="fas fa-envelope"></i> kelly.archambeault.running@gmail.com</p>
                    <p><i class="fas fa-phone"></i> Available upon request</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Kelly Archambeault. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `;
}

// Function to set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function markActiveNavLink() {
  const links = document.querySelectorAll('.nav-link');

  // get current file name (no trailing slash), then strip extension
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  let currentFile = currentPath.split('/').pop() || '';
  currentFile = currentFile.replace(/\.[^/.]+$/, '') || 'index';

  links.forEach(a => {
    const href = a.getAttribute('href') || '';

    // resolve the href relative to current location to get a proper pathname
    let hrefFile = '';
    try {
      const resolved = new URL(href, window.location.href);
      hrefFile = resolved.pathname.replace(/\/$/, '').split('/').pop() || '';
    } catch (e) {
      // fallback for malformed hrefs
      hrefFile = href.replace(/\/$/, '').split('/').pop() || '';
    }

    hrefFile = hrefFile.replace(/\.[^/.]+$/, '') || 'index';

    if (hrefFile === currentFile) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

// Initialize header and footer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Insert header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = createHeader();

        // remove site name text on the home page only
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage === 'index.html') {
            const logoSpan = headerPlaceholder.querySelector('.nav-logo span');
            if (logoSpan) logoSpan.remove();
        }

        setActiveNavLink();
        markActiveNavLink();
        
        // Initialize hamburger menu functionality after header is inserted
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');

                    // Immediately mark the clicked link as active so there's no visual flash
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
    }
    
    // Insert footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = createFooter();
    }
});
