var THREE = require('three');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0xfca503, linewidth: 4 } );
var cube = new THREE.Mesh( geometry, material );

var geo = new THREE.EdgesGeometry( geometry );
var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 100 } );
var wireframe = new THREE.LineSegments( geo, mat );
wireframe.renderOrder = 1;

scene.add( cube );
scene.add( wireframe );

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  wireframe.rotation.x += 0.01;
  wireframe.rotation.y += 0.01;
  renderer.render( scene, camera );
}
animate();
