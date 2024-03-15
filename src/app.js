import "src/app.css";
import * as T from "three";
// eslint-disable-next-line no-unused-vars
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
console.log(OrbitControls);
//
// Cursor
//

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;

  // console.log(cursor.x, cursor.y);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene

const scene = new T.Scene();

// Objects
const group = new T.Group();
scene.add(group);

const cube = new T.Mesh(
  // A uniform sized box i.e. a cube
  new T.BoxGeometry(1, 1, 1, 5, 5, 5),
  // Material for the box
  new T.MeshBasicMaterial({ color: 0xff4646 })
);

group.add(cube);

// AxesHelper
// const axesHelper = new T.AxesHelper(2);
// scene.add(axesHelper);

const sizes = {
  width: 800,
  height: 600,
};

// Perspective Camera

// fov
// aspect ratio
// near - any object closer than near wont show up
// far - any object further than far wont show up
const camera = new T.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

// Orthographic Camera

// left
// right
// top
// bottom

// we multiply the left and right values
// by the aspect ratio because our canvas is a rectangle
// which causes the square cube to shrink in the x-axis to fit
// the scene

// modifying our camera this way enables us to have more room in the scene
// on the x axis

// const aspectRatio = sizes.width / sizes.height;
// const camera = new T.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

camera.position.set(0, 0, 3);
camera.lookAt(cube.position);
scene.add(camera);

// Controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

const rdr = new T.WebGLRenderer({
  canvas,
});

// Render the scene

rdr.setSize(sizes.width, sizes.height);
rdr.render(scene, camera);

// Animation loop

function tick() {
  // const elapsedTime = clock.getElapsedTime();
  // cube.rotation.y = elapsedTime;

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;

  // camera.lookAt(cube.position);

  // Update Controls
  controls.update();

  rdr.render(scene, camera);
  // Provide callback to invoke on next frame
  window.requestAnimationFrame(tick);
}

// Start animation loop
tick();
