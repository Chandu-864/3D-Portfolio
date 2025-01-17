import {Suspense, useEffect, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from './Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import Popup from '../components/Popup'
import { soundoff, soundon } from '../assets/icons'
import { useRef } from 'react'
import sakura from '../assets/sakura.mp3'

const Home = () => {

    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);

    const [playMusic, setPlayMusic] = useState(false);

    const musicRef = useRef( new Audio(sakura))
    musicRef.current.volume = 0.4;
    musicRef.current.loop = true;

    useEffect( ()=> {
        if (playMusic) {
            musicRef.current.play();
        }
        return () => {
            musicRef.current.pause();
        }
    },[playMusic])

    const adjustIslandScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];
        let screenRotation = [0.1, 4.7, 0];
        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9]
        }
        else {
            screenScale = [1,1,1]
        }
        return [screenScale, screenPosition, screenRotation]
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandScreenSize(); 

    const adjustPlaneScreenSize = () => {
        let screenScale = null;
        let screenPosition = null;
        if (window.innerWidth < 768) {
            screenScale = [1.5,1.5,1.5];
            screenPosition = [0, -1.5, 0];
        }
        else {
            screenScale = [3, 3, 3];
            screenPosition = [0, -4, -4];
        }
        return [screenScale, screenPosition]
    }

    const [planeScale, planePosition ] = adjustPlaneScreenSize(); 

  return (
    <section className='w-full h-screen relative'>
        {<div className='absolute z-10 top-28 left-0 right-0 flex items-center justify-center'>
            { currentStage && <Popup currentStage = {currentStage} />}
        </div>}
        <Canvas
        className={`w-full h-screen bg-transparent ${isRotating?'cursor-grabbing':'cursor-grab'}`}
        camera={{near: 0.1, far: 1000}}
        >
            <Suspense fallback = {<Loader />}>
                <directionalLight position={[1,1,1]} intensity={2} />
                <ambientLight intensity={0.5} />
                <hemisphereLight skyColor = '#b1e1ff' groundColor='#000000'
                intensity={1} />

                <Bird />
                <Sky
                    isRotating = {isRotating}
                />
                <Island  
                    isRotating = {isRotating}
                    setIsRotating = {setIsRotating}
                    scale = {islandScale}
                    position = {islandPosition}
                    rotation = {islandRotation}
                    setCurrentStage = {setCurrentStage}
                />
                <Plane
                    scale = {planeScale}
                    position = {planePosition}
                    isRotating = {isRotating}
                    rotation = {[0,20,0]}
                />

            </Suspense>
        </Canvas>
        <div className="absolute bottom-20 left-2 p-2">
            <img
            src={!playMusic ? soundoff : soundon}
            alt='jukebox'
            onClick={() => setPlayMusic(!playMusic)}
            className='w-10 h-10 cursor-pointer object-contain'
            />
      </div>
    </section>
  )
}

export default Home