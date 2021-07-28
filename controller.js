const GAME_FONT_PATH = 'assets/game_over.ttf'
const FRAME_RATE = 20

let angle = 0;
let side_length = 30
let XSIZE = 20
let YSIZE = 20
let ZSIZE = 20
margin = 2

let re = 127;
let gr = 127;
let bl = 200;
let al = 5;
let c;
let re_select = 255;
let gr_select = 0;
let bl_select = 0;
let al_select = 255;
let c_select;

let bx = 0;
let by = 0;

let dx = 0;
let dy = 0;

let rotatex = 0;
let rotatey = 0;

let lastX = 0;
let lastY = 0;

let game_font;

let target_x=1;
let target_y=2;
let target_z=1;


let pg;
function preload() {
    game_font = loadFont(GAME_FONT_PATH);
}

function setup() {
    createCanvas(800, 800, WEBGL);
    frameRate(FRAME_RATE);

    side_length = height / XSIZE;
    c = color(re, gr, bl, al);
    c_select = color(re_select, gr_select, bl_select, al_select);
    
    pg = createGraphics(256,256);
    // Queremos extraer el cubo en la posicion 3,7,2
    //extract(3,7,2)
    // Esto genera una cascada de movimientos que permiten el desplazamiento del bloque?
    // Podemos precalcular el camino
    // Una restriccion podr'ia ser que solo pueda viajar de 1 bloque en 1 bloque
    // Otra que no pueda hacer diagonales
    // Eso nos simplifica el problema a una resta y movimientos secuenciales
    // Optimizaci'on: si hay otros movimientos en camino, podemos adaptarnos
}

function draw() {
    console.log('target',target_x,target_y,target_z);
    background(0)
    ortho(-800, 800, -800, 800, -800, 1800);
    push()
        pg.background(0)
        pg.textFont(game_font);
        pg.textSize(50)
        pg.fill(200, 0, 0);
        pg.text("mouse position: "+mouseX+' '+mouseY, 0, 50);
        translate(-750, -850, -1000)
        texture(pg);
        rect(0,0,1200,1200)
    pop()

    push()
    rotateX(rotatey)
    rotateY(-rotatex)
    rectMode(CENTER)

    normalMaterial();

    push()
    translate(-width / 2, -height / 2, -height / 2)



    push()
    fill(255, 255, 255)
    box(side_length - margin, side_length - margin, side_length - margin);
    pop()

    for (let x = 0; x < XSIZE; x++) {
        push()
        fill(0, 0, 255)
        translate(x * side_length, -100, -100);
        box(side_length - margin, side_length - margin, side_length - margin);
        pop()
        for (let y = 0; y < YSIZE; y++) {
            if (x === 0) {
                push()
                fill(0, 255, 0)
                translate(-100, y * side_length, -100);
                box(side_length - margin, side_length - margin, side_length - margin);
                pop()
            }
            for (let z = 0; z <= ZSIZE; z++) {
                if (x === 0) {
                    push()
                    fill(255, 0, 0)
                    translate(-100, -100, z * side_length);
                    box(side_length - margin, side_length - margin, side_length - margin);
                    pop()
                }
                    push();
                    if (x == target_x && y == target_y && z == target_z) {
                        fill(c_select);
                    } else {
                        fill(c);
                    }
                    translate(x * side_length, y * side_length, z * side_length);
                    box(side_length - margin, side_length - margin, side_length - margin);
                    pop();
                
            }
        }
    }
    pop();
    pop();
}

function mousePressed() {
    locked = true;
    xOffset = mouseX - bx;
    yOffset = mouseY - by;
}

function mouseDragged() {
    bx = mouseX - xOffset;
    by = mouseY - yOffset;

    if (locked) {
        factor = 10 / height;
        dx = factor * (bx - lastX);
        dy = factor * (by - lastY);
        rotatex += dx;
        rotatey += dy;
    }
    lastX = bx;
    lastY = by;
}

function mouseReleased() {
    locked = false;
}

function changeTarget(){
    target_x = document.getElementById('x').value;
    target_y = document.getElementById('y').value;
    target_z = document.getElementById('z').value;
    console.log('target',target_x,target_y,target_z);
}