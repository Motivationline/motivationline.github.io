document.querySelectorAll('.hover-video').forEach(video => {
    video.addEventListener('mouseover', () => {
        video.loop = true;
        video.play();
    });

    video.addEventListener('mouseout', () => {
        video.loop = false;
        video.pause();
    });
});
