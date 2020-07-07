let startTime = 0;
let savedPreviousSeconds = 0;
let windowInterval;

const padDigits = (value) => {
    if(value < 10){
        return '0'+value;
    } else {
        return value;
    }
}

const formatSeconds = (total) => {
    const hours = Math.floor(total/60/60);
    const minutes = Math.floor( (total - (hours*60*60)) / 60 );
    const seconds = total - minutes*60 - hours * 60 * 60;
    return `${padDigits(hours)}:${padDigits(minutes)}:${padDigits(seconds)}`;
}

const getAccumulatedSeconds = (newerTime, olderTime) => {
    return Math.floor((newerTime-olderTime)/1000);
}

const displayTime = () => {
    const totalSeconds = getAccumulatedSeconds(Date.now(),startTime) + savedPreviousSeconds;
    document.querySelector('h1').innerHTML = formatSeconds(totalSeconds);
}

document.querySelector('.btn-primary').addEventListener('click', (event) => {
    startTime = Date.now();
    document.querySelector('.btn-primary').disabled=true;
    document.querySelector('.btn-secondary').disabled=false;
    document.querySelector('.btn-danger').disabled=true;
    windowInterval = window.setInterval(displayTime,1000)
})

document.querySelector('.btn-secondary').addEventListener('click', (event) => {
    savedPreviousSeconds += getAccumulatedSeconds(Date.now(), startTime);
    document.querySelector('.btn-primary').disabled=false;
    document.querySelector('.btn-secondary').disabled=true;
    document.querySelector('.btn-danger').disabled=false;
    window.clearInterval(windowInterval)
})

document.querySelector('.btn-danger').addEventListener('click', (event) => {
    savedPreviousSeconds = 0;
    document.querySelector('h1').innerHTML = formatSeconds(0);
    document.querySelector('.btn-danger').disabled=true;
})

// window.onbeforeunload = function(){
//     return 'Good bye';
// }
