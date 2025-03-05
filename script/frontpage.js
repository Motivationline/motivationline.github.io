// document.querySelectorAll('.hover-video').forEach(video => {
//     video.addEventListener('mouseover', () => {
//         video.loop = true;
//         video.play();
//         video.style.filter = 'none'
//     });

//     video.addEventListener('mouseout', () => {
//         video.loop = false;
//         video.pause();
//         video.style.filter = 'grayscale(100%)'
//     });
// });

// document.querySelectorAll('.hover-video').forEach(video => {
//     video.addEventListener('mouseenter', () => {
//         const hoverText = video.closest('.banner').querySelector('.hover-text');
//         hoverText.classList.add('hover-text-visible');
//     });
//     video.addEventListener('mouseleave', () => {
//         const hoverText = video.closest('.banner').querySelector('.hover-text');
//         hoverText.classList.remove('hover-text-visible');
//     });
// });
// maus klick
document.querySelectorAll('.hover-video').forEach(video => {
    video.addEventListener('click', () => {
        if (video.loop) {
            video.loop = false;
            video.pause();
            // video.style.filter = 'grayscale(100%)';
        } else {
            video.loop = true;
            video.play();
            // video.style.filter = 'none';
        }
    });
});

document.querySelectorAll('.hover-video').forEach(video => {
    video.addEventListener('click', () => {
        video.classList.toggle('open');
        video.parentElement.classList.toggle('open');
        const banner = video.closest(".banner");
        const hoverText = video.closest('.banner').querySelector('.hover-text');
        if (video.classList.contains('open')) {
            expandElement(hoverText);
            banner.scrollIntoView({ behavior: 'smooth', block: 'start' , inline: 'nearest'});
        } else {
            collapseElement(hoverText);
        }
    });
});

/**
 * @param {HTMLElement} _element 
 */
function collapseElement(_element){
    let elemHeight = _element.scrollHeight;
    let prevTransition = _element.style.transition;
    _element.style.transition = "";

    requestAnimationFrame(()=>{
        _element.style.height = elemHeight + "px";
        _element.style.transition = prevTransition;
        requestAnimationFrame(()=>{
            _element.style.height = 0 + "px";
        });
    });
    
    _element.classList.remove("hover-text-visible");
}

/**
 * @param {HTMLElement} _element 
 */
function expandElement(_element){
    let elemHeight = _element.scrollHeight;
    _element.style.height = elemHeight + "px";
    _element.addEventListener("transitionend", transitionend);
    _element.addEventListener("transitioncancel", transitionend);
    _element.classList.add("hover-text-visible");
}

const transitionend = (_event) => {
    let element = _event.target;
    // element.removeEventListener("transitionend", arguments.callee);
    element.removeEventListener("transitionend", transitionend);
    element.removeEventListener("transitioncancel", transitionend);
    if(_event.type === "transitionend"){
        element.style.height = null;
    }
}

function setupHeaderCheck(){
    const observer = new IntersectionObserver(entries => {
        for(let entry of entries){
            if(entry.isIntersecting){
                document.getElementsByTagName("header")[0].classList.remove("expanded");
                observer.unobserve(entry.target);
                return;
            }
        }
    });
    observer.observe(document.getElementById("header-scroll-marker"));
}
// setupHeaderCheck();