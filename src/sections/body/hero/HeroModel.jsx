import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function HeroModel(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF('/assets/hero/robot.glb');
    const { actions } = useAnimations(animations, group);
    const offsetTime = 0.32;

    const fadeMaterial = useMemo(() => {
        const mat = materials.Robot.clone();
        mat.transparent = true;
        mat.opacity = 0;
        return mat;
    }, [materials.Robot]);

    useEffect(() => {
        const action = actions["Take 001"];
        if (action) {
            action.reset();
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.75;
            action.play();
            action.time = 0;
        }
    }, [actions]);

    useFrame((state, delta) => {
        const action = actions["Take 001"];
        if (action) {
            if (action.time < offsetTime) {
                action.time = offsetTime;
            }
        }
        if (fadeMaterial.opacity < 1) {
            fadeMaterial.opacity += delta * 0.8;
            fadeMaterial.needsUpdate = true;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[-5, 2, 2]}
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={20}
                shadow-camera-left={-5}
                shadow-camera-right={5}
                shadow-camera-top={5}
                shadow-camera-bottom={-5}
            />
            <group ref={group} {...props} dispose={null}>
                <group name="Scene">
                    <group name="Object_4" scale={0.002}>
                        <primitive object={nodes._rootJoint} />
                    </group>
                    <skinnedMesh
                        name="Object_7"
                        geometry={nodes.Object_7.geometry}
                        material={fadeMaterial}
                        skeleton={nodes.Object_7.skeleton}
                        scale={0.002}
                    />
                </group>
            </group>
        </>
    );
}

useGLTF.preload('/assets/hero/robot.glb');