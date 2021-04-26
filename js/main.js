import { creatures } from './creature.js'
import { numbers } from './utilities.js'


const canv = document.getElementById('mycanvas')
const ctx = canv.getContext('2d')
const fps = 60 // Edit this to change game fps

let lastframe = 0
function loop(currentTime) {
    window.requestAnimationFrame(loop)
    let frameTime = ((currentTime) - lastframe) / 1000
    if (frameTime < 1/fps) {return}
    lastframe = currentTime

    ctx.clearRect(0, 0, canv.width, canv.height) //Clears the canvas each frame

    numbers.shuffleArray(creatures)

    creatures.forEach(element => {
        element.Frame()
    });
    //Put all functions that run on each frame here
}

loop()
