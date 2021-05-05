import { numbers } from './utilities.js'
const canv = document.getElementById('mycanvas')
const ctx = canv.getContext('2d', { alpha: false })


export let particles = []

let flock = {
      flockRange:0,
  randomMovement:0, // based on chooseDirection method
     memberSpeed:0, //In pixels per frame
    memberRadius:0, 
spawnedParticles:0, // Spawn this many 
} 
export class particle {
    constructor(x, y, direction, speed) {
        this.x = x
        this.y = y
        this.direction = direction
        this.speed = speed
    }


    chooseDirection(x, strength) {
        //Most return values are close to 0
        //Strength determines how strongly the creture is controlled by randomness
        
        return strength * (x - 0.5)**3
        //return strength * (0.2*x - 0.1)
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
    

    flock() { //Makes the particles flock
        let nearDirections = []

        particles.forEach(element => {

            if(!(element.x == this.x && element.direction == this.direction && element.y == this.y)  // If element is not itself
            && numbers.calculateDisance(this.x, this.y, element.x, element.y) < flock.flockRange) { //And element is close enough

                nearDirections.push(element.direction)

                /*if (numbers.calculateDisance(this.x, this.y, element.x, element.y) < flock.flockRange) { // If elements are close to each other
                    this.direction = element.direction
                    this.direction += this.chooseDirection(Math.random(), flock.randomMovement)
                    return
                }*/
                //Old version
            }
        })


        //Sets the particle's direction to the average of nearby particles
        if (nearDirections.length) { //Prevents division by 0
        let average = 0
        for(let i = 0; i < nearDirections.length; i++) {
            average += nearDirections[i];
        }
        average = average / nearDirections.length

        this.direction = average + this.chooseDirection(Math.random(), flock.randomMovement)
        nearDirections = []
    }

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
    flock.spawnedParticles = document.getElementById('numSpawn').value

    let i = 0
    particles = []
    while(i < flock.spawnedParticles) {
        particles.push(new particle(numbers.RandomInt(10, canv.width + 10), numbers.RandomInt(10, canv.height + 10), numbers.RandomInt(0, 360), flock.memberSpeed))
        //Spawns particles randomly

        //particles.push(new particle(640, 360, numbers.RandomInt(0, 360), flock.memberSpeed))
        //spawns all in middle


        i++
    }

}

simStart()