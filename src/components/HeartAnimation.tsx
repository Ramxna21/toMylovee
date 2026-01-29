import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function HeartAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      5000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true
    });

    const heartPath = new Path2D();
    const heartSVG = "M300,107.77C284.68,55.67,239.76,0,162.31,0,64.83,0,0,82.08,0,171.71c0,.48,0,.95,0,1.43-.52,19.5,0,217.94,299.87,379.69v0l0,0,.05,0,0,0,0,0v0C600,391.08,600.48,192.64,600,173.14c0-.48,0-.95,0-1.43C600,82.08,535.17,0,437.69,0,360.24,0,315.32,55.67,300,107.77";

    const vertices: THREE.Vector3[] = [];
    const points = samplePathPoints(600, 552);

    points.forEach((point, i) => {
      const vector = new THREE.Vector3(point.x, -point.y, 0);
      vector.x += (Math.random() - 0.5) * 30;
      vector.y += (Math.random() - 0.5) * 30;
      vector.z += (Math.random() - 0.5) * 70;
      vertices.push(vector);

      tl.from(vector, {
        x: 600 / 2,
        y: -552 / 2,
        z: 0,
        ease: "power2.inOut",
        duration: 2 + Math.random() * 3
      }, i * 0.002);
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
    const material = new THREE.PointsMaterial({
      color: 0xee5282,
      blending: THREE.AdditiveBlending,
      size: 3
    });
    const particles = new THREE.Points(geometry, material);
    particles.position.x -= 600 / 2;
    particles.position.y += 552 / 2;
    scene.add(particles);

    gsap.fromTo(scene.rotation, {
      y: -0.2
    }, {
      y: 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      duration: 3
    });

    let animationId: number;
    function render() {
      animationId = requestAnimationFrame(render);
      geometry.setFromPoints(vertices);
      renderer.render(scene, camera);
    }

    function onWindowResize() {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
    window.addEventListener("resize", onWindowResize);

    render();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      cancelAnimationFrame(animationId);
      if (renderer.domElement && containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  function samplePathPoints(width: number, height: number): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    const numPoints = 5000;

    for (let i = 0; i < numPoints; i++) {
      const t = i / numPoints;
      const angle = t * Math.PI * 2;

      const x = width / 2 + (16 * Math.pow(Math.sin(angle), 3)) * 15;
      const y = height / 2 - (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * 15;

      points.push({ x, y });
    }

    return points;
  }

  return <div ref={containerRef} className="heart-animation-container" />;
}
