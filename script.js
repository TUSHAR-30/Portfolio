bodyvisibilityanimation()
introanimation()
cursoranimation();

const inputs = document.querySelectorAll('.section.contact input');
const textarea = document.getElementById('message');
let initialViewportHeight = window.innerHeight;

document.querySelectorAll('a').forEach(link => {
    link.setAttribute('target', '_blank');
  });

// Listen for resize events to detect keyboard appearance
// window.addEventListener('resize', () => {
//     const currentViewportHeight = window.innerHeight;
//     const isKeyboardVisible = currentViewportHeight < initialViewportHeight;
//     if(isKeyboardVisible) adjustForKeyboard();
// });

function adjustForKeyboard() {
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            document.querySelector('.section.contact').style.height = '150vh';
            document.querySelector('body').style.overflow = 'scroll';
        });

        input.addEventListener('blur', () => {
            document.querySelector('.section.contact').style.height = '100vh';
            document.querySelector('body').style.overflow = 'hidden';
        });
    });

    textarea.addEventListener('focus', () => {
        document.querySelector('.section.contact').style.height = '150vh';
        document.querySelector('body').style.overflow = 'scroll';
    });

    textarea.addEventListener('blur', () => {
        document.querySelector('.section.contact').style.height = '100vh';
        document.querySelector('body').style.overflow = 'hidden';
    });
}


const navs = document.querySelectorAll(".nav-list li");
const cube = document.querySelector(".box");
const sections = document.querySelectorAll(".section");
const body = document.querySelector("body");
const cursor = document.querySelectorAll(".cursor")


const resumeLists = document.querySelectorAll(".resume-list");
const resumeBoxs = document.querySelectorAll(".resume-box");

const portfolioLists = document.querySelectorAll(".portfolio-list");
const portfolioBoxs = document.querySelectorAll(".portfolio-box");

// navbar sections and all section actions with cube rotation when navbar is clicked
const navListinformation = [true, false, false, false, false];
navs.forEach((nav, idx) => {
    nav.addEventListener('click', () => {
        const hasActiveClass = nav.classList.contains('active')
        document.querySelector('.nav-list li.active').classList.remove('active')
        nav.classList.add('active');
        cube.style.transform = `rotateY(${idx * -90}deg)`;
        document.querySelector('.section.active').classList.remove('active')
        sections[idx].classList.add('active');

        if (idx == 1 && !navListinformation[idx] && !hasActiveClass) {
            navListinformation[idx] = true;
            aboutpage()
        }
        else if (idx == 2 && !navListinformation[idx] && !hasActiveClass) {
            navListinformation[idx] = true;
            resumepage()
        }
        else if (idx == 3 && !navListinformation[idx] && !hasActiveClass) {
            navListinformation[idx] = true;
            portfoliopage()
        }



        const array = Array.from(sections);
        // only requires indexes 1,2,3 or does not require start and end indexes
        const arrSecs = array.slice(1, -1);
        arrSecs.forEach(arrSec => {
            if (arrSec.classList.contains('active')) {
                sections[4].classList.add('action-contact');
            }
        });
        if (sections[0].classList.contains('active')) {
            sections[4].classList.remove('action-contact');

        }
    })
});

// resume section when clicking tab-list
resumeLists.forEach((list, idx) => {
    list.addEventListener('click', () => {
        document.querySelector('.resume-list.active').classList.remove('active')
        list.classList.add('active');

        document.querySelector('.resume-box.active').classList.remove('active')
        resumeBoxs[idx].classList.add('active');
    })
});

// portfolio section when clicking tab-list
portfolioLists.forEach((list, idx) => {
    list.addEventListener('click', () => {
        document.querySelector('.portfolio-list.active').classList.remove('active')
        list.classList.add('active');

        document.querySelector('.portfolio-box.active').classList.remove('active')
        portfolioBoxs[idx].classList.add('active');

    })
});

// visibility for contact section when reloading (cube reLoading animation)
setTimeout(() => {
    sections[4].classList.remove('ative')
}, 1500);


//Code for applying validation on textarea field of contactus form
textarea.addEventListener('input', function () {
    const regex = /[a-zA-Z]/;
    if (textarea.value) {
        if (regex.test(textarea.value)) {
            textarea.style.border = "1px solid green"
            textarea.setCustomValidity('');
        } else {
            textarea.style.border = "1px solid red"
            textarea.setCustomValidity('Message must contain at least one word.');
        }
    }
    else {
        textarea.style.border = "1px solid black"
    }

});

//code for changing theme scheme
document.querySelector(".theme-btn").addEventListener('click', () => {
    body.classList.toggle("dark-mode");
    if(body.classList.contains("dark-mode")){
        cursor[0].style.backgroundColor="#171f2b";
        cursor[1].style.backgroundColor="#171f2b"
    }
    else{
        cursor[0].style.backgroundColor="#fff"
        cursor[1].style.backgroundColor="#fff"
    }
})

//Code for sending email using Emailjs
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    document.querySelector('.loadercontainer').style.display = "flex"

    emailjs.sendForm('service_7psgocc', 'template_j4qwqm2', this)
        .then(function () {
            document.querySelector('.loadercontainer').style.display = "none"
            outroanimation();
        }, function (error) {
            document.querySelector('.loadercontainer').style.display = "none"
            alert('Failed to send message. Please try again later.');
        });

    // setTimeout(() => {
    //     document.querySelector('.loadercontainer').style.display = "none"
    //     setTimeout(() => {
    //         outroanimation();
    //     }, 300);
    // }, 2000);


});


//code for gsap animation for body to make visibility:hidden to visible
function bodyvisibilityanimation() {
    const tl = gsap.timeline();
    tl.to("body", {
        visibility: 'visible',
        duration: 0.01
    })
    //If i want to remove the introanimation then in that case i can add the below navbar animation code.
    // tl.from('.nav', {
    //     scale: 0,
    //     opacity: 0,
    //     duration: 0.7,
    // })
}

// Code for gsap animation for IntroPart
function introanimation() {
    const tl = gsap.timeline();
    tl.from('#logo span', {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        delay: 0.5,
        duration: 0.2
    })
    tl.to(".intro", {
        transform: 'translateY(-100vh)',
        duration: 1,
        delay: 0.5
    })
        .add(() => homeanimation(), "-=1");
}

// Code for gsap animation for OutroPart
function outroanimation() {
    const tl = gsap.timeline();
    tl.fromTo(".outro", { transform: 'scale(0)' }, {
        transform: 'scale(1)',
        duration: 1
    })
}

// Code for creating gsap animations for Homepage
function homeanimation() {
    const tl = gsap.timeline();
    // Disable transitions before animation
    tl.set(".home .home-info .btn-sci a", { transition: "none" });

    tl.from('.home .home-info > :not(:last-child)', {
        y: 20,
        opacity: 0,
        delay: 1,
        duration: 0.5,
        stagger: 0.2
    })

    tl.from('.home .home-info .btn-sci a', {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        delay: '-0.4',
        onComplete: () => {
            // Re-enable transitions after the animation completes
            tl.set(".home .home-info .btn-sci a", { transition: "0.3s" });
        }
    })

    tl.from('.home .img-wrapper', {
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: '-0.3'
    })

}

// Code for creating gsap animations for Aboutpage
function aboutpage() {
    //SplitType will make every character of h3 to different element with class ".char"
    const text = new SplitType('.about-info h3')
    const tl = gsap.timeline();

    tl.from('.about .img-wrapper', {
        scale: 0,
        duration: 0.2,
        delay: 0.8
    })
    tl.from('.about-info  > *', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        delay: 0.2,
    })
    tl.to('.about-info h3 .char', {
        stagger: 0.1,
        opacity: 1,
        delay: '-0.5'
    })
}

// Code for creating gsap animations for Resumepage
function resumepage() {
    const tl = gsap.timeline();
    tl.from('.resume .skills .resume-item', {
        y: -20,
        opacity: 0,
        delay: 1.5,
        duration: 0.2,
        stagger: 0.2
    })
}

// Code for creating gsap animations for Portfoliopage
function portfoliopage() {
    const tl = gsap.timeline();
    // Disable transitions before animation
    tl.set(".portfolio .service .portfolio-item h4", { transition: "none" });

    tl.from('.portfolio .service .portfolio-item h4', {
        y: 100,
        opacity: 0,
        delay: 1.4,
        stagger: 0.3,
        onComplete: () => {
            // Re-enable transitions after the animation completes
            tl.set(".portfolio .service .portfolio-item h4", { transition: "0.3s" });
        }
    }, "portfolioservices")

    tl.from('.portfolio .service .portfolio-item img', {
        y: 100,
        opacity: 0,
        delay: 1.4,
        stagger: 0.3,
    }, "portfolioservices")
}

// Code for applying cursor effect and its related animation using gsap in home and about page
function cursoranimation() {

    // Check if the device can hover (e.g., mouse, trackpad) and does not primarily use touch
    const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isHoverable) {
        const root = document.documentElement;

        window.addEventListener("mousemove", (dets) => {
            gsap.to(cursor, {
                x: dets.clientX,
                y: dets.clientY,
                duration: 0.2,
                ease: Expo
            })
        })
        document.querySelector(".nav").addEventListener("mousemove", () => {
            gsap.to(cursor, {
                visibility: 'hidden'
            })
        })
        document.querySelector(".nav").addEventListener("mouseleave", () => {
            gsap.to(cursor, {
                visibility: 'visible'
            })
        })
        document.querySelector(".home .home-info .myName").addEventListener("mousemove", (dets) => {
            gsap.to(cursor, {
                scale: 2,
                duration: 0.2
            })
        })
        document.querySelector(".home .home-info .myName").addEventListener("mouseleave", (dets) => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.2
            })
        })
        document.querySelectorAll(".home .home-info .hello ,.home .home-info .post ,.home .home-info .desc").forEach((hello_post_desc) => hello_post_desc.addEventListener("mousemove", (dets) => {
            gsap.to(cursor, {
                scale: 1.2,
                backgroundColor: '#0ef',
                duration: 0.2
            })
        }))
        document.querySelectorAll(".home .home-info .hello ,.home .home-info .post ,.home .home-info .desc").forEach((hello_post_desc) => hello_post_desc.addEventListener("mouseleave", (dets) => {

            // Check if the body has the dark-mode class
            const isDarkMode = document.body.classList.contains('dark-mode');

            // Get the appropriate color depending on the mode
            const cursorColor = isDarkMode
                ? getComputedStyle(document.body).getPropertyValue('--white-color').trim()
                : getComputedStyle(root).getPropertyValue('--white-color').trim();

            console.log(cursorColor)
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: cursorColor,
                duration: 0.2
            })
        }))
        document.querySelector(".about .about-info .title").addEventListener("mousemove", (dets) => {
            gsap.to(cursor, {
                scale: 2,
                backgroundColor: '#0ef',
                duration: 0.2,
            })
        })
        document.querySelector(".about .about-info .title").addEventListener("mouseleave", (dets) => {

            // Check if the body has the dark-mode class
            const isDarkMode = document.body.classList.contains('dark-mode');

            // Get the appropriate color depending on the mode
            const cursorColor = isDarkMode
                ? getComputedStyle(document.body).getPropertyValue('--white-color').trim()
                : getComputedStyle(root).getPropertyValue('--white-color').trim();

            console.log(cursorColor)
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: cursorColor,
                duration: 0.2,
            })
        })
        document.querySelector(".about .about-info h3").addEventListener("mousemove", (dets) => {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.2,
            })
        })
        document.querySelector(".about .about-info h3").addEventListener("mouseleave", (dets) => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.2,
            })
        })
        document.querySelector(".about .about-info .desc").addEventListener("mousemove", (dets) => {
            gsap.to(cursor, {
                scale: 1.2,
                backgroundColor: '#0ef',
                duration: 0.2,
            })
            gsap.to(".about .about-info .desc", {
                opacity: 1,
                duration: 0.1
            })
        })
        document.querySelector(".about .about-info .desc").addEventListener("mouseleave", (dets) => {
            // Check if the body has the dark-mode class
            const isDarkMode = document.body.classList.contains('dark-mode');

            // Get the appropriate color depending on the mode
            const cursorColor = isDarkMode
                ? getComputedStyle(document.body).getPropertyValue('--white-color').trim()
                : getComputedStyle(root).getPropertyValue('--white-color').trim();

            console.log(cursorColor)
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: cursorColor,
                duration: 0.2
            })
            gsap.to(".about .about-info .desc", {
                opacity: 0.7,
                duration: 0.1
            })
        })

    }
    else {
        // Remove custom cursor class if present (for touch devices)
        document.querySelectorAll('.cursor').forEach(ele => {
            ele.classList.remove('cursor')
        })
    }

}





