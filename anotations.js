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
    

    const canvas = document.getElementById("three-canvas");

    //1 The scene
    const scene = new Scene();

    // const sphereGeometry = new SphereGeometry(0.5);

    // const sunMaterial = new MeshLambertMaterial({color: 'orange'});
    // const earthMaterial = new MeshLambertMaterial({color: 'blue'});    
    // const moonMaterial = new MeshLambertMaterial({color: 'white'});

    // const sun = new Mesh(sphereGeometry, sunMaterial);
    // scene.add(sun);

    // const earth = new Mesh(sphereGeometry, earthMaterial);
    // earth.scale.set(0.2,0.2,0.2);
    // earth.position.x += 5;
    // sun.add(earth);

    // const moon = new Mesh(sphereGeometry, moonMaterial);
    // moon.scale.set(0.1,0.1,0.1);
    // moon.position.x += 1;
    // earth.add(moon);

    //2 The Object
    // const boxGeometry = new BoxGeometry(0.5, 0.5, 0.5);

    // const loader = new TextureLoader();

    // const orangeMaterial = new MeshBasicMaterial({
    //     color: 'orange',
    //     map: loader.load("https://raw.githubusercontent.com/IFCjs/ifcjs-crash-course/main/static/logo.png")
    // });
    // const whiteMaterial = new MeshLambertMaterial({
    //     color: 'white',
    //     map: loader.load('./sample.jpg')
    // });
    // const greenMaterial = new MeshPhongMaterial({
    //     color: 'green',
    //     specular: 'white',
    //     shininess: 100,
    //     flatShading: true,
    // });    
    // const lineMaterial = new MeshBasicMaterial({
    //     color: 'white',
    //     polygonOffset: true,
    //     polygonOffsetFactor: 1,
    //     polygonOffsetUnits: 1
    // });

    const grid = new GridHelper();
    grid.material.depthTest = false;
    grid.renderOrder = -1;
    scene.add(grid);

    const axes = new AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 3;
    scene.add(axes);

    // const orangeCube = new Mesh(boxGeometry, orangeMaterial);
    // scene.add(orangeCube);

    // const bigWhiteCube = new Mesh(boxGeometry, whiteMaterial);
    // bigWhiteCube.position.x += 2;
    // bigWhiteCube.scale.set(2,2,2);
    // scene.add(bigWhiteCube);

    // const greenCube = new Mesh(boxGeometry, greenMaterial);
    // greenCube.position.x -= 2;
    // scene.add(greenCube);

    // const edgeGeo = new EdgesGeometry(boxGeometry);
    // const edgeMaterial = new LineBasicMaterial({color: 0x000000});
    // const wireFrame = new LineSegments(edgeGeo, edgeMaterial);
    // bigWhiteCube.add(wireFrame);
    
    //3 The Camera
    const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight);
    camera.position.x = 6;
    camera.position.y = 4;
    camera.position.z = 5; // Z let's you move backwards and forwards. X is sideways, Y is upward and do
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

    

    // const controls = new OrbitControls(camera, canvas);
    // controls.enableDamping = true;

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

    function animate() {
        // orangeCube.rotation.x += 0.01;
        // orangeCube.rotation.z += 0.01;

        // bigWhiteCube.rotation.x -= 0.02;
        // bigWhiteCube.rotation.z -= 0.02;

        // greenCube.rotation.x += 0.005;
        // greenCube.rotation.z += 0.005;

        // sun.rotation.y += 0.01;
        // earth.rotation.y += 0.02;

        const delta = clock.getDelta();
	    cameraControls.update( delta );

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();

    // const gui = new GUI();
    // const min = -3;
    // const max = 3;
    // const step = 0.01;

    // const tranformationFolder = gui.addFolder("Tranformation");

    // tranformationFolder.add(greenCube.position, 'y', min, max, step).name("Position Y");
    // tranformationFolder.add(greenCube.position, 'x', min, max, step).name("Position X");
    // tranformationFolder.add(greenCube.position, 'z', min, max, step).name("Position Z");
    // gui.addFolder("Visible").add(greenCube, 'visible');

    // const colorParam = {
    //     value: 0xff0000
    // }

    // gui.addColor(colorParam, "value").name("Color").onChange(() => {
    //     bigWhiteCube.material.color.set(colorParam.value);
    // })

    // const functionParam = {
    //     spin: () => {
    //         gsap.to(bigWhiteCube.rotation, {y: bigWhiteCube.rotation.y + 10, duration: 1});
    //     }
    // }

    // gui.add(functionParam, 'spin').name("Confirm");

    // window.addEventListener("mousemove", (event) => {
    //     const position = getMousePosition(event);
    //     camera.position.x = Math.sin(position.x * Math.PI * 2) * 2;
    //     camera.position.z = Math.cos(position.x * Math.PI * 2) * 2;
    //     camera.position.y = position.y * 3;
    //     camera.lookAt(orangeCube.position);
    // });

    // // The values will vary from -1 to +1
    // function getMousePosition(event) {
    //     const position = new Vector2();
    //     const bounds = canvas.getBoundingClientRect();
    //     position.x =((event.clientX - bounds.left) / (bounds.right - bounds.left)) * 2 - 1;
    //     position.y = -((event.clientY - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1;
    //     return position;
    // }
