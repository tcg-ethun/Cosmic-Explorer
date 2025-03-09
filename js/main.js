class SolarSystem {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.controls = null;
        this.planets = {};
        this.orbits = {};
        this.textureLoader = new THREE.TextureLoader();
        this.clock = new THREE.Clock();
        this.simulationSpeed = 1;
        this.selectedPlanet = null;
        this.composer = null;
        
        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.5;
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);

        // Setup camera
        this.camera.position.set(0, 150, 400);
        this.camera.lookAt(0, 0, 0);

        // Setup controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 100;
        this.controls.maxDistance = 800;

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x333333);
        this.scene.add(ambientLight);

        // Add point light (Sun)
        const sunLight = new THREE.PointLight(0xffffff, 2, 1000, 1);
        sunLight.position.set(0, 0, 0);
        this.scene.add(sunLight);

        // Add hemisphere light for better overall illumination
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.2);
        this.scene.add(hemiLight);

        // Create starfield background
        this.createStarfield();

        // Create celestial bodies
        this.createCelestialBodies();

        // Setup post-processing
        this.setupPostProcessing();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // Start animation
        this.animate();
    }

    setupPostProcessing() {
        this.composer = new THREE.EffectComposer(this.renderer);
        
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        // Add bloom effect
        const bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,    // strength
            0.4,    // radius
            0.85    // threshold
        );
        this.composer.addPass(bloomPass);
    }

    createStarfield() {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 0.5,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        const starVertices = [];
        const starColors = [];
        for (let i = 0; i < 15000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);

            // Random star colors (white to slight blue)
            const r = 0.9 + Math.random() * 0.1;
            const g = 0.9 + Math.random() * 0.1;
            const b = 1.0;
            starColors.push(r, g, b);
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
        starMaterial.vertexColors = true;

        const stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(stars);
    }

    createCelestialBodies() {
        // Create Sun
        const sunGeometry = new THREE.SphereGeometry(SOLAR_SYSTEM_DATA.sun.radius, 64, 64);
        const sunMaterial = new THREE.MeshPhongMaterial({
            color: 0xffff00,
            emissive: 0xffaa00,
            emissiveIntensity: 0.7,
            shininess: 0
        });
        this.planets.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        
        // Add sun glow using a larger sphere
        const glowGeometry = new THREE.SphereGeometry(SOLAR_SYSTEM_DATA.sun.radius * 1.2, 64, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffaa00,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.planets.sun.add(glow);
        
        // Add additional outer glow
        const outerGlowGeometry = new THREE.SphereGeometry(SOLAR_SYSTEM_DATA.sun.radius * 1.5, 64, 64);
        const outerGlowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffaa00,
            transparent: true,
            opacity: 0.05,
            side: THREE.BackSide
        });
        const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
        this.planets.sun.add(outerGlow);
        
        this.scene.add(this.planets.sun);

        // Create planets with solid colors
        const planetColors = {
            mercury: 0x808080, // Gray
            venus: 0xffd700,   // Golden
            earth: 0x4169e1,   // Royal Blue
            mars: 0xff4500,    // Red-Orange
            jupiter: 0xdeb887,  // Burlywood
            saturn: 0xf4a460,  // Sandy Brown
            uranus: 0x40e0d0,  // Turquoise
            neptune: 0x0000cd  // Medium Blue
        };

        // Create planets
        Object.entries(SOLAR_SYSTEM_DATA).forEach(([key, data]) => {
            if (key === 'sun') return;

            // Create planet
            const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
            const material = new THREE.MeshStandardMaterial({
                color: planetColors[key],
                metalness: 0.1,
                roughness: 0.8
            });
            const planet = new THREE.Mesh(geometry, material);
            
            // Add atmosphere if it's Earth
            if (key === 'earth') {
                const atmosphereGeometry = new THREE.SphereGeometry(data.radius * 1.01, 32, 32);
                const atmosphereMaterial = new THREE.MeshPhongMaterial({
                    color: 0x88ff88,
                    transparent: true,
                    opacity: 0.1,
                    side: THREE.BackSide
                });
                const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
                planet.add(atmosphere);
            }
            
            // Create orbit
            const orbitGeometry = new THREE.BufferGeometry();
            const orbitPoints = [];
            const segments = 128;
            
            for (let i = 0; i <= segments; i++) {
                const theta = (i / segments) * Math.PI * 2;
                orbitPoints.push(
                    Math.cos(theta) * data.orbitRadius,
                    0,
                    Math.sin(theta) * data.orbitRadius
                );
            }
            
            orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
            const orbitMaterial = new THREE.LineBasicMaterial({ 
                color: 0x444444, 
                transparent: true, 
                opacity: 0.3,
                blending: THREE.AdditiveBlending
            });
            const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
            
            this.planets[key] = planet;
            this.orbits[key] = orbit;
            this.scene.add(planet);
            this.scene.add(orbit);
        });
    }

    updatePlanetPositions(deltaTime) {
        Object.entries(SOLAR_SYSTEM_DATA).forEach(([key, data]) => {
            if (key === 'sun') return;

            const planet = this.planets[key];
            if (!planet) return;

            // Update planet position
            const angle = this.clock.getElapsedTime() * data.orbitSpeed * this.simulationSpeed;
            planet.position.x = Math.cos(angle) * data.orbitRadius;
            planet.position.z = Math.sin(angle) * data.orbitRadius;

            // Update planet rotation
            planet.rotation.y += data.rotationSpeed * deltaTime * this.simulationSpeed;
        });

        // Rotate sun
        if (this.planets.sun) {
            this.planets.sun.rotation.y += 0.001 * this.simulationSpeed;
        }
    }

    setSimulationSpeed(speed) {
        this.simulationSpeed = speed;
    }

    focusOnPlanet(planetKey) {
        const planet = this.planets[planetKey];
        if (!planet) return;

        this.selectedPlanet = planetKey;
        
        const targetPosition = planet.position.clone();
        const distance = planetKey === 'sun' ? 150 : 50;
        
        targetPosition.add(new THREE.Vector3(distance, distance / 2, distance));
        
        gsap.to(this.camera.position, {
            duration: 2,
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
            onUpdate: () => this.camera.lookAt(planet.position)
        });
    }

    resetView() {
        this.selectedPlanet = null;
        gsap.to(this.camera.position, {
            duration: 2,
            x: 0,
            y: 150,
            z: 400,
            onUpdate: () => this.camera.lookAt(0, 0, 0)
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const deltaTime = this.clock.getDelta();
        this.updatePlanetPositions(deltaTime);
        this.controls.update();
        
        // Use composer instead of renderer
        this.composer.render();
    }
}

// Initialize the solar system when the page loads
let solarSystem;
window.addEventListener('load', () => {
    console.log('Page loaded, initializing solar system...');
    try {
        // Hide loading screen
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Initialize solar system immediately
        solarSystem = new SolarSystem();
        console.log('Solar system initialized successfully');
        
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    } catch (error) {
        console.error('Error initializing solar system:', error);
        document.getElementById('loadingText').textContent = 'Error initializing. Please check console and refresh.';
    }
}); 