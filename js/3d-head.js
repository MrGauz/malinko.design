let scene, camera, renderer, model;

function init() {
    // Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, headContainer.offsetWidth / headContainer.offsetHeight, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(headContainer.offsetWidth, headContainer.offsetHeight);
    document.getElementById('3d-head').appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2).normalize();
    scene.add(light);

    // Load .obj & .mtl
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('/media/talking-head/head.mtl', (materials) => {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('/media/talking-head/head.obj', (object) => {
            model = object;
            model.scale.set(8.3, 8.3, 8.3);
            model.position.y = -3.6;
            model.rotation.x = 0.3;
            scene.add(model);
        });
    });

    // Mouse move handler
    window.addEventListener('mousemove', onMouseMove);

    animate();
}

function onMouseMove(event) {
    if (!model) return;
    const rect = renderer.domElement.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width;
    const mouseY = (event.clientY - rect.top) / rect.height;

    // Map mouse to small rotation range
    const minRotateX = -0.18;
    const maxRotateX = 0.4;
    model.rotation.y = Math.max(-0.55, Math.min(0.55, (mouseX - 0.5) * 1.2)); // Left-right
    model.rotation.x = Math.max(minRotateX, Math.min(maxRotateX, (mouseY - 0.5) * 0.6)); // Up-down
    const rotationFactor = ((model.rotation.x - minRotateX) / (maxRotateX - minRotateX));

    // Scale based on vertical rotation (inversely proportional)
    const minScale = 7.7;
    const maxScale = 9.5;
    let scale = maxScale - (maxScale - minScale) * rotationFactor;
    model.scale.set(scale, scale, scale);

    // Go up & down based on vertical rotation (directly proportional)
    const minY = -4;
    const maxY = -3.4;
    model.position.y = minY + (maxY - minY) * rotationFactor;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

const headContainer = document.getElementById('3d-head');
if (headContainer) init();