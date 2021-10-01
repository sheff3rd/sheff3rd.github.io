var THREE = require('three');

const color = 0xFFFFFF;
const intensity = 20;
const light = new THREE.DirectionalLight(color, intensity);

module.exports = light;
