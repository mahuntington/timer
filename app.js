let startTime = 0;
let windowInterval;

const padDigits = (value) => {
    if(value < 10){
        return '0'+value;
    } else {
        return value;
    }
}

const formatTime = (total) => {
    const hours = Math.floor(total/60/60);
    const minutes = Math.floor( (total - (hours*60*60)) / 60 );
    const seconds = total - minutes*60 - hours * 60 * 60;
    return `${padDigits(hours)}:${padDigits(minutes)}:${padDigits(seconds)}`;
}

const displayTime = () => {
    startTime++;
    document.querySelector('h1').innerHTML = formatTime(startTime);
}

document.querySelector('.btn-primary').addEventListener('click', (event) => {
    document.querySelector('.btn-primary').disabled=true;
    document.querySelector('.btn-secondary').disabled=false;
    document.querySelector('.btn-danger').disabled=true;
    windowInterval = window.setInterval(displayTime,1000)
})

document.querySelector('.btn-secondary').addEventListener('click', (event) => {
    document.querySelector('.btn-primary').disabled=false;
    document.querySelector('.btn-secondary').disabled=true;
    document.querySelector('.btn-danger').disabled=false;
    window.clearInterval(windowInterval)
})

document.querySelector('.btn-danger').addEventListener('click', (event) => {
    startTime = 0;
    document.querySelector('h1').innerHTML = formatTime(startTime);
    document.querySelector('.btn-danger').disabled=true;
})

// window.onbeforeunload = function(){
//     return 'Good bye';
// }
