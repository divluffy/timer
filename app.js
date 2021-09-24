const select_seconds = document.querySelector('.select_seconds')
const select_minuts = document.querySelector('.select_minuts')
const select_hours = document.querySelector('.select_hours')
const start = document.querySelector('.start')
const pause = document.querySelector('.pause')
const ending = document.querySelector('.ending')
const start_agin = document.querySelector('.start_agin')
const count_hours = document.querySelector('.count_hours')
const count_minuts = document.querySelector('.count_minuts')
const count_seconds = document.querySelector('.count_seconds')
const audio = document.querySelector('.audio audio')
const timer = document.querySelector('.timer')

for (let i = 0; i <= 60; i++) {
    let num = i < 10 ? '0' + i: i
    select_seconds.innerHTML += `<option value="${i}">${num}</option>`
    select_minuts.innerHTML += `<option value="${i}">${num}</option>`
    select_hours.innerHTML += `<option value="${i}">${num}</option>`
}

let seconds = 0
let minuts = 0
let hours = 0
let allSeconds = 0
let timerLoop = false


start.addEventListener('click', (e)=>{
    hours = Number(select_hours.options[select_hours.selectedIndex].value)
    minuts = Number(select_minuts.options[select_minuts.selectedIndex].value)
    seconds = Number(select_seconds.options[select_seconds.selectedIndex].value)

    pause.classList.add('active')
    ending.classList.add('active')
    start.classList.add('active')
    allSeconds = seconds + (minuts * 60 ) + (hours * 60 * 60)
    timerLoop = false
    timesUp()

})

pause.addEventListener('click', (e)=>{
    console.log('pause');
    if(timerLoop !== false){
        clearInterval(timerLoop)
        pause.textContent = 'استمرار'
        timerLoop = false
        audio.pause()
    }else{
        pause.textContent = 'ايقاف'
        timesUp()
    }
})

start_agin.addEventListener('click', ()=>{
    start_agin.classList.remove('active')
    start.classList.remove('active')
    timer.classList.remove('active')
    audio.pause()
    seconds = 0
    minuts = 0
    hours = 0
    count_hours.textContent = '00'
    count_minuts.textContent = '00'
    count_seconds.textContent ='00'
})

ending.addEventListener('click', ()=>{
    start_agin.classList.remove('active')
    start.classList.add('active')
    timer.classList.remove('active')
    audio.pause()
    seconds = 0
    minuts = 0
    hours = 0
    finishTimer()

})


function convertTime(allSeconds){
    let hor = Math.floor(allSeconds / 3600);
    let min = Math.floor((allSeconds - (hor * 3600)) / 60);
    let sec = allSeconds % 60;
    hor = (hor < 10) ? "0" + hor : hor;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    count_hours.textContent = hor
    count_minuts.textContent = min
    count_seconds.textContent = sec
 
}


function timesUp(){
    if(timerLoop === false){
        timerLoop =  setInterval(() => {
            if(allSeconds >= 0){
                convertTime(allSeconds)
                allSeconds--
                if(allSeconds === 10){
                    audio.play()
                }
                if(allSeconds <  10){
                    audio.currentTime = 10
                    audio.play()
                }
            } else {
                finishTimer()
            }
        }, 1000);
    }
}



function finishTimer(){
    clearInterval(timerLoop)
    allSeconds = 0
    pause.classList.remove('active')
    ending.classList.remove('active')
    start_agin.classList.add('active')
    timer.classList.add('active')
}

