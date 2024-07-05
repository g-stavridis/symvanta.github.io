import pieces from './pieces.json'

let mainContent = ''
pieces.forEach((piece, index) => {
    mainContent = mainContent + 
    `
    <div class="piece">
      <button class="play-triangle" index="${index}">
        <svg viewBox="0 0 100 100">
          <polygon points="0 0, 100 50, 0 100" />
        </svg>
      </button>
      <div class="title">
        ${piece.title}
      </div>
    </div>
    `
})
document.getElementById("playlist").innerHTML = mainContent