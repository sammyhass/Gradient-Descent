let lr = 0.1;
let f = (x) => x*x
let f_d = (x) => 2*x
/*
y = 0.1x^2
dy/dx = 0.2x
*/
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

class Pointer {
	constructor() {
		this.x = random(-1000, 1000);
		this.y = f(this.x);
		this.radius = 10;
	}

	show() {
		noStroke();
		fill(255, 0, 0);
		ellipse(map(this.x, -1000, 1000, 0, width), map(this.y, 0, 100000, height-25, 0), this.radius*2);
	}

	step() {
		this.x -= lr * f_d(this.x);
		this.y = f(this.x);
	}	
}

let pointer;
let button;
let p;
let slider;
function setup() {
	p = createP();
	p1 = createP("Learning Rate: " + lr);
	pointer = new Pointer();
	p.html("MSE: "  + pointer.y);
	createCanvas(800, 600);
	slider = createSlider(0, 10.1, lr, 0.1);
	button = createButton("Reset");
	button.mousePressed(() => {
		pointer = new Pointer();
		loop();
	});
	stop = createButton("Stop");
	stop.mousePressed(noLoop)
}


function draw() {
	if (slider.value() !== lr) {
		lr = slider.value();
		p1.html("Learning Rate: " + lr);
	}
	background(0);
	beginShape();
	for (let i = -1000; i < 1000; i++) {
		strokeWeight(5);
		background(0);
		stroke(255);
		fill(0)
		vertex(map(i, -1000, 1000, 0, width), map(f(i), 0, 100000, height-25, 0));
	}
	endShape();

	frameRate(10);
	pointer.show();
	pointer.step();
	p.html("MSE : "  + pointer.y);
}