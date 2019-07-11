import React from 'react';
import { connect } from 'react-redux';

class SaveButton extends React.Component {
    render() {

        return (
         <div>
        <button> save </button>

        </div>
       )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {
            dispatch()
        }
    }
}

SaveButton = connect(undefined, mapDispatchToProps)(SaveButton);

export default SaveButton;
