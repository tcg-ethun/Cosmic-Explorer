class UI {
    constructor() {
        this.infoPanel = document.getElementById('infoPanel');
        this.planetName = document.getElementById('planetName');
        this.planetInfo = document.getElementById('planetInfo');
        this.planetStats = document.getElementById('planetStats');
        this.funFacts = document.getElementById('funFacts');
        this.tooltip = document.getElementById('tooltip');
        
        // Wait for the solar system to be initialized
        this.waitForSolarSystem(() => {
            this.setupEventListeners();
            this.setupAudio();
        });
    }

    waitForSolarSystem(callback) {
        if (typeof solarSystem !== 'undefined' && solarSystem !== null) {
            callback();
        } else {
            setTimeout(() => this.waitForSolarSystem(callback), 100);
        }
    }

    setupEventListeners() {
        // Info panel toggle
        document.getElementById('infoToggle').addEventListener('click', () => {
            this.infoPanel.classList.toggle('active');
        });

        // Close panel button
        document.getElementById('closePanel').addEventListener('click', () => {
            this.infoPanel.classList.remove('active');
        });

        // Planet selector
        document.getElementById('planetSelect').addEventListener('change', (e) => {
            const planetKey = e.target.value;
            if (planetKey === 'overview') {
                solarSystem.resetView();
                this.updateInfoPanel('overview');
            } else {
                solarSystem.focusOnPlanet(planetKey);
                this.updateInfoPanel(planetKey);
            }
        });

        // Simulation speed control
        document.getElementById('simulationSpeed').addEventListener('input', (e) => {
            const speed = parseFloat(e.target.value) / 5;
            solarSystem.setSimulationSpeed(speed);
        });

        // Audio toggle
        document.getElementById('audioToggle').addEventListener('click', (e) => {
            const icon = e.currentTarget.querySelector('i');
            if (this.backgroundMusic.paused) {
                this.backgroundMusic.play();
                icon.className = 'fas fa-volume-up';
            } else {
                this.backgroundMusic.pause();
                icon.className = 'fas fa-volume-mute';
            }
        });

        // Fullscreen toggle
        document.getElementById('fullscreenToggle').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });

        // Raycaster for planet hovering and clicking
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let hoveredPlanet = null;

        document.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, solarSystem.camera);
            const intersects = raycaster.intersectObjects(Object.values(solarSystem.planets));

            if (intersects.length > 0) {
                const planet = intersects[0].object;
                const planetKey = Object.entries(solarSystem.planets).find(([_, p]) => p === planet)?.[0];
                
                if (planetKey && planetKey !== hoveredPlanet) {
                    hoveredPlanet = planetKey;
                    this.showTooltip(event, SOLAR_SYSTEM_DATA[planetKey].name);
                }
            } else if (hoveredPlanet) {
                hoveredPlanet = null;
                this.hideTooltip();
            }
        });

        document.addEventListener('click', (event) => {
            raycaster.setFromCamera(mouse, solarSystem.camera);
            const intersects = raycaster.intersectObjects(Object.values(solarSystem.planets));

            if (intersects.length > 0) {
                const planet = intersects[0].object;
                const planetKey = Object.entries(solarSystem.planets).find(([_, p]) => p === planet)?.[0];
                
                if (planetKey) {
                    solarSystem.focusOnPlanet(planetKey);
                    this.updateInfoPanel(planetKey);
                    this.infoPanel.classList.add('active');
                }
            }
        });
    }

    setupAudio() {
        this.backgroundMusic = new Audio('audio/ambient-space.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.3;
    }

    updateInfoPanel(planetKey) {
        if (planetKey === 'overview') {
            this.planetName.textContent = 'Solar System';
            this.planetInfo.innerHTML = `
                <p>Welcome to Cosmic Explorer! Click on any planet to learn more about it.</p>
                <p>Use your mouse to rotate the view, scroll to zoom, and drag to pan.</p>
            `;
            this.planetStats.innerHTML = '';
            this.funFacts.innerHTML = '';
            return;
        }

        const data = SOLAR_SYSTEM_DATA[planetKey];
        if (!data) return;

        this.planetName.textContent = data.name;
        this.planetInfo.innerHTML = `<p>Exploring ${data.name}...</p>`;

        // Update stats
        let statsHTML = '';
        Object.entries(data.stats).forEach(([key, value]) => {
            statsHTML += `
                <div class="stat-item">
                    <div class="stat-label">${key}</div>
                    <div class="stat-value">${value}</div>
                </div>
            `;
        });
        this.planetStats.innerHTML = statsHTML;

        // Update fun facts
        this.funFacts.innerHTML = `
            <h3>Fun Facts</h3>
            <ul>
                ${data.facts.map(fact => `<li>${fact}</li>`).join('')}
            </ul>
        `;
    }

    showTooltip(event, text) {
        this.tooltip.textContent = text;
        this.tooltip.style.left = `${event.clientX + 10}px`;
        this.tooltip.style.top = `${event.clientY + 10}px`;
        this.tooltip.style.opacity = '1';
    }

    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }
}

// Initialize UI when the page loads
window.addEventListener('load', () => {
    // Wait for Three.js and other dependencies to load
    setTimeout(() => {
        new UI();
    }, 500);
}); 