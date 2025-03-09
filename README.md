# Cosmic Explorer - Interactive 3D Solar System

An interactive 3D visualization of our solar system built with Three.js. Explore the planets, learn interesting facts, and enjoy an immersive space experience!

## Features

- Realistic 3D models of all planets in our solar system
- Interactive controls for exploring the space
- Detailed information and statistics for each celestial body
- Beautiful space ambiance with background music
- Responsive design that works on all devices
- Smooth animations and transitions
- Fullscreen mode support

## Setup Instructions

1. Download the required texture files:
   - Create a `textures` directory in the project root
   - Download the following texture files and place them in the `textures` directory:
     - sun.jpg
     - mercury.jpg
     - venus.jpg
     - earth.jpg
     - mars.jpg
     - jupiter.jpg
     - saturn.jpg
     - uranus.jpg
     - neptune.jpg

2. Download the background music:
   - Create an `audio` directory in the project root
   - Add an ambient space music file named `ambient-space.mp3`

3. Serve the project using a local web server:
   - You can use Python's built-in server: `python -m http.server`
   - Or use any other local development server

4. Open your browser and navigate to `http://localhost:8000`

## Controls

- Left click + drag: Rotate the view
- Right click + drag: Pan the view
- Scroll: Zoom in/out
- Click on any planet: Focus on it and show information
- Use the control panel to:
  - Adjust simulation speed
  - Select specific planets
  - Toggle information panel
  - Toggle audio
  - Toggle fullscreen mode

## Technologies Used

- Three.js for 3D rendering
- GSAP for animations
- HTML5 Audio for background music
- CSS3 for styling and animations
- Vanilla JavaScript for interactivity

## Browser Compatibility

The application works best in modern browsers that support WebGL:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Credits

Planet textures sourced from NASA's public domain images.

## License

MIT License - Feel free to use this project for learning or as a base for your own solar system visualization! 