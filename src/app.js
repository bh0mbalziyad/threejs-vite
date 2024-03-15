import "src/app.css";
import * as T from "three";
// eslint-disable-next-line no-unused-vars
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
const axesHelper = new T.AxesHelper(2);
scene.add(axesHelper);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update the camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer i.e updates the canvas
  rdr.setSize(sizes.width, sizes.height);
  rdr.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

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

camera.position.set(0, 0, 3);
camera.lookAt(cube.position);
scene.add(camera);

// Controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const rdr = new T.WebGLRenderer({
  canvas,
});

rdr.setSize(sizes.width, sizes.height);
rdr.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animation loop

function tick() {
  // Update Controls
  controls.update();

  rdr.render(scene, camera);
  // Provide callback to invoke on next frame
  window.requestAnimationFrame(tick);
}

// Start animation loop
tick();
