var THREE = require('three');

var renderer = require('./src/renderer');
var scene    = require('./src/scene');
var camera   = require('./src/camera');

/* append renderer into DOM */
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* setup camera */
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

var material = new THREE.LineBasicMaterial( { color: 0xff00ff } );

var points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, -10, 0 ) );
points.push( new THREE.Vector3( 20, -10, 0 ) );

var geometry = new THREE.BufferGeometry().setFromPoints( points );
var line     = new THREE.Line( geometry, material );

scene.add( line );

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();
