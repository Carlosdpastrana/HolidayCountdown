function updateCountdown() {
    const now = new Date();
    const nextHalloween = new Date(now.getFullYear(), 11, 25); // October 31st of the current year

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

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial call to display the countdown immediately
updateCountdown();