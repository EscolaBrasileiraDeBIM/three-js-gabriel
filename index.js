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

    const boxGeometry = new BoxGeometry(0.5, 0.5, 0.5);

    const greenMaterial = new MeshPhongMaterial({
            color: 'green',
            specular: 'white',
            shininess: 100,
            flatShading: true,
        });   

    const greenCube = new Mesh(boxGeometry, greenMaterial);
    scene.add(greenCube);

    
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

    cameraControls.setLookAt(3, 4, 2, 0, 0, 0);

    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const previousSelection = {
        geometry: null,
        material: null
    }

    const highLightMat = new MeshPhongMaterial({color: 'red'});

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX / canvas.clientHeight * 2 - 1;
        mouse.y = - ( event.clientY / canvas.clientHeight ) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersection = raycaster.intersectObject(greenCube);
        const hasCollided = intersection.length !== 0;

        if(!hasCollided) {
            if(previousSelection.mesh) {
                previousSelection.mesh.material = previousSelection.material;
                previousSelection.material = null;
                previousSelection.geometry = null;
            }
            return;
        }

        const first = intersection[0];
        const isPreviousSelection = previousSelection.mesh === first.object;

        if(isPreviousSelection) return;

        if(previousSelection.mesh) {
            previousSelection.mesh.material = previousSelection.material;
            previousSelection.material = null;
            previousSelection.geometry = null;
        }

        previousSelection.geometry = greenCube;
        previousSelection.material = greenCube.material;
        greenCube.material = highLightMat;
        console.log(intersection);
    })

    function animate() {
        const delta = clock.getDelta();
	    cameraControls.update( delta );

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();