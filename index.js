var THREE = require('three');

var renderer = require('./src/renderer');
var scene    = require('./src/scene');
var camera   = require('./src/camera');
var loader   = require('./src/loader');

/* append renderer into DOM */
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* setup camera */
camera.position.set( 0, 100, 250 );

/* load resource */
loader.load(
  'models/matilda/scene.gltf',
  function ( gltf ) {
    scene.add( gltf.scene );

    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
    gltf.asset;
  },
  function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  function ( error ) {

    console.log( 'An error happened' );

  }
)


function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();
