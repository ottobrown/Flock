import { collision, numbers } from './utilities.js'
const canv = document.getElementById('mycanvas')
const ctx = canv.getContext('2d', { alpha: false })

let canvasCenterX = canv.width / 2
let canvasCenterY = canv.height / 2

export let creatures = []



//TODO: mke this user-modifyable
let flock = {
    flockDeviation:0.1,
    flockRange:20,
    randomMovement:1, // based on chooseDirection method
    memberSpeed:3,//In pixels per frame
    memberRadius:10,
    spawnedCreatures:3000, // Spawn this many 
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
        return strength * Math.pow((x - 0.5), 3)
    }

    move() {
        //changes direction randomly
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
                if ((Math.abs(element.x - this.x)) < flock.flockRange && (Math.abs(element.y - this.y)) < flock.flockRange) { // If elements are close to each other
                    this.direction = element.direction
                    this.direction += this.chooseDirection(Math.random(), flock.flockDeviation)
                }
            }
        })
        //TODO: FIX: flocks get stuck on the edge
    }

    Frame() {
        this.flock()
        this.move()
        this.drawSelf()
    }
}

let i = 0
while(i < flock.spawnedCreatures) {
    creatures.push(new creature(numbers.RandomInt(10, 1270), numbers.RandomInt(10, 710), numbers.RandomInt(0, 360), flock.memberSpeed))

    i++
}
