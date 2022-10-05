import {
    BoxGeometry,
    Scene,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer
} from 'three';

const scene = new Scene();

const geometry = new BoxGeometry(0.5, 0.5, 0.5);

const orangeMaterial = new MeshBasicMaterial({color: 'orange'});
const blueMaterial = new MeshBasicMaterial({color: 'blue'});
const greenMaterial = new MeshBasicMaterial({color: 'green'});

const orangeCube = new Mesh(geometry, orangeMaterial);
scene.add(orangeCube);

const bigBlueCube = new Mesh(geometry, blueMaterial);
bigBlueCube.position.x += 2;
bigBlueCube.scale.set(2,2,2);
scene.add(bigBlueCube);

const greenCube = new Mesh(geometry, greenMaterial);
greenCube.position.x -= 2;
scene.add(greenCube);

const sizes = {
    width: 800,
    height: 600
}

const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);


const canvas = document.getElementById('three-canvas');
const render = new WebGLRenderer({canvas});
render.setSize(sizes.width, sizes.height);
render.render(scene, camera);


function animate(){
    orangeCube.rotation.x += 0.01;
    orangeCube.rotation.z += 0.01;

    bigBlueCube.rotation.x -= 0.02;
    bigBlueCube.rotation.z -= 0.02;

    greenCube.rotation.x += 0.005;
    greenCube.rotation.z += 0.005;

    render.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

