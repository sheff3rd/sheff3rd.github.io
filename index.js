import * as THREE from 'three';

var renderer = require('./src/renderer');
var scene    = require('./src/scene');
var camera   = require('./src/camera');
var loader   = require('./src/loader');
var light    = require('./src/light');

/* append renderer into DOM */
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* setup camera */
camera.position.set( 0, 100, 250 );

/* load resource */
var model;

loader.load(
  'models/matilda/scene.gltf',
  function ( gltf ) {
    model = gltf.scene;
    scene.add( model );

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

/* setup light */
light.position.set(-1, 102, 254);
scene.add( light );


function animate() {
  requestAnimationFrame( animate );

  if (model) model.rotation.y += 0.01;

  renderer.render( scene, camera );
}
animate();
