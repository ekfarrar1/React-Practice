import React from "react";
import './control-buttons.css';


function ControlButtons(props){
    const StartButton = (
        <div> className="btn btn-one btn-start"
            onClick={props.handleStart}
            get that stopwatch goin'
        </div>
    );

    return (
        <div className="Control-Buttons">
            <div>{StartButton}</div>
        </div>
    );
}

export default ControlButtons