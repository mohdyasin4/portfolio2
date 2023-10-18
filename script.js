function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

loco();

const tl = gsap.timeline({ paused: true });

const openNav = () => {
  animateOpenNav();
  const navBtn = document.getElementById("menu-toggle-btn");
  navBtn.onclick = function (e) {
    navBtn.classList.toggle("active");
    tl.reversed(!tl.reversed()); // Corrected .reverse() function
  };
};

const animateOpenNav = () => {
  tl.to(".nav-container", 0.1, {
    autoAlpha: 1,
    delay: 0.01
  });

  // Change the color of site-logo SVG and menulines to #fff
  tl.to(".site-logo .cls-1", 0.2, {
    fill: "#fff"
  }, "-=0.1");

  tl.to(".menuline1, .menuline2, .navbar", 0.2, {
    borderBottomColor: "#242424"
  }, "-=0.1");
};


tl.from(".nav-footer", 0.3, {
  opacity: 0
}, "-=0.3").reverse(); // Corrected .reverse() function

openNav();

var clutter = "";

document
  .querySelector("#page2>.leftcontainer>h1")
  .textContent.split(" ")
  .forEach(function (dets) {
    clutter += `<span> ${dets}</span>`;

    document.querySelector("#page2>.leftcontainer>h1").innerHTML = clutter;
  });

gsap.to("#page2>.leftcontainer>h1>span", {
  scrollTrigger: {
    trigger: `#page2>.leftcontainer>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.3
  },
  stagger: `.01`,
  color: `#fff`
});

function animateBtnFill(btnFill, translateY, duration) {
  requestAnimationFrame(() => {
    btnFill.animate(
      {
        transform: `translate(-50%, ${translateY}%)`
      },
      {
        duration,
        fill: 'forwards',
        easing: 'ease',
        color: '#000'
      }
    );
  });
}

const btn = document.querySelectorAll('.btn');

btn.forEach((btn) => {
  const btnFill = btn.querySelector('.btn-fill');
  btn.addEventListener('mouseenter', () => {
    // Mouse Enter Event
    btnFill.style.opacity = 1; // Set opacity to 1
    animateBtnFill(btnFill, 50, 0);
    animateBtnFill(btnFill, -50, 850);
  });

  btn.addEventListener('mouseleave', () => {
    // Mouse Leave Event
    animateBtnFill(btnFill, -150, 850);
    // btnFill.style.opacity = 0; // Set opacity back to 0
  });
});


setTimeout( function () {
  
let elements = document.querySelectorAll('.text');
console.log(elements);

elements.forEach((element) => {
  let innerText = element.textContent;
  element.innerHTML = "";

  let textContainer = document.createElement("div");
  textContainer.classList.add("block");

  for (let letter of innerText) {
    let span = document.createElement("span");
    span.innerText = letter.trim() === "" ? "\xa0" : letter;
    span.classList.add("letter");
    textContainer.appendChild(span);
  }

  element.appendChild(textContainer);
  element.appendChild(textContainer.cloneNode(true));
});

elements.forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.classList.remove("play");
  });
});

},1000 ) 

function updateStylesForPage2() {
  // Select the elements you want to update
  const navbar = document.querySelector(".navbar");
  const menuline1 = document.querySelector(".menuline1");
  const menuline2 = document.querySelector(".menuline2");

  // Create a ScrollTrigger for #page2
  ScrollTrigger.create({
    trigger: "#page2",
    start: "center center",
    end: "bottom bottom",
    scroller: "#main",
    onEnter: () => {
      // Change the styles when scrolling into #page2
      navbar.style.borderBottom = "1px solid #242424"; // Update the navbar's bottom border
      menuline1.style.backgroundColor = "#fff"; // Change menuline1 background color
      menuline2.style.backgroundColor = "#fff"; // Change menuline2 background color
    },
    onLeaveBack: () => {
      // Revert the styles when scrolling back up
      navbar.style.borderBottom = "1px solid #000"; // Revert the navbar's bottom border
      menuline1.style.backgroundColor = "#000"; // Revert menuline1 background color
      menuline2.style.backgroundColor = "#000"; // Revert menuline2 background color
    },
  });
}

function updateLogoColors() {
  // Select the site logo SVG and the cls-1 paths
  const siteLogo = document.querySelector(".site-logo");
  const cls1Paths = siteLogo.querySelectorAll(".cls-1");

  // Create a ScrollTrigger for #page2
  ScrollTrigger.create({
    trigger: "#page2",
    start: "center center",
    end: "bottom center",
    // markers: true, // Remove this line if you don't need the markers
    scroller: "#main",
    onEnter: () => {
      // Change the fill color of cls-1 paths to #fff
      cls1Paths.forEach((path) => {
        path.style.fill = "#fff";
      });
    },
    onLeaveBack: () => {
      // Revert the fill color of cls-1 paths when scrolling back up
      cls1Paths.forEach((path) => {
        path.style.fill = "#000"; // Revert to the original color
      });
    },
  });
}

updateStylesForPage2();
updateLogoColors();


const projects = document.querySelectorAll(".project");
const preview = document.querySelector(".preview");
const previewImg = document.querySelector(".preview-img");

let isInside = false;

const bgPositions = {
    p1: "0 0",
    p2: "0 25%",
    p3: "0 50%",
    p4: "0 75%",
    p5: "0 100%",
};

const moveStuff = (e) => {
    const mouseInside = isMouseInsideContainer(e);

    if (mouseInside !== isInside) {
        isInside = mouseInside;
        if (isInside) {
            gsap.to(preview, 0.3, {
                scale: 1,
            });
        } else {
            gsap.to(preview, 0.3, {
                scale: 0,
            });
        }
    }
};

const moveProject = (e) => {
    const previewRect = preview.getBoundingClientRect();
    const offsetX = previewRect.width / 2;
    const offsetY = previewRect.height / 2;

    preview.style.left = e.pageX - offsetX + "px";
    preview.style.top = e.pageY - offsetY + "px";
};

const moveProjectImg = (project) => {
    const projectId = project.id;
    gsap.to(previewImg, 0.4, {
        backgroundPosition: bgPositions[projectId] || "0 0",
    });

    // Set the opacity to 1 to make .preview-img visible
    gsap.to(previewImg, 0.3, {
        opacity: 1,
    });

    gsap.to(preview, 0.3, {
        scale: 1,
    });
};

const resetPreviewImg = () => {
    // Set the opacity back to 0 to hide .preview-img
    gsap.to(previewImg, 0.3, {
        opacity: 0,
    });
};

const isMouseInsideContainer = (e) => {
    const containerRect = document.querySelector(".container").getBoundingClientRect();
    return (
        e.pageX >= containerRect.left &&
        e.pageX <= containerRect.right &&
        e.pageY >= containerRect.top &&
        e.pageY <= containerRect.bottom
    );
};

document.querySelector(".container").addEventListener("mousemove", moveStuff);

projects.forEach((project) => {
    project.addEventListener("mousemove", moveProject);
    project.addEventListener("mouseenter", moveProjectImg.bind(null, project));
    project.addEventListener("mouseleave", resetPreviewImg); // Add mouseleave event listener
});



function animateBtnFill(btnFill, translateY, duration) {
  requestAnimationFrame(() => {
    btnFill.animate(
      {
        transform: `translate(-50%, ${translateY}%)`
      },
      {
        duration,
        fill: 'forwards',
        easing: 'ease',
        color: '#000'
      }
    );
  });
}

const btn2 = document.querySelectorAll('.btn2');

btn2.forEach((btn2) => {
  const btnFill2 = btn2.querySelector('.btn-fill2');
  btn2.addEventListener('mouseenter', () => {
    // Mouse Enter Event
    btnFill2.style.opacity = 1; // Set opacity to 1
    animateBtnFill(btnFill2, 50, 0);
    animateBtnFill(btnFill2, -50, 850);
  });

  btn2.addEventListener('mouseleave', () => {
    // Mouse Leave Event
    animateBtnFill(btnFill2, -150, 850);
    // btnFill.style.opacity = 0; // Set opacity back to 0
  });
});


new Swiper(".testimonials__slider", {
  loop: true,
  centeredSlides: true,
  slidesPerView: 2,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});



// Change width and time on your desire
initMarquee(500, 40);

function initMarquee(boxWidth, time) {
  const boxElement = $('.boxe');
  const boxLength = boxElement.length;
  const wrapperWidth = boxWidth * boxLength;
  const windowWidth = $(window).width();

  boxElement.parent().css('left', '-' + boxWidth + 'px');
  boxElement.css('width', boxWidth + 'px');

  gsap.set(".boxe", {
    x: (i) => i * boxWidth
  });

  gsap.to(".boxe", {
    duration: time,
    ease: "none",
    x: "-=" + wrapperWidth,
    modifiers: {
      x: gsap.utils.unitize(
        function (x) {
          return parseFloat(x + windowWidth + boxWidth) % wrapperWidth;
        }
      )
    },
    repeat: -1
  });
}
// Change width and time for the first marquee
initMarquee(500, 40, '.boxe');

function initMarquee(boxWidth, time, elementSelector) {
  const boxElement = $(elementSelector);
  const boxLength = boxElement.length;
  const wrapperWidth = boxWidth * boxLength;
  const windowWidth = $(window).width();

  boxElement.parent().css('left', '-' + boxWidth + 'px');
  boxElement.css('width', boxWidth + 'px');

  gsap.set(elementSelector, {
    x: (i) => i * boxWidth
  });

  gsap.to(elementSelector, {
    duration: time,
    ease: "none",
    x: "-=" + wrapperWidth,
    modifiers: {
      x: gsap.utils.unitize(
        function (x) {
          return parseFloat(x + windowWidth + boxWidth) % wrapperWidth;
        }
      )
    },
    repeat: -1
  });
}

// Change width and time for the second marquee
initMarquee(300, 60, '.boxe2');


function animateBtnFill(btnFill, translateY, duration) {
  requestAnimationFrame(() => {
    btnFill.animate(
      {
        transform: `translate(-50%, ${translateY}%)`
      },
      {
        duration,
        fill: 'forwards',
        easing: 'ease',
        color: '#000'
      }
    );
  });
}

const btn3 = document.querySelectorAll('.contactbtn');

btn3.forEach((btn3) => {
  const btnFill3 = btn3.querySelector('.btn-fill3');
  btn3.addEventListener('mouseenter', () => {
    // Mouse Enter Event
    btnFill3.style.opacity = 1; // Set opacity to 1
    animateBtnFill(btnFill3, 50, 0);
    animateBtnFill(btnFill3, -50, 850);
  });

  btn3.addEventListener('mouseleave', () => {
    // Mouse Leave Event
    animateBtnFill(btnFill3, -150, 850);
    // btnFill.style.opacity = 0; // Set opacity back to 0
  });
});