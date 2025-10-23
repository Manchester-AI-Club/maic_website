"use client"

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MaicPolygonAnimation() {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const particlesRef = useRef(null);
    const linesRef = useRef(null);
    const verticesRef = useRef(null);
    const particleDataRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationIdRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Initialize camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 50;
        cameraRef.current = camera;

        // Initialize renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 1);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create polygon vertices
        const vertexPositions = [];
        const particlesPerCluster = 40;
        const particleData = [];

        // Upper cluster
        for (let i = 0; i < particlesPerCluster; i++) {
            const angle = (i / particlesPerCluster) * Math.PI * 2;
            const radius = Math.random() * 8 + 5;
            const x = Math.cos(angle) * radius;
            const y = Math.random() * 50 -20;
            const z = Math.sin(angle) * radius;

            vertexPositions.push(x, y, z);
            particleData.push({
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                basePos: new THREE.Vector3(x, y, z)
            });
        }

        particleDataRef.current = particleData;

        // Create particles
        const particleGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array(vertexPositions);
        verticesRef.current = vertices;
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.8,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particlesRef.current = particles;
        scene.add(particles);

        // Function to create lines
        const createLines = () => {
            if (linesRef.current) {
                scene.remove(linesRef.current);
            }

            const lineGeometry = new THREE.BufferGeometry();
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0.3,
                blending: THREE.AdditiveBlending
            });

            const linePositions = [];
            const maxDistance = 15;
            const verts = verticesRef.current;

            for (let i = 0; i < verts.length; i += 3) {
                for (let j = i + 3; j < verts.length; j += 3) {
                    const dx = verts[i] - verts[j];
                    const dy = verts[i + 1] - verts[j + 1];
                    const dz = verts[i + 2] - verts[j + 2];
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (distance < maxDistance) {
                        linePositions.push(verts[i], verts[i + 1], verts[i + 2]);
                        linePositions.push(verts[j], verts[j + 1], verts[j + 2]);
                    }
                }
            }

            lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
            const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
            linesRef.current = lines;
            scene.add(lines);
        };

        createLines();

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        // Window resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        // Animation loop
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);

            const time = Date.now() * 0.001;
            const vertices = verticesRef.current;
            const particleData = particleDataRef.current;
            const mouse = mouseRef.current;

            // Animate particles
            for (let i = 0; i < particleData.length; i++) {
                const i3 = i * 3;
                const data = particleData[i];

                // Apply velocity
                vertices[i3] += data.velocity.x;
                vertices[i3 + 1] += data.velocity.y;
                vertices[i3 + 2] += data.velocity.z;

                // Pull back to base position with wave motion
                const waveOffset = Math.sin(time + i * 0.1) * 2;
                vertices[i3] += (data.basePos.x - vertices[i3]) * 0.02;
                vertices[i3 + 1] += (data.basePos.y + waveOffset - vertices[i3 + 1]) * 0.02;
                vertices[i3 + 2] += (data.basePos.z - vertices[i3 + 2]) * 0.02;

                // Mouse influence
                const dx = mouse.x * 20 - vertices[i3];
                const dy = mouse.y * 20 - vertices[i3 + 1];
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 15) {
                    const force = (15 - dist) / 15;
                    vertices[i3] -= dx * force * 0.1;
                    vertices[i3 + 1] -= dy * force * 0.1;
                }
            }

            particlesRef.current.geometry.attributes.position.needsUpdate = true;

            // Update lines
            createLines();

            // Rotate structure
            particlesRef.current.rotation.y = time * 0.2;
            if (linesRef.current) {
                linesRef.current.rotation.y = time * 0.2;
            }

            renderer.render(scene, camera);
        };

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Start animation
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100vw',
                height: '100vh',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                background: '#000'
            }}
        />
    );
}