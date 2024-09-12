// Select the navigation list
const navbarList = document.getElementById('navbar__list');

// Select all sections
const sections = document.querySelectorAll('.section');

// Function to build the navigation menu dynamically
function buildNav() {
    sections.forEach(section => {
        const navItem = document.createElement('li');
        navItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.querySelector('h2').textContent}</a>`;
        navbarList.appendChild(navItem);
    });
}

// Function to add the 'active' class to the visible section
function setActiveSection() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const link = document.querySelector(`a[href="#${section.id}"]`);
        if (rect.top >= 0 && rect.top < window.innerHeight / 4) {
            section.classList.add('active');
            link.classList.add('active');
        } else {
            section.classList.remove('active');
            link.classList.remove('active');
        }
    });
}

function scrollToSection(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    
    // Scroll to the section, compensating for the fixed header height
    const headerOffset = document.querySelector('header').offsetHeight;
    const sectionPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    
    window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
    });
    
    // Highlight the clicked section immediately
    setTimeout(() => {
        sections.forEach(section => section.classList.remove('active'));
        event.target.classList.add('active');
    }, 300); // Add a slight delay to highlight after scrolling
}

// Add navigation items
buildNav();

// Set the active section on scroll
window.addEventListener('scroll', setActiveSection);

// Add click event for smooth scrolling
navbarList.addEventListener('click', scrollToSection);



