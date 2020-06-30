let startTime;
let windowInterval;

const formatTime = (total) => {
    const hours = Math.floor(total/60/60);
    const minutes = Math.floor( (total - (hours*60*60)) / 60 );
    const seconds = total - minutes*60 - hours * 60 * 60;
    return `${hours}:${minutes}:${seconds}`;
}

const displayTime = () => {
    // console.log(Date.now()-startTime);
    const timeString = formatTime(Math.floor((Date.now()-startTime)/1000));
    document.querySelector('h1').innerHTML = timeString;
}

document.querySelector('.btn-primary').addEventListener('click', (event) => {
    startTime=Date.now();
    windowInterval = window.setInterval(displayTime,1000)
})

document.querySelector('.btn-secondary').addEventListener('click', (event) => {
    window.clearInterval(windowInterval)
})

// window.onbeforeunload = function(){
//     return 'Good bye';
// }
