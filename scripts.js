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
            video.style.filter = 'grayscale(100%)';
        } else {
            video.loop = true;
            video.play();
            video.style.filter = 'none';
        }
    });
});

document.querySelectorAll('.hover-video').forEach(video => {
    video.addEventListener('click', () => {
        const hoverText = video.closest('.banner').querySelector('.hover-text');
        if (hoverText.classList.contains('hover-text-visible')) {
            hoverText.classList.remove('hover-text-visible');
        } else {
            hoverText.classList.add('hover-text-visible');
        }
    });
});


