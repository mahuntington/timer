/* TODOs
- enable reset on load if there is saved time from before
- display previous entries
- display how many 5/10min blocks have passed
- set alarm for after certain times have passed
- pause when not playing with audio api
- deploy
- cleanup
- hook up practice log
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

const updateSavedPreviousSeconds = () => {
    savedPreviousSeconds += getAccumulatedSeconds(Date.now(), startTime);
}

document.querySelector('code').innerHTML = formatSeconds(savedPreviousSeconds);

document.querySelector('#start').addEventListener('click', (event) => {
    startTime = Date.now();
    running = true;
    document.querySelector('body').classList.add('running');
    document.querySelector('#start').disabled=true;
    document.querySelector('#stop').disabled=false;
    document.querySelector('#reset').disabled=true;
    windowInterval = window.setInterval(displayTime,1000)
})

document.querySelector('#stop').addEventListener('click', (event) => {
    updateSavedPreviousSeconds();
    running = false;
    document.querySelector('body').classList.remove('running');
    document.querySelector('#start').disabled=false;
    document.querySelector('#stop').disabled=true;
    document.querySelector('#reset').disabled=false;
    window.clearInterval(windowInterval)
})

document.querySelector('#reset').addEventListener('click', (event) => {
    savedPreviousSeconds = 0;
    document.querySelector('code').innerHTML = formatSeconds(0);
    document.querySelector('#reset').disabled=true;
})

window.onbeforeunload = function(){
    if(running){
        updateSavedPreviousSeconds();
    }
    window.localStorage.setItem('savedPreviousSeconds', savedPreviousSeconds);
    return 'Good bye';
}
