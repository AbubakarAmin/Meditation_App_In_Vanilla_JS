function app() {
    let song = document.querySelector('.song')
    let play = document.querySelector('.play')
    let outline = document.querySelector('.moving-outline circle')
    let video = document.querySelector('.video-container video')
    let sounds_btn = document.querySelectorAll('.sound-picker button')
    let timeSelect=document.querySelectorAll('.time-picker button')
    let display = document.querySelector('.display')
    let outline_Length = outline.getTotalLength()
  
    let fake_length = 600

    // strokeDasharray and strokeDashoffset are new things i learned
    outline.style.strokeDashoffset = outline_Length;
    outline.style.strokeDasharray = outline_Length;
    play.addEventListener("click", function () {
        checkPlaying(song);
    });
sounds_btn.forEach(button=>{
    button.addEventListener('click',()=>{
        video.setAttribute('src',`${button.getAttribute(`data-video`)}`)
        song.setAttribute('src',`${button.getAttribute(`data-sound`)}`)

    })
})
    timeSelect.forEach(button => {
        button.addEventListener('click',()=>{
    fake_length=button.getAttribute('data-time')
    display.textContent=`${Math.floor(fake_length/60)}:0${fake_length%60}`
    outline.style.strokeDashoffset=outline_Length

})
    });

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    };
    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let elapsed = (fake_length - currentTime)
        let seconds = Math.floor((elapsed % 60))

        let minutes = Math.floor(elapsed / 60)
        let progress= outline_Length-(currentTime/fake_length)*outline_Length
        outline.style.strokeDashoffset=progress

        let second=`${seconds}`.padStart(2,0) 
        let minute=`${minutes}`.padStart(2,'0')

        display.textContent=`${minute}:${second}`    

    }

}
app()
