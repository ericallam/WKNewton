function Rope(x, y, length) {
    Newton.Body.call(this);   // call Body's constructor
    
    var segmentLength = 10;
    var segments = length / segmentLength;
    var prev, current;
    
    for (var i = 0; i < segments; i++) {
        // add some randomness for a nice sway
        current = this.add(Newton.Particle(x + Math.random() * 20 - 10, y));
        if (!prev) this.head = current;
        else {
            this.add(Newton.RopeConstraint(prev, current, {
                                           length: segmentLength,
                                           stiffness: 0.9,         // slightly springy
                                           strength: 3             // break when stretched to 3x length
                                           } ));
        }
        prev = current;
    }
}

Rope.prototype = Object.create(Newton.Body.prototype);  // extend Body's prototype

var display = document.getElementById('display');
var renderer = Newton.GLRenderer(display);
var sim = Newton.Simulator({
                           solve: [ Newton.PinConstraint, Newton.BoxConstraint, Newton.RopeConstraint ]
                           });

var gravity = Newton.LinearForce(6, Math.PI * 1.5);
var container = Newton.BoxConstraint(0, 0, 400, 400);
var rope1 = new Rope(150, 50, 150);
var rope2 = new Rope(250, 50, 250);

sim.add(rope1);
sim.add(rope2);
sim.add(Newton.PinConstraint(rope1.head));    // Pin one end of the rope
sim.add(Newton.PinConstraint(rope2.head));
sim.add(gravity);
sim.add(container);

var mousePin = null;

renderer.on('pointerdown', function(point) {
            var particle = sim.findNearest(point, 30);
            if (particle) mousePin = sim.add(Newton.PinConstraint(particle, point));
            });

renderer.on('pointermove', function(point) {
            if (mousePin) mousePin.setPosition(point);
            });

renderer.on('pointerup', function(point) {
            if (!mousePin) return;
            sim.remove(mousePin);
            mousePin = null;
            });

renderer.render(sim);
sim.start();

