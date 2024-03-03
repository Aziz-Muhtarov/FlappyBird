const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const topPipe = new Image();
const bottomPipe = new Image();

bird.src = "./src/img/bird.png";
bg.src = "./src/img/background.png";
fg.src = "./src/img/ground.png";
topPipe.src = "./src/img/topPipe.png";
bottomPipe.src = "./src/img/bottomPipe.png";

const gap = 90;

// Creating of array
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0,
}

// In case of pushh button
document.addEventListener('keydown', moveUp);

function moveUp() {
    yPos -= 23;
}

// Position of bird
let xPos = 10;
let yPos = 150;
let gravity = 1.5;
let score = 0;

// Audio file
let score_audio = new Audio();
score_audio.src = "./src/audio/score.mp3";

function render() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(topPipe, pipe[i].x, pipe[i].y);
        ctx.drawImage(bottomPipe, pipe[i].x, pipe[i].y + topPipe.height + gap);

        pipe[i].x--;

        if(pipe[i].x === 120) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * topPipe.height) - topPipe.height
            });
        }

        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + topPipe.width && (xPos <= pipe[i].y + topPipe.height 
            || yPos + bird.height >= pipe[i].y + topPipe.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // Reload of page
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play()
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score is:" + score, 10, cvs.height - 20);
    requestAnimationFrame(render);
}

bottomPipe.onload = render;