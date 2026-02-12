// Surprise button reveal
document.getElementById('surprise-btn').addEventListener('click', () => {
    document.getElementById('surprise').style.display = 'block';
    document.getElementById('surprise-btn').style.display = 'none';
});

// Yes button alert
document.getElementById('yes-btn').addEventListener('click', () => {
    alert('Yeyyy! I love you nduttt! ❤️‍🩹');
});

// Floating hearts animation
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️‍🩹';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's'; // Random speed
    document.getElementById('hearts').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Generate hearts every 500ms
setInterval(createHeart, 500);
// ... existing code ...

// Optional: Add click effect for gallery photos (e.g., alert or lightbox)
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
        alert('A beautiful memory with u! ❤️‍🩹'); // Or integrate a lightbox library for full-view
    });
});

// ... rest of existing code ...
const music = document.getElementById('bg-music');
let shouldResumeMusic = false;

// Start music on first user interaction (required by browser autoplay policy).
document.getElementById('surprise-btn').addEventListener('click', () => {
    if (!music) return;
    music.muted = false;
    music.volume = 0.3;
    music.play().catch(() => {});
});

// Pause when tab is not visible, resume when user comes back.
document.addEventListener('visibilitychange', () => {
    if (!music) return;
    if (document.hidden) {
        shouldResumeMusic = !music.paused;
        music.pause();
    } else if (shouldResumeMusic) {
        music.play().catch(() => {});
        shouldResumeMusic = false;
    }
});

// Stop when user leaves page (close tab / navigate).
window.addEventListener('pagehide', () => {
    if (!music) return;
    music.pause();
    music.currentTime = 0;
});
