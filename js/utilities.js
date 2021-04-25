const canv = document.getElementById('mycanvas')
const ctx = canv.getContext('2d')

export let numbers = {

    RandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    calculateDisance(x1, y1, x2, y2) {
        return Math.sqrt( ((x1 - x2) ** 2) + ((y1 - y2) ** 2) )
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}




export let drawShapes = {

    drawRect(topleftx, toplefty, width, height, color) {
        ctx.beginPath()
        ctx.fillstyle = 'black' //Sets the color to black if no color is provided
        if (color) {
            ctx.fillStyle = color
        }

        ctx.rect(topleftx, toplefty, width, height)

        ctx.fill() //Replace with ctx.stroke for an unfilled rectangle
    },

    drawCircle(centerx, centery, radius, color) {
        ctx.beginPath()
        ctx.fillstyle = 'black' //Sets the color to black if no color is provided
        if (color) {
            ctx.fillStyle = color
        }

        ctx.arc(centerx, centery, radius, 0, 7)

        ctx.fill() //Replace with ctx.stroke for an unfilled circle
    },
}




export let collision = {

    cirlceCollision(x1, y1, x2, y2, radius1, radius2) {
        let centerDistance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

        if (centerDistance < radius1 + radius2) {
            return true
        }

        return false
    },

    isPastCanvasEdge(x, y) {
        if (x > canv.width) {
            return true
        }
        if (x < 0) {
            return true
        }
        if (y < 0) {
            return true
        }
        if (y > canv.height) {
            return true
        }
    },

    rectangularCollision(x1, y1, x2, y2, width1, width2, height1, height2) {
        //Detects if 2 rectangles are overlapping

        if (!height1) {
            height1 = width1
        }
        if (!height2) {
            height2 = width2
        }
        //If no value is entered for height1 or 2 the rectangle is assumed to be a square

        if (x1 < x2 + width2 &&
            x1 + width1 > x2 &&
            y1 < y2 + height2 &&
            y1 + height1 > y2) {
            return true
        }
        return false

    },

}