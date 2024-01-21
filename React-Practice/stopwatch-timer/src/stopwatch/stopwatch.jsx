import React, {useState, useEffect} from 'react';
import './stopwatch.css'
import Timer from '../timer/timer'
import ControlButtons from '../control-buttons/control-buttons'


function Stopwatch() {
    const[isPaused, setPaused] = useState(true);
    const[time, setTime] = useState(0); 

    useEffect(() => {
        let interval = null
        if (isPaused === false){

            interval = setInterval(() => {
                setTime((time) => time+10);    
            }, 10);
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleStart = () => {
        setPaused(false);
    };

    return (<div className="stopwatch">
        <Timer time={time}/>
        <ControlButtons 
            isPaused={isPaused}
            handleStart={handleStart}/>
    </div>);
}

export default Stopwatch;