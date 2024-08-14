let menuIcon=document.querySelector('#menu-icon');
let navbar=document.quaryselector('.navbar');


menuIcon.onclick=()=>{
    menuIcon.classList.toggle('fa-x');
    navbar.classList.toggle('active')
}



let sections=document.querySelectorAll('section');
let navlinks=document.quaryselectorAll('header nav a')

window.onscroll=()=>{
    sections.forEach(sec=>{
        let top=window.scrolly;
        let offset=sec.offsetTop-150;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');

        if(top >= offset && top<offset+height){
            navLinks.forEach.apply(links => {
                links.classList.remove('active');
                document.quaryselector('header nav a[href*=' +id+']').classList.add('active');
            });
        };
    });

    let header=document.quaryselector('header');
    header.classList.toggle('sticky',window.scrolly>100);


    menuIcon.classList.remove('fa-x');
    navbar.classList.remove('active');
};


ScrollReveal({
    distance:'80px',
    duration:2000,
    Delay:200,
 });

 ScrollReveal().reveal('.home-content, heading', { origin: 'top'});
 ScrollReveal().reveal('.home-img,.services-container,.protfolio-box, .contact form', { origin: button });
 ScrollReveal().reveal('.home-content h1,.about-img', { origin: 'left' });
 ScrollReveal().reveal('.home-content p,.about-content', { origin: 'right' });

