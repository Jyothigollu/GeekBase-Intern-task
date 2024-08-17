/*let menuIcon=document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar'); // Fix typo



menuIcon.onclick=()=>{
    menuIcon.classList.toggle('fa-x');
    navbar.classList.toggle('active')
}*/
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('fa-x');
        navbar.classList.toggle('active');
        console.log('Menu clicked');
        console.log('Navbar classes:', navbar.classList);
        
        requestAnimationFrame(() => {
            const computedStyle = window.getComputedStyle(navbar);
            console.log('Navbar display style:', computedStyle.display);
            console.log('Navbar visibility:', computedStyle.visibility);
            console.log('Navbar opacity:', computedStyle.opacity);
            console.log('Navbar position:', computedStyle.position);
            console.log('Navbar top:', computedStyle.top);
            console.log('Navbar left:', computedStyle.left);
            console.log('Navbar width:', computedStyle.width);
            console.log('Navbar background-color:', computedStyle.backgroundColor);
        });
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('fa-x');
            navbar.classList.remove('active');
        });
    });
});

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove these lines as we're handling menu icon in the click event now
    // menuIcon.classList.remove('fa-x');
    // navbar.classList.remove('active');
};

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
