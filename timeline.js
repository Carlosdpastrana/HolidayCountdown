const countdownButton = document.getElementById('start-countdown');

// variable to hold the countdown interval ID so we can stop it later
// if we want to.
let countdownInterval;

function updateCountdown() {
    const now = new Date();
    const nextHalloween = new Date(now.getFullYear(), 9, 31); // October 31st of the current year

    // If Halloween has already passed this year, set the date to next year's Halloween
    if (now > nextHalloween) {
        nextHalloween.setFullYear(nextHalloween.getFullYear() + 1);
    }

    const diff = nextHalloween - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

countdownButton.addEventListener('click', function() {
    if (!countdownInterval) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }
});

// // Update the countdown every second
// setInterval(updateCountdown, 1000);

// // Initial call to display the countdown immediately
// updateCountdown();


window.addEventListener('load', function() {
    const headerH1 = document.querySelector('header > h1');
    headerH1.classList.add('visible');
});