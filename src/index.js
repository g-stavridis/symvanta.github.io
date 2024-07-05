import screenfull from 'screenfull'
import pieces from './pieces.json'
import format from 'date-fns/format'

import './playlist.js'

const playerDiv = document.querySelector("#fullscreen")
let currentIndex = 0;
const audioElement = document.querySelector('audio')

const playPiece = (index) => {
	document.querySelector("#fullscreen .title").innerHTML = pieces[index].title
	// document.querySelector("#fullscreen p").innerHTML = pieces[index].description
	audioElement.src = `${window.location.origin}/src/audio/${pieces[index].audio}`
	audioElement.play()
	audioElement.volume = 0.9;
}

const progressBar = document.querySelector('input[type=range]')
audioElement.ontimeupdate = () => {
	progressBar.value = audioElement.currentTime
	document.querySelector('.time .current').innerHTML = format(new Date(audioElement.currentTime * 1000), 'm:ss')
}
audioElement.onloadedmetadata = () => {
	progressBar.max = audioElement.duration
	document.querySelector('.time .length').innerHTML = format(new Date(audioElement.duration * 1000), 'm:ss')
}




const playNext = () => {
	currentIndex = (currentIndex + 1) % pieces.length
	playPiece(currentIndex)
	fadeIn();
	setTimeout(fadeOut, 3000);
}

audioElement.onended = playNext

const exitFullscreen = () => {
	if (screenfull.isEnabled) {
		screenfull.exit();
	} else {
		playerDiv.style.display = "none";
		document.querySelector(".page").style.display = "flex"
	}
	audioElement.pause();
}

const enterFullscreen = (event) => {
	currentIndex = parseInt(event.currentTarget.getAttribute('index'))
	playPiece(currentIndex);
	if (screenfull.isEnabled) {
		screenfull.request(playerDiv);
	} else {
		playerDiv.style.display = "flex";
		document.querySelector(".page").style.display = "none"
	}
	fadeIn('0s')
	setTimeout(fadeOut, 3000);
}

const allButtons = document.querySelectorAll(".play-triangle")

document.getElementById("next").addEventListener("click", playNext)

allButtons.forEach(button => {
	button.addEventListener("click", enterFullscreen);
})

document.getElementById("exit").addEventListener("click", exitFullscreen);
window.onblur = exitFullscreen

screenfull.on("change", () => {
	if (screenfull.isFullscreen) {
		playerDiv.style.display = "flex";
	} else {
		exitFullscreen()
		playerDiv.style.display = "none";
	}
})

let touch = false

document.querySelector("body").addEventListener("touchstart", () => {
	touch = true
})

const fadeIn = (transTime = '2s') => {
	document.querySelector("#fullscreen .content").style.transition = transTime
	document.querySelector("#fullscreen .content").style.opacity = "100%"
}
const fadeOut = () => {
	document.querySelector("#fullscreen .content").style.transition = '2s'
	document.querySelector("#fullscreen .content").style.opacity = "0%"
}

document.querySelector("#info").addEventListener("mouseenter", () => {
	if (!touch) fadeIn();
});
document.querySelector("#info").addEventListener("mouseleave", () => {
	if (!touch) fadeOut();
});
document.querySelector("#info").addEventListener("touchstart", fadeIn);
document.querySelector("#info").addEventListener("touchend", fadeOut);


document.querySelector(".pic").addEventListener("click", () => {
	document.querySelector(".site-info").style.display = "flex";
});


document.getElementById("exit-text").addEventListener("click", () => {
	document.querySelector(".site-info").style.display = "none";
});