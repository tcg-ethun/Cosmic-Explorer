const SOLAR_SYSTEM_DATA = {
    sun: {
        name: 'Sun',
        radius: 50,  // Size in our visualization
        realRadius: 696340,  // km
        emissive: true,
        facts: [
            'The Sun contains 99.86% of the mass in the Solar System',
            'The Sun\'s surface temperature is about 5,500°C',
            'Light from the Sun takes about 8 minutes to reach Earth'
        ],
        stats: {
            'Mass': '1.989 × 10^30 kg',
            'Radius': '696,340 km',
            'Surface Temp': '5,500°C',
            'Core Temp': '15 million °C'
        }
    },
    mercury: {
        name: 'Mercury',
        radius: 3.8,
        realRadius: 2439.7,
        orbitRadius: 80,
        orbitSpeed: 4.787,
        rotationSpeed: 0.017,
        facts: [
            'Mercury is the smallest planet in our Solar System',
            'Despite being closest to the Sun, Venus is actually hotter',
            'Mercury has no moons or rings'
        ],
        stats: {
            'Orbit Period': '88 days',
            'Surface Temp': '-180°C to 430°C',
            'Distance from Sun': '57.9M km',
            'Gravity': '3.7 m/s²'
        }
    },
    venus: {
        name: 'Venus',
        radius: 9.5,
        realRadius: 6051.8,
        orbitRadius: 110,
        orbitSpeed: 3.502,
        rotationSpeed: 0.004,
        facts: [
            'Venus rotates backwards compared to most planets',
            'It\'s the hottest planet in our Solar System',
            'Venus has no moons'
        ],
        stats: {
            'Orbit Period': '225 days',
            'Surface Temp': '462°C',
            'Distance from Sun': '108.2M km',
            'Gravity': '8.87 m/s²'
        }
    },
    earth: {
        name: 'Earth',
        radius: 10,
        realRadius: 6371,
        orbitRadius: 150,
        orbitSpeed: 2.978,
        rotationSpeed: 0.1,
        facts: [
            'Earth is the only known planet with liquid water on its surface',
            'Our planet\'s atmosphere protects us from meteorites and radiation',
            'Earth is the only planet not named after a god or goddess'
        ],
        stats: {
            'Orbit Period': '365.25 days',
            'Surface Temp': '15°C (average)',
            'Distance from Sun': '149.6M km',
            'Gravity': '9.81 m/s²'
        }
    },
    mars: {
        name: 'Mars',
        radius: 5.3,
        realRadius: 3389.5,
        orbitRadius: 190,
        orbitSpeed: 2.407,
        rotationSpeed: 0.097,
        facts: [
            'Mars is home to the largest volcano in the Solar System',
            'Mars has two moons: Phobos and Deimos',
            'The red color comes from iron oxide (rust) on its surface'
        ],
        stats: {
            'Orbit Period': '687 days',
            'Surface Temp': '-63°C (average)',
            'Distance from Sun': '227.9M km',
            'Gravity': '3.72 m/s²'
        }
    },
    jupiter: {
        name: 'Jupiter',
        radius: 30,
        realRadius: 69911,
        orbitRadius: 250,
        orbitSpeed: 1.307,
        rotationSpeed: 0.24,
        facts: [
            'Jupiter is the largest planet in our Solar System',
            'The Great Red Spot is a giant storm that\'s lasted for hundreds of years',
            'Jupiter has at least 79 moons'
        ],
        stats: {
            'Orbit Period': '11.86 years',
            'Surface Temp': '-110°C',
            'Distance from Sun': '778.5M km',
            'Gravity': '24.79 m/s²'
        }
    },
    saturn: {
        name: 'Saturn',
        radius: 25,
        realRadius: 58232,
        orbitRadius: 300,
        orbitSpeed: 0.969,
        rotationSpeed: 0.22,
        facts: [
            'Saturn\'s rings are made mostly of ice and rock',
            'It\'s the least dense planet in the Solar System',
            'Saturn has 82 confirmed moons'
        ],
        stats: {
            'Orbit Period': '29.46 years',
            'Surface Temp': '-140°C',
            'Distance from Sun': '1.434B km',
            'Gravity': '10.44 m/s²'
        }
    },
    uranus: {
        name: 'Uranus',
        radius: 15,
        realRadius: 25362,
        orbitRadius: 350,
        orbitSpeed: 0.681,
        rotationSpeed: 0.14,
        facts: [
            'Uranus rotates on its side',
            'It\'s the coldest planet in our Solar System',
            'Uranus has 27 known moons'
        ],
        stats: {
            'Orbit Period': '84 years',
            'Surface Temp': '-195°C',
            'Distance from Sun': '2.871B km',
            'Gravity': '8.69 m/s²'
        }
    },
    neptune: {
        name: 'Neptune',
        radius: 14,
        realRadius: 24622,
        orbitRadius: 400,
        orbitSpeed: 0.543,
        rotationSpeed: 0.15,
        facts: [
            'Neptune has the strongest winds in the Solar System',
            'It was the first planet discovered through mathematical predictions',
            'Neptune has 14 known moons'
        ],
        stats: {
            'Orbit Period': '164.79 years',
            'Surface Temp': '-200°C',
            'Distance from Sun': '4.495B km',
            'Gravity': '11.15 m/s²'
        }
    }
}; 