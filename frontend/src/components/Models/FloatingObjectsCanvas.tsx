import { useEffect, useRef } from "react";
import * as THREE from "three";

const FloatingObjectsCanvas = ({ containerRef }: any) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        /* -------------------- Scene -------------------- */
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x060c18, 0);

        /* -------------------- Lights -------------------- */
        scene.add(new THREE.HemisphereLight(0xeeeeff, 0x080820, 1.5));

        const mainLight = new THREE.DirectionalLight(0xffffff, 3);
        mainLight.position.set(5, 10, 7);
        scene.add(mainLight);

        const backLight = new THREE.DirectionalLight(0x0077ff, 2);
        backLight.position.set(-10, -5, -10);
        scene.add(backLight);

        /* -------------------- Materials -------------------- */
        const capsuleMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xccfffc,
            metalness: 0.1,
            roughness: 0.2,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        });

        const capMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xf9d000,
            metalness: 0.95,
            roughness: 0.5,
            clearcoat: 0.8,
        });

        const plusMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xf9d000,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
        });

        /* -------------------- Pill Model -------------------- */
        const pillGroup = new THREE.Group();

        const pillBody = new THREE.Mesh(
            new THREE.CylinderGeometry(0.75, 0.75, 3, 32),
            capsuleMaterial
        );
        pillGroup.add(pillBody);

        const pillTop = new THREE.Mesh(
            new THREE.SphereGeometry(0.75, 52, 16),
            capMaterial
        );
        pillTop.position.y = 1.5;
        pillGroup.add(pillTop);

        const pillBottom = pillTop.clone();
        pillBottom.position.y = -1.5;
        pillGroup.add(pillBottom);

        pillGroup.rotation.z = Math.PI / 2;
        scene.add(pillGroup);

        /* -------------------- Plus Model -------------------- */
        const plusGroup = new THREE.Group();

        const vertical = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 3, 0.5),
            plusMaterial
        );
        const horizontal = new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.5, 0.5),
            plusMaterial
        );

        plusGroup.add(vertical, horizontal);
        scene.add(plusGroup);

        /* -------------------- Responsive Config -------------------- */
        const getResponsiveConfig = (width: number) => {
            if (width < 640) {
                return {
                    cameraZ: 18,
                    pillScale: 0.9,
                    plusScale: 0.8,
                    pillPos: new THREE.Vector3(-2, 4.5, 0),
                    plusPos: new THREE.Vector3(3, -3.5, 0),
                };
            }

            if (width < 1024) {
                return {
                    cameraZ: 16,
                    pillScale: 1.2,
                    plusScale: 1,
                    pillPos: new THREE.Vector3(-8, 4, 0),
                    plusPos: new THREE.Vector3(6, 6, 0),
                };
            }

            return {
                cameraZ: 15,
                pillScale: 1,
                plusScale: 1,
                pillPos: new THREE.Vector3(-13, 5, 0),
                plusPos: new THREE.Vector3(12, -3, 0),
            };
        };

        let basePillY = 0;
        let basePlusY = 0;

        const applyLayout = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            const cfg = getResponsiveConfig(width);

            camera.aspect = width / height;
            camera.position.z = cfg.cameraZ;
            camera.updateProjectionMatrix();

            pillGroup.scale.setScalar(cfg.pillScale);
            pillGroup.position.copy(cfg.pillPos);
            basePillY = cfg.pillPos.y;

            plusGroup.scale.setScalar(cfg.plusScale);
            plusGroup.position.copy(cfg.plusPos);
            basePlusY = cfg.plusPos.y;

            renderer.setSize(width, height);
        };

        applyLayout();
        window.addEventListener("resize", applyLayout);

        /* -------------------- Animation -------------------- */
        const clock = new THREE.Clock();
        let rafId: number;

        const animate = () => {
            const t = clock.getElapsedTime();

            pillGroup.position.y = basePillY + Math.sin(t * 0.4) * 0.7;
            pillGroup.rotation.y += 0.005;
            pillGroup.rotation.x = Math.sin(t * 0.2) * 0.05;

            plusGroup.position.y = basePlusY + Math.sin(t * 0.6) * 0.5;
            plusGroup.rotation.x += 0.01;
            plusGroup.rotation.y += 0.015;

            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        };

        animate();

        /* -------------------- Cleanup -------------------- */
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", applyLayout);
            renderer.dispose();

            scene.traverse((obj) => {
                if (obj instanceof THREE.Mesh) {
                    obj.geometry.dispose();
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach(m => m.dispose());
                    } else {
                        obj.material.dispose();
                    }
                }
            });
        };
    }, [containerRef]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10 pointer-events-none"
        />
    );
};

export default FloatingObjectsCanvas;
