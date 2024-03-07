import React from 'react';

function Inputbox(){
    return (
        <form>
            <label>input percentage: </label>
            <input name='percentage' type='text' pattern='^(0|[1-9][0-9]?|100)$'/>
        </form>
    )
}

export default Inputbox