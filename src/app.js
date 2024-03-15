import "src/app.css";
import * as T from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene

const scene = new T.Scene();

// Objects
const group = new T.Group();
scene.add(group);

const cube1 = new T.Mesh(
  new T.BoxGeometry(1, 1, 1),
  new T.MeshBasicMaterial({ color: 0xd6d6d6 })
);

const cube2 = new T.Mesh(
  new T.BoxGeometry(1, 1, 1),
  new T.MeshBasicMaterial({ color: 0xff4646 })
);

cube1.position.x = 1;
cube2.position.x = -1;

group.add(cube1);
group.add(cube2);

group.position.y = -1;
group.scale.x = 2;
group.scale.y = 2;
group.rotation.x = -0.2;

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

rdr.setSize(sizes.width, sizes.height);
rdr.render(scene, camera);
