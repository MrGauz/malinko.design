let scene, camera, renderer, model;

const headContainer = document.getElementById("3d-head");

// 3D model parameters
let minRotateX, targetRotationX, maxRotateX;
let targetRotationY = 0;
let minScale, targetScale, maxScale;
let minY, targetY, maxY;


// Initial values
if (window.innerWidth < 1024) {
    // Mobile or small screen settings
    minRotateX = -0.18;
    targetRotationX = 0.3;
    maxRotateX = 0.4;

    minScale = 6.5;
    targetScale = 6.8;
    maxScale = 7.6;

    minY = -3.5;
    targetY = -3;
    maxY = -2.8;
} else {
    // Desktop or larger screen settings
    minRotateX = -0.18;
    targetRotationX = 0.3;
    maxRotateX = 0.4;

    minScale = 7.7;
    targetScale = 8.3;
    maxScale = 9.5;

    minY = -4;
    targetY = -3.6;
    maxY = -3.4;
}

function init() {
    // Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, headContainer.offsetWidth / headContainer.offsetHeight, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(headContainer.offsetWidth, headContainer.offsetHeight);
    headContainer.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2).normalize();
    scene.add(light);

    // Load .obj & .mtl
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("/media/talking-head/head.mtl", (materials) => {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load("/media/talking-head/head.obj", (object) => {
            model = object;
            model.scale.set(targetScale, targetScale, targetScale);
            model.position.y = targetY;
            model.rotation.x = targetRotationX;
            scene.add(model);
            document.getElementById("head-loading")?.classList.add("d-none");
        });
    });

    // Mouse move handler
    window.addEventListener("mousemove", onMouseMove);

    animate();
}

function onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width;
    const mouseY = (event.clientY - rect.top) / rect.height;

    // Map mouse to a small rotation range
    targetRotationY = Math.max(-0.55, Math.min(0.55, (mouseX - 0.5) * 1.2)); // Left-right
    targetRotationX = Math.max(minRotateX, Math.min(maxRotateX, (mouseY - 0.5) * 0.6)); // Up-down
    const rotationFactor = ((targetRotationX - minRotateX) / (maxRotateX - minRotateX));

    // Scale based on vertical rotation (inversely proportional)
    targetScale = maxScale - (maxScale - minScale) * rotationFactor;

    // Go up & down based on vertical rotation (directly proportional)
    targetY = minY + (maxY - minY) * rotationFactor;
}

function interpolate(a, b, t) {
    // Linear interpolation to change values smoothly
    return a + (b - a) * t;
}

function animate() {
    requestAnimationFrame(animate);
    if (model) {
        const movementFactor = 0.05;
        model.rotation.x = interpolate(model.rotation.x, targetRotationX, movementFactor);
        model.rotation.y = interpolate(model.rotation.y, targetRotationY, movementFactor);
        model.scale.set(
            interpolate(model.scale.x, targetScale, movementFactor),
            interpolate(model.scale.y, targetScale, movementFactor),
            interpolate(model.scale.z, targetScale, movementFactor)
        );
        model.position.y = interpolate(model.position.y, targetY, movementFactor);
    }
    renderer.render(scene, camera);
}

if (headContainer) init();
