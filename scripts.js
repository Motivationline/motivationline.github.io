document.querySelectorAll('.hover-video').forEach(video => {
    video.addEventListener('mouseover', () => {
        video.loop = true;
        video.play();
        video.style.filter = 'none'
    });

    video.addEventListener('mouseout', () => {
        video.loop = false;
        video.pause();
        video.style.filter = 'grayscale(100%)'
    });
});
