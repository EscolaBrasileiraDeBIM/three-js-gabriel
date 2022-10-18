import {
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer,
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils,
    Clock,
    MeshLambertMaterial,
    DirectionalLight,
    TextureLoader,
    MeshPhongMaterial,
    AmbientLight,
    SphereGeometry,
    AxesHelper,
    GridHelper,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments
} from 'three';

import CameraControls from 'camera-controls';
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import gsap from "gsap";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

    

    const canvas = document.getElementById("three-canvas");

    //1 The scene
    const scene = new Scene();
    
    const grid = new GridHelper();
    grid.material.depthTest = false;
    grid.renderOrder = -1;
    scene.add(grid);

    const axes = new AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 3;
    scene.add(axes);

    const loader = new GLTFLoader();

    const loadingScreen = document.getElementById("loader-container");
    const progressText = document.getElementById("progress-text");
    let policeStation;

    loader.load('./police_station.glb',
    
    (gltf) => {
        policeStation = gltf.scene
        scene.add(policeStation);
        loadingScreen.classList.add('hidden');
    },
    
    (progress) => {
        const progressPercent = progress.loaded / progress.total * 100;
        const formatted = Math.trunc(progressPercent);
        progressText.textContent = 'Loading: '+formatted+'%';
    },

    (error) => {
        console.log(error);
    });

    //3 The Camera
    const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight);
    // camera.position.x = 6;
    // camera.position.y = 4;
    // camera.position.z = 5; // Z let's you move backwards and forwards. X is sideways, Y is upward and do
    camera.lookAt(axes.position);
    scene.add(camera);
    
    //4 The Renderer
    const renderer = new WebGLRenderer({canvas});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setClearColor(0x3E3E3E, 1);

    const labelRender = new CSS2DRenderer();
    labelRender.setSize(canvas.clientWidth, canvas.clientHeight);
    labelRender.domElement.style.position = 'absolute';
    labelRender.domElement.style.pointerEvents = 'none';
    labelRender.domElement.style.top = '0';
    document.body.appendChild(labelRender.domElement);

    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 0.5);
    const baseLight = new AmbientLight(0xffffff, 1);
    scene.add(light, baseLight);


    window.addEventListener("resize", () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        labelRender.setSize(canvas.clientWidth, canvas.clientHeight);
    });



    const subsetOfTHREE = {
        MOUSE,
        Vector2,
        Vector3,
        Vector4,
        Quaternion,
        Matrix4,
        Spherical,
        Box3,
        Sphere,
        Raycaster,
        MathUtils: {
          DEG2RAD: MathUtils.DEG2RAD,
          clamp: MathUtils.clamp
        }
    };
    CameraControls.install( { THREE: subsetOfTHREE } );
    const clock = new Clock();
    const cameraControls = new CameraControls(camera, canvas);
    cameraControls.dollyToCursor = true;

    cameraControls.setLookAt(18, 20, 18, 0, 10, 0);

    const raycaster = new Raycaster();
    const mouse = new Vector2();



    window.addEventListener('dblclick', () => {
        mouse.x = event.clientX / canvas.clientWidth * 2 - 1;
        mouse.y = - (event.clientY / canvas.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(policeStation);

        if(!intersects.length) return;

        const collisionLocation = intersects[0].point;

        const message = window.prompt("Describe de issue:");

        const container = document.createElement('div');
        container.className = "label-container";

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "X";
        deleteButton.className = "delete-button hidden";
        container.appendChild(deleteButton);

        const label = document.createElement('p');
        label.textContent = message;
        label.classList.add('label');
        container.appendChild(label);

        const labelObject = new CSS2DObject(container);
        labelObject.position.copy(collisionLocation);
        scene.add(labelObject);

        deleteButton.onclick = () => {
            labelObject.removeFromParent();
            labelObject.element = null;
            container.remove();
        }

        container.onmouseenter = () => deleteButton.classList.remove('hidden');
        container.onmouseleave = () => deleteButton.classList.add('hidden');
    })

    function animate() {
        const delta = clock.getDelta();
	    cameraControls.update( delta );

        renderer.render(scene, camera);
        labelRender.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();