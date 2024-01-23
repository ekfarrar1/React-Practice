import React from "react";
import './control-buttons.css';


function ControlButtons(props){
    let StartStopButton = null
    let ResetButton = null

    if (props.isPaused === true) {
        StartStopButton = (
            <div className="btn btn-one btn-start"
                onClick={props.handleClick}>
                let's get it
            </div>
        );
    } else {
        StartStopButton = (
            <div className="btn btn-one btn-start"
                onClick={props.handleClick}>
                I DON'T WANNA PLAY ANYMORE
            </div>
        )
    }

    ResetButton = (
        <div className="btn btn-one btn-start"
            onClick={props.handleReset}>
            aw take me back to the staaaart
        </div>
    )

    return (
        <div className="Control-Buttons">
            <div>{StartStopButton}</div>
            <div>{ResetButton}</div>
        </div>
    );
}

export default ControlButtons