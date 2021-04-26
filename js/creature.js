import { numbers } from './utilities.js'
const canv = document.getElementById('mycanvas')
const ctx = canv.getContext('2d', { alpha: false })


export let creatures = []

//TODO: make this user-modifyable
let flock = {
      flockRange:0,
  randomMovement:0, // based on chooseDirection method
     memberSpeed:0, //In pixels per frame
    memberRadius:0, 
spawnedCreatures:0, // Spawn this many 
} 
export class creature {
    constructor(x, y, direction, speed) {
        this.x = x
        this.y = y
        this.direction = direction
        this.speed = speed
    }

    chooseDirection(x, strength) {
        //Most return values are close to 0
        //Strength determines how strongly the creture is controlled by randomness
        
        //return strength * Math.pow((x - 0.5), 3)
        return strength * (0.2*x - 0.1)
        //alternative
    }

    move() {
        //changes direction randomly
        this.diirection = this.direction % 360
        this.direction += this.chooseDirection(Math.random(), flock.randomMovement)

        //Moves based on vector
        this.x += Math.cos(this.direction) * this.speed
        this.y += Math.sin(this.direction) * this.speed

        //screenwraps
        if (this.x > canv.width) {
            this.x = 1
        }
        if (this.x < 0) {
            this.x = canv.width -1
        }
        if (this.y < 0) {
            this.y = canv.height - 1
        }
        if (this.y > canv.height) {
            this.y = 1
        }

}

    drawSelf() {
        ctx.beginPath()
        ctx.fillStyle = 'black'
        ctx.arc(this.x, this.y, flock.memberRadius, 0, 7)
        ctx.fill()
    }
    

    flock() { //Makes the creatures flock
        creatures.forEach(element => {

            if(!(element.x == this.x && element.direction == this.direction && element.y == this.y) ) { // If element is not itself
                if (numbers.calculateDisance(this.x, this.y, element.x, element.y) < flock.flockRange) { // If elements are close to each other
                    this.direction = element.direction
                    this.direction += this.chooseDirection(Math.random(), flock.randomMovement)
                    return
                }
            }
        })
    }

    Frame() {
        this.flock()
        this.move()
        this.drawSelf()
    }
}

let startButton = document.getElementById('startSimButton')
startButton.onclick = function ButtonStart(){
    simStart()
}

function simStart() {
    flock.flockRange = document.getElementById('flockRange').value
    flock.randomMovement = document.getElementById('randomMovement').value
    flock.memberSpeed = document.getElementById('speed').value
    flock.memberRadius = document.getElementById('radius').value
    flock.spawnedCreatures = document.getElementById('numSpawn').value

    let i = 0
    creatures = []
    while(i < flock.spawnedCreatures) {
        creatures.push(new creature(numbers.RandomInt(10, canv.width + 10), numbers.RandomInt(10, canv.height + 10), numbers.RandomInt(0, 360), flock.memberSpeed))
        //Spawns creatures randomly

        //creatures.push(new creature(640, 360, numbers.RandomInt(0, 360), flock.memberSpeed))
        //spawns all in middle


        i++
    }

}

simStart()