import * as THREE from 'three';

var canvas = document.createElement( 'canvas' );
var context = canvas.getContext( 'webgl2', { alpha: false } );
var renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );

module.exports = renderer;
