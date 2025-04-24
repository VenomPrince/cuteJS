// Three.js 3D Scene Setup
let scene, camera, renderer, character, mixer, clock;

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9f3ff);
    scene.fog = new THREE.FogExp2(0xf9f3ff, 0.002);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('hero-3d-container').appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Add hemisphere light for cute color effect
    const hemisphereLight = new THREE.HemisphereLight(0xff9ff3, 0x48dbfb, 0.4);
    scene.add(hemisphereLight);

    // Clock for animations
    clock = new THREE.Clock();

    // Load character model
    const loader = new THREE.GLTFLoader();
    loader.load(
        'models/chibi-character.glb',
        function(gltf) {
            character = gltf.scene;
            character.scale.set(0.8, 0.8, 0.8);
            character.position.y = -1;
            
            // Set up animations
            mixer = new THREE.AnimationMixer(character);
            const clips = gltf.animations;
            
            if (clips && clips.length) {
                const idleClip = THREE.AnimationClip.findByName(clips, 'Idle');
                const action = mixer.clipAction(idleClip);
                action.play();
            }
            
            scene.add(character);
        },
        undefined,
        function(error) {
            console.error('Error loading model:', error);
        }
    );

    // Add floating islands or other cute elements
    addFloatingElements();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function addFloatingElements() {
    // Add cute floating islands
    const islandGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const islandMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf8a5c2,
        flatShading: true
    });
    
    const floatingIsland = new THREE.Mesh(islandGeometry, islandMaterial);
    floatingIsland.position.set(3, -2, -5);
    floatingIsland.rotation.x = Math.PI / 4;
    scene.add(floatingIsland);

    // Add clouds
    const cloudGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const cloudMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
    });

    for (let i = 0; i < 5; i++) {
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(
            Math.random() * 10 - 5,
            Math.random() * 3 - 1,
            Math.random() * -10 - 5
        );
        cloud.scale.setScalar(Math.random() * 0.8 + 0.5);
        scene.add(cloud);
    }

    // Add sakura petals
    const petalGeometry = new THREE.PlaneGeometry(0.1, 0.1);
    const petalMaterial = new THREE.MeshStandardMaterial({
        color: 0xffb6c1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });

    for (let i = 0; i < 50; i++) {
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        petal.position.set(
            Math.random() * 20 - 10,
            Math.random() * 10 - 5,
            Math.random() * -20
        );
        petal.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        scene.add(petal);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Update animations
    if (mixer) {
        mixer.update(clock.getDelta());
    }
    
    // Rotate character slightly for cute effect
    if (character) {
        character.rotation.y += 0.002;
    }
    
    renderer.render(scene, camera);
}

// Initialize and start animation
initThreeJS();
animate();