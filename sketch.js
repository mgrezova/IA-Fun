let angle = 0;
let circles = [];

function setup() {
    let canvas = createCanvas(7680, 742, WEBGL);
    canvas.parent('canvas-container');
    
    // Create large circles (grayscale)
    for (let i = 0; i < 15; i++) {
        let grayValue = random(100, 200);
        circles.push({
            size: random(80, 150),
            distance: random(200, 300),
            height: random(-150, 150),
            color: color(grayValue, grayValue, grayValue, 200),
            rotationSpeed: random(0.01, 0.02)
        });
    }
    
    // Create small circles (grayscale)
    for (let i = 0; i < 30; i++) {
        let grayValue = random(150, 255);
        circles.push({
            size: random(20, 40),
            distance: random(100, 400),
            height: random(-200, 200),
            color: color(grayValue, grayValue, grayValue, 180),
            rotationSpeed: random(0.02, 0.04)
        });
    }
}

function draw() {
    background(20);  // Dark gray background
    
    // Add lighting
    ambientLight(60);
    pointLight(255, 255, 255, 0, 0, 300);
    
    // Control rotation with mouse X position
    let rotationSpeed = (mouseX - width/2) * 0.0002;
    angle += rotationSpeed;
    
    // Draw all circles
    for (let i = 0; i < circles.length; i++) {
        push();
        
        // Calculate position on the circular path
        let x = cos(angle + i * (TWO_PI / circles.length)) * circles[i].distance;
        let z = sin(angle + i * (TWO_PI / circles.length)) * circles[i].distance;
        
        translate(x, circles[i].height, z);
        rotateY(-angle - i * (TWO_PI / circles.length));
        
        // Set material properties
        fill(circles[i].color);
        noStroke();
        
        // Draw sphere instead of flat circle for 3D effect
        sphere(circles[i].size / 2);
        
        pop();
    }
}

function windowResized() {
    resizeCanvas(7680, 742);
} 