let startTime;
let windowInterval;

const displayTime = () => {
    // console.log(Date.now()-startTime);
    document.querySelector('h1').innerHTML = Math.floor((Date.now()-startTime)/1000);
}

document.querySelector('.btn-primary').addEventListener('click', (event) => {
    startTime=Date.now();
    windowInterval = window.setInterval(displayTime,1000)
})

document.querySelector('.btn-secondary').addEventListener('click', (event) => {
    window.clearInterval(windowInterval)
})

window.onbeforeunload = function(){
    return 'Good bye'
}
