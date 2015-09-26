var materials = [];
var map = {};
var fov = 75;

function gameWindow(scale) {
    this.width = 320*scale;
    this.height = 224*scale;
    this.aspect = this.width/this.height;
}
var game = new gameWindow(2);
game.states = [
    // Menu
    {},
    // Game
    {}
];

game.scene = new THREE.Scene();
game.camera = new THREE.PerspectiveCamera(fov, game.aspect, 0.1, 1000);
game.renderer = new THREE.WebGLRenderer();

game.states[1].setup = function() {
    // Initialise materials
    while(materials.length) {
	materials.pop();
    }
    // Yellow
    materials.push(new THREE.MeshBasicMaterial({color: 0xffff00}));
    // Light Green
    materials.push(new THREE.MeshBasicMaterial({color: 0x00ff00}));
    // Dark Green
    materials.push(new THREE.MeshBasicMaterial({color: 0x606f5b}));
    // Light Grey
    materials.push(new THREE.MeshBasicMaterial({color: 0x666666}));
    // Dark Grey
    materials.push(new THREE.MeshBasicMaterial({color: 0x262626}));
    // Dark Brown
    materials.push(new THREE.MeshBasicMaterial({color: 0x2e1d1d}));

    // Initialise map
    map.length = 50;
    map.width = 30;

    // Position camera
    game.camera.position.z = 40;
    game.camera.position.y = 20;
    game.camera.position.x = map.length/2;
    game.camera.rotation.x = -45;
};

game.states[1].update = function() {
};

game.states[1].render = function() {
    game.renderer.render(game.scene, game.camera);
};

game.renderer.setSize(game.width, game.height);
document.body.appendChild(game.renderer.domElement);

function frame() {
    game.state.update();
    game.state.render();
    requestAnimationFrame(frame);
}
game.state = game.states[1];
game.state.setup();
frame();
