/*

===== TODOs =====

MVP

- display how many 5/10min blocks have passed
- don't confirm close if time displayed is 0
- set alarm for after certain times have passed
- cleanup
- deploy

Extras

- display previous entries (build API that saves in DB)
- auth (normal + google/twitter/facebook/apple/spotify sign in)
- use audo api to pause when no sound is detected
- hook up practice log or build it in

*/

let startTime = 0;
let savedPreviousSeconds = 0;
let running = false;
let windowInterval;

const previousSessionAccumulatedSeconds = parseInt(window.localStorage.getItem('savedPreviousSeconds'));
if(previousSessionAccumulatedSeconds){
    savedPreviousSeconds = previousSessionAccumulatedSeconds
}

const padDigits = (value) => {
    if(value < 10){
        return '0'+value;
    } else {
        return value;
    }
}

const formatSeconds = (total) => {
    const minutes = Math.floor( total / 60 );
    const seconds = total - minutes*60;
    return `${minutes}:${padDigits(seconds)}`;
}

const getAccumulatedSeconds = (newerTime, olderTime) => {
    return Math.floor((newerTime-olderTime)/1000);
}

const displayTime = () => {
    const totalSeconds = getAccumulatedSeconds(Date.now(),startTime) + savedPreviousSeconds;
    document.querySelector('code').innerHTML = formatSeconds(totalSeconds);
}

const start = (event) => {
    startTime = Date.now();
    running = true;
    document.querySelector('body').classList.add('running');
    document.querySelector('#start').disabled=true;
    document.querySelector('#stop').disabled=false;
    document.querySelector('#reset').disabled=true;
    windowInterval = window.setInterval(displayTime,1000)
};

const stop = (event) => {
    updateSavedPreviousSeconds();
    running = false;
    document.querySelector('body').classList.remove('running');
    document.querySelector('#start').disabled=false;
    document.querySelector('#stop').disabled=true;
    document.querySelector('#reset').disabled=false;
    window.clearInterval(windowInterval)
};

const updateSavedPreviousSeconds = () => {
    savedPreviousSeconds += getAccumulatedSeconds(Date.now(), startTime);
}

document.querySelector('code').innerHTML = formatSeconds(savedPreviousSeconds);
if(savedPreviousSeconds !== 0){
    document.querySelector('#reset').disabled=false;
}

document.querySelector('#start').addEventListener('click', start)

document.querySelector('#stop').addEventListener('click', stop)

document.querySelector('#reset').addEventListener('click', (event) => {
    savedPreviousSeconds = 0;
    document.querySelector('code').innerHTML = formatSeconds(0);
    document.querySelector('#reset').disabled=true;
})

document.querySelector('body').addEventListener('keyup', (event) => {
    if(event.keyCode === 32){
        if(running){
            stop();
        } else {
            start();
        }
    }
})

window.onbeforeunload = function(){
    if(running){
        updateSavedPreviousSeconds();
    }
    window.localStorage.setItem('savedPreviousSeconds', savedPreviousSeconds);
    return 'Good bye';
}
