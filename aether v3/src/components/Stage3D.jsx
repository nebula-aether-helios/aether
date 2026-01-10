// Cycle: 85 - Unified Clock Pulse
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, RoundedBox, Edges, MeshTransmissionMaterial, Html, Grid, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Cycle 85: Unified timing constants for visual harmony
const PULSE_FREQ = 3; // Base frequency in rad/s (~0.48 Hz, ~2s cycle)
const SPARK_PULSE = PULSE_FREQ * 2; // Sparks pulse at 2x base
const EDGE_PULSE = PULSE_FREQ * 2; // Edge glow at 2x base
const INNER_PULSE = PULSE_FREQ * 4; // Inner electricity at 4x base

// Cycle 51: Cinematic Camera Fly-In
const CinematicCamera = ({ isBooting }) => {
    const { camera } = useThree();
    const startPos = useRef(new THREE.Vector3(30, 8, 40));
    const endPos = useRef(new THREE.Vector3(8, 1, 12));

    useFrame((state) => {
        if (isBooting) {
            const t = Math.min(state.clock.getElapsedTime() / 4.5, 1);
            const eased = 1 - Math.pow(1 - t, 3); // Ease-out cubic
            camera.position.lerpVectors(startPos.current, endPos.current, eased);
            camera.lookAt(0, 0, -3);
        }
    });

    return null;
};

// Cycle 55: Spark Particles System
const SparkParticles = ({ isBooting, bootProgress }) => {
    const count = 300;
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 14;
            pos[i * 3 + 1] = Math.random() * 10 - 1;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 3;
        }
        return pos;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current && isBooting) {
            const posAttr = pointsRef.current.geometry.attributes.position;
            for (let i = 0; i < count; i++) {
                posAttr.array[i * 3 + 1] -= delta * (5 + Math.random() * 8);
                posAttr.array[i * 3] += (Math.random() - 0.5) * delta * 3;
                if (posAttr.array[i * 3 + 1] < -4) {
                    posAttr.array[i * 3 + 1] = 8 + Math.random() * 4;
                    posAttr.array[i * 3] = (Math.random() - 0.5) * 14;
                }
            }
            posAttr.needsUpdate = true;
        }

        // Cycle 87: Sync spark intensity with unified pulse
        if (matRef.current && isBooting) {
            const pulse = 0.7 + Math.sin(state.clock.getElapsedTime() * SPARK_PULSE) * 0.3;
            matRef.current.opacity = pulse;
        }
    });

    const matRef = useRef();

    if (!isBooting) return null;

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                ref={matRef}
                transparent
                color="#ff3333"
                size={0.18}
                sizeAttenuation
                depthWrite={false}
                opacity={1}
            />
        </Points>
    );
};

// Cycle 56: Animated Ether Grid
const EtherPlane = ({ isBooting }) => {
    const gridRef = useRef();

    useFrame((state) => {
        if (gridRef.current && gridRef.current.material) {
            const t = state.clock.getElapsedTime();
            // Cycle 89: Grid pulses with unified timing
            if (isBooting) {
                gridRef.current.material.opacity = 0.4 + Math.sin(t * EDGE_PULSE) * 0.35;
            } else {
                gridRef.current.material.opacity = THREE.MathUtils.lerp(gridRef.current.material.opacity, 0.1, 0.03);
            }
        }
    });

    return (
        <Grid
            ref={gridRef}
            position={[0, -4, -5]}
            args={[50, 50]}
            cellColor={isBooting ? "#660011" : "#220000"}
            sectionColor="#ff0033"
            cellThickness={isBooting ? 0.8 : 0.3}
            sectionThickness={isBooting ? 1.8 : 0.5}
            fadeDistance={30}
            fadeStrength={2}
        />
    );
};

// Cycle 72: Circuit Photon Flow on Grid Floor
const CircuitPhotons = ({ isBooting }) => {
    const count = 80;
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = -3.95;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
        }
        return pos;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            const posAttr = pointsRef.current.geometry.attributes.position;
            for (let i = 0; i < count; i++) {
                // Move along Z axis (circuit flow)
                posAttr.array[i * 3 + 2] -= delta * (0.5 + Math.random() * 0.5);
                if (posAttr.array[i * 3 + 2] < -20) {
                    posAttr.array[i * 3 + 2] = 10;
                    posAttr.array[i * 3] = (Math.random() - 0.5) * 30;
                }
            }
            posAttr.needsUpdate = true;
        }

        // Cycle 90: Sync circuit photon intensity with unified pulse
        if (circuitMatRef.current) {
            const t = state.clock.getElapsedTime();
            const basePulse = isBooting ? 0.5 : 0.08;
            const variation = Math.sin(t * PULSE_FREQ) * (isBooting ? 0.2 : 0.04);
            circuitMatRef.current.opacity = basePulse + variation;
        }
    });

    const circuitMatRef = useRef();

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                ref={circuitMatRef}
                transparent
                color="#ff3333"
                size={0.06}
                sizeAttenuation
                depthWrite={false}
                opacity={isBooting ? 0.7 : 0.12}
            />
        </Points>
    );
};

// Persistent 3D File System
const FSIcon = ({ position, label, active, onClick }) => {
    const mesh = useRef();
    const connRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (mesh.current) {
            const targetScale = hovered || active ? 1.3 : 1;
            mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
            mesh.current.rotation.y += 0.01;
        }
        // Cycle 88: Pulse connectivity in sync
        if (connRef.current && (hovered || active)) {
            const t = state.clock.getElapsedTime();
            const baseOpacity = active ? 0.08 : 0.03;
            connRef.current.opacity = baseOpacity + Math.sin(t * PULSE_FREQ) * 0.04;
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={mesh}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={onClick}
            >
                <coneGeometry args={[0.3, 0.5, 4]} />
                <meshStandardMaterial
                    color={hovered || active ? "#ff0033" : "#333"}
                    emissive="#ff0033"
                    emissiveIntensity={hovered || active ? 1.5 : 0}
                />
            </mesh>
            {(hovered || active) && (
                <Html position={[0, 0.6, 0]} center pointerEvents="none">
                    <div style={{
                        color: '#ff0033',
                        fontFamily: 'monospace',
                        fontSize: '9px',
                        background: 'rgba(0,0,0,0.9)',
                        padding: '3px 6px',
                        border: '1px solid #ff0033',
                        whiteSpace: 'nowrap'
                    }}>
                        {label}
                    </div>
                </Html>
            )}
            {/* Cycle 88: Ethereal Connectivity (pulsing) */}
            {(hovered || active) && (
                <mesh position={[0, 2, 0]}>
                    <cylinderGeometry args={[0.003, 0.003, 4, 6]} />
                    <meshBasicMaterial ref={connRef} color="#ff0033" transparent opacity={active ? 0.08 : 0.03} />
                </mesh>
            )}
        </group>
    );
};

const PersistentFS = ({ activePanel, onFocus }) => {
    const icons = [
        { label: "REPO (P1)", panel: 0, x: -4, z: 0 },
        { label: "RVM (P3)", panel: 2, x: -2, z: -2 },
        { label: "DATA (P4)", panel: 3, x: 0, z: -4 },
        { label: "AI (P5)", panel: 4, x: 2, z: -6 },
        { label: "LOCK", panel: undefined, x: 4, z: -8 }
    ];
    return (
        <group position={[0, -3.75, 0]}>
            {icons.map((icon, i) => (
                <FSIcon
                    key={i}
                    position={[icon.x, 0, icon.z]}
                    label={icon.label}
                    active={activePanel === icon.panel}
                    onClick={() => onFocus && onFocus(icon.panel)}
                />
            ))}
        </group>
    );
};

// Cycle 53-54: Glass Panel with electrical effects
const GlassPanel = ({ index, active, isBooting, bootProgress }) => {
    const mesh = useRef();
    const edgesRef = useRef();
    const innerEdgesRef = useRef();
    const [logs, setLogs] = useState([]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (active && !isBooting && Math.random() > 0.98) {
            setLogs(prev => [...prev.slice(-6), `0x${Math.floor(Math.random() * 0xffffff).toString(16)}`]);
        }

        if (mesh.current) {
            // Cycle 52/53: Compressed -> Morph -> Snap (Tighter spacing 0.9)
            const targetZ = isBooting ? 0 : -index * (active ? 2.0 : 1.6);
            const targetX = isBooting ? 0 : index * 0.9; // Tighter spacing
            const targetScale = isBooting ? 0.02 : 1;

            const lerpFactor = isBooting ? 0.012 : 0.08;
            mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, targetZ, lerpFactor);
            mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, lerpFactor);
            mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, 0.025);
            mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, targetScale, 0.025);

            if (!isBooting && active) {
                mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, Math.sin(t * 2) * 0.05, 0.1);
            } else {
                mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, 0, 0.1);
            }

            // Cycle 86: Electrical Border Pulse (unified timing)
            if (edgesRef.current && edgesRef.current.material) {
                if (isBooting) {
                    edgesRef.current.material.opacity = 0.5 + Math.sin(t * EDGE_PULSE) * 0.4;
                } else {
                    edgesRef.current.material.opacity = active ? 0.6 + Math.sin(t * EDGE_PULSE) * 0.2 : 0.25;
                }
            }

            // Cycle 86: White inner edge electrical current (unified timing)
            if (innerEdgesRef.current && innerEdgesRef.current.material) {
                if (isBooting) {
                    innerEdgesRef.current.material.opacity = 0.3 + Math.abs(Math.sin(t * INNER_PULSE)) * 0.5;
                } else {
                    innerEdgesRef.current.material.opacity = active ? 0.1 : 0;
                }
            }
        }
    });

    return (
        <group ref={mesh} rotation={[0, -0.25, 0]} scale={[0.02, 0.02, 1]}>
            <RoundedBox args={[6, 4, 0.02]} radius={0.05} bevelSegments={4}>
                <MeshTransmissionMaterial
                    backside
                    samples={8}
                    thickness={0.6}
                    roughness={0.015}
                    chromaticAberration={0.15}
                    anisotropy={0.5}
                    distortion={0.04}
                    ior={1.45}
                    color={active ? "#180005" : "#050505"}
                />
                {/* Primary Red Edge - Crispy */}
                <Edges
                    ref={edgesRef}
                    scale={1.001}
                    threshold={12}
                    color="#ff0033"
                    transparent
                />
                {/* Electricity Current (White Inner Edge) */}
                <Edges
                    ref={innerEdgesRef}
                    scale={1.004}
                    threshold={15}
                    color="#ffffff"
                    transparent
                />

                {active && !isBooting && (
                    <Html transform distanceFactor={3} position={[0, 0, 0.02]} pointerEvents="none">
                        <div style={{
                            color: '#ff0033',
                            fontFamily: 'monospace',
                            fontSize: '10px',
                            width: '350px',
                            padding: '15px',
                            opacity: 0.9
                        }}>
                            <div style={{
                                borderBottom: '1px solid rgba(255,0,51,0.3)',
                                paddingBottom: '5px',
                                marginBottom: '8px',
                                fontWeight: 'bold'
                            }}>
                                PANE_0{index + 1} // {index === 0 ? 'ANTIGRAVITY_IDE' : index === 1 ? 'SPEED_DAEMON' : index === 2 ? 'CODESPACES' : index === 3 ? 'CHROME' : 'OUTBOUND'}
                            </div>
                            <div style={{ color: '#aaa', fontSize: '9px' }}>
                                {index === 0 && <span>IDE: Codespaces + Copilot</span>}
                                {index === 1 && <span>Next.js + Tailwind + Polypane + Vercel</span>}
                                {index === 2 && <span>Zyte + Sentry Ready</span>}
                                {index === 3 && <span>Session Active. DevTools Open.</span>}
                                {index === 4 && <span>testmail.app // RVM // Monetization</span>}
                                {logs.length > 0 && <div style={{ marginTop: '5px', opacity: 0.5 }}>{logs.slice(-3).join(' ')}</div>}
                            </div>
                        </div>
                    </Html>
                )}
            </RoundedBox>
        </group>
    );
};

const Stage3D = ({ activePanel }) => {
    const [isBooting, setIsBooting] = useState(true);
    const [bootProgress, setBootProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setIsBooting(false), 5000);
        const interval = setInterval(() => {
            setBootProgress(prev => Math.min(prev + 0.01, 1));
        }, 50);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={{ gridArea: 'stage', position: 'relative', width: '100%', height: '100%' }}>
            <Canvas
                shadows
                camera={{ position: [30, 8, 40], fov: 35 }}
                gl={{ antialias: false, toneMapping: THREE.NoToneMapping }}
            >
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.1} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isBooting ? 2 : 1} color="#ff0033" />
                <Environment preset="city" />

                <CinematicCamera isBooting={isBooting} />
                <EtherPlane isBooting={isBooting} />
                <SparkParticles isBooting={isBooting} bootProgress={bootProgress} />
                <CircuitPhotons isBooting={isBooting} />

                <PersistentFS activePanel={activePanel} onFocus={() => { }} />

                <group position={[-2, 0, 0]}>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <GlassPanel key={i} index={i} active={activePanel === i} isBooting={isBooting} bootProgress={bootProgress} />
                    ))}
                </group>

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.4} mipmapBlur intensity={isBooting ? 2.0 : 1.2} radius={0.7} />
                </EffectComposer>

                <OrbitControls
                    enablePan={false}
                    minAzimuthAngle={-Math.PI / 4}
                    maxAzimuthAngle={Math.PI / 4}
                    minPolarAngle={Math.PI / 2.2}
                    maxPolarAngle={Math.PI / 1.8}
                    enabled={!isBooting}
                />
            </Canvas>
        </div>
    );
};

export default Stage3D;
