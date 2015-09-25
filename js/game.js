var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var MiningObj = new THREE.SphereGeometry(1, 6, 6);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var material1 = new THREE.MeshBasicMaterial({ color: 0x666666 });
var material2 = new THREE.MeshBasicMaterial({ color: 0xd3d3d3 });
var material3 = new THREE.MeshBasicMaterial({ color: 0x262626 });
var cube = new THREE.Mesh(MiningObj, material);

var maplength = 30;
var mapwidth = 40;
scene.add(cube);

var hemiLight = new THREE.HemisphereLight(0xaabbff, 0x040404, 0.3);

// Treasure position
cube.position.set(Math.floor((Math.random() * maplength) + 1) -1, 1, Math.floor((Math.random() * mapwidth) + 1)-1);
if(cube.position.x == 0){
    cube.position.x++;
}

if(cube.position.z == 0){
    cube.position.z++;
}

if(cube.position.x == maplength - 1){
    cube.position.x--;
}

if(cube.position.z == mapwidth - 1){
    cube.position.z--;
}

//Obstacle generation
for (var J = 0; J < 12; J++) {
    var obstacle = new THREE.Mesh(geometry, material2);
    obstacle.position.set(Math.floor((Math.random() * maplength) + 1) -1, 1, Math.floor((Math.random() * mapwidth) + 1)-1);

    if (obstacle.position.z == cube.position.z && obstacle.position.x == cube.position.x) {
	obstacle.position.z++;
    }
    
    if(obstacle.position.x == 0) {
	obstacle.position.x++;
    }
    
    if(obstacle.position.z == 0) {
	obstacle.position.z++;
    }
    
    if(obstacle.position.x == maplength - 1) {
	obstacle.position.x--;
    }
    
    if(obstacle.position.z == mapwidth - 1) {
	obstacle.position.z--;
    }
    
    scene.add(obstacle);
}

// Map creation
for (var x = 0; x < maplength; x++) {
    for (z = 0; z < mapwidth; z++) {
	var cube1 = new THREE.Mesh( geometry, material1 );
	scene.add( cube1 );
	cube1.position.set(x,0,z);
    }
}

// Map border creation
for (var x = 0; x < maplength; x++) {
    for (z = 0; z < mapwidth; z++) {
	var cube1 = new THREE.Mesh( geometry, material3 );
	if(x == 0 || z == 0 || x == maplength - 1 || z == mapwidth - 1){
	    scene.add( cube1 );
	    cube1.position.set(x,1,z);
	}
    }
}

camera.position.z = 40;
camera.position.y = 20;
camera.position.x = x/2;
camera.rotation.x = -45;

var render = function () {
    requestAnimationFrame(render);

    //cube.rotation.x += 0.1;
    //cube.rotation.y += 0.1;

    renderer.render(scene, camera);
};

render();
