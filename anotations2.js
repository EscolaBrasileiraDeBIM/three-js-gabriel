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

    loader.load('./police_station.glb',
    
    (gltf) => {
        scene.add(gltf.scene);
        loadingScreen.classList.add('hidden');
    },
    
    (progress) => {
        console.log(progress);
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
    renderer.setClearColor(0x3E3E3E, 1)

    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 0.5);
    const baseLight = new AmbientLight(0xffffff, 1);
    scene.add(light, baseLight);


    window.addEventListener("resize", () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
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

    function animate() {
        const delta = clock.getDelta();
	    cameraControls.update( delta );

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();