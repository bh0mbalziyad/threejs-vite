import "src/app.css";
import * as T from "three";
import gsap from "gsap";
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene

const scene = new T.Scene();

// Objects
const group = new T.Group();
scene.add(group);

const cube = new T.Mesh(
  // A uniform sized box i.e. a cube
  new T.BoxGeometry(1, 1, 1),
  // Material for the box
  new T.MeshBasicMaterial({ color: 0xff4646 })
);

cube.position.x = 1;

group.add(cube);

// AxesHelper
const axesHelper = new T.AxesHelper(2);
scene.add(axesHelper);

const sizes = {
  width: 800,
  height: 600,
};

// Camera

const camera = new T.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 4);
scene.add(camera);

const rdr = new T.WebGLRenderer({
  canvas,
});

// Render the scene

rdr.setSize(sizes.width, sizes.height);
rdr.render(scene, camera);

// GSAP Stuff

/*

takes two params

first - the object to modify
second - the property on the object which is to be updated along with options like delay, duration etc.

*/

gsap.to(cube.position, { x: 2, duration: 1, delay: 1 });
gsap.to(cube.position, { x: 0, duration: 1, delay: 2 });

// Animation loop

function tick() {
  rdr.render(scene, camera);
  // Provide callback to invoke on next frame
  window.requestAnimationFrame(tick);
}

// Start animation loop
tick();
