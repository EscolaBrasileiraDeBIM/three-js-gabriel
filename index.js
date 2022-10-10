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
    Clock
} from 'three';
import CameraControls from 'camera-controls';
    

    const canvas = document.getElementById("three-canvas");

    //1 The scene
    const scene = new Scene();

    //2 The Object
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
    
    //3 The Camera
    const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight);
    camera.position.z = 3; // Z let's you move backwards and forwards. X is sideways, Y is upward and do
    scene.add(camera);
    
    //4 The Renderer
    const renderer = new WebGLRenderer({canvas});

    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

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
        orangeCube.rotation.x += 0.01;
        orangeCube.rotation.z += 0.01;

        bigBlueCube.rotation.x -= 0.02;
        bigBlueCube.rotation.z -= 0.02;

        greenCube.rotation.x += 0.005;
        greenCube.rotation.z += 0.005;

        const delta = clock.getDelta();
	    cameraControls.update( delta );

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();

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
