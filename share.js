//Associated with id="shareButton" in html//

document.getElementById('shareButton').addEventListener('click', async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Holiday Countdown!!',
                text: 'Keep track of your favorite holidays!',
                url: window.location
            });
            console.log('SHARE Succesful');
        } catch (error) {
            console.error('SHARE Unsuccesful:', error);
        }
    } else {
        alert('This format does not support this SHARE.');
    }
});
//test