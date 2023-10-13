
var time;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function landpageAnim() {
    var ti = gsap.timeline()

    ti.from("#nav", {
        y: -20,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })

        .to(".boundingelm", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 1.5,
            delay: -1,
            stagger: .2,
        })

        .from(".lndpage-footer", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
        })
}


function skewMethod() {

    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", (dets) => {
        clearTimeout(time);

        var xspace = dets.clientX - xprev;
        var yspace = dets.clientY - yprev;

        xscale = gsap.utils.clamp(.7, 1.2, xspace);
        yscale = gsap.utils.clamp(.7, 1.2, yspace);

        xprev = dets.clientX;
        yprev = dets.clientY;

        cursorMove(xscale, yscale);

        time = setTimeout(() => {
            document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        }, 100);
    });
}

function cursorMove(xscale, yscale) {
    window.addEventListener("mousemove", (dets) => {
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    });
}
skewMethod()
cursorMove();
landpageAnim();

document.querySelectorAll(".elem").forEach((elem) => {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", () => {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    })

    elem.addEventListener("mousemove", (dets) => {
        var difff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: difff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-15, 15, diffrot * .5),
        });
    })
})




