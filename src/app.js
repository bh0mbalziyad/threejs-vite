import "src/app.css";
import * as T from "three";

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

const clock = new T.Clock();

// Animation loop

function tick() {
  // Frame rate hack
  const elapsedTime = clock.getElapsedTime();

  camera.position.x = Math.cos(elapsedTime);
  camera.position.y = Math.sin(elapsedTime);

  camera.lookAt(cube.position);

  rdr.render(scene, camera);

  // Provide callback to invoke on next frame
  window.requestAnimationFrame(tick);
}

// Start animation loop
tick();
