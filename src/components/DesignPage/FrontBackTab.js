import React from 'react';
import { connect } from 'react-redux';

class FrontBackTab extends React.Component {
    render() {

        return (
         <div>


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

FrontBackTab = connect(undefined, mapDispatchToProps)(FrontBackTab);

export default FrontBackTab;
