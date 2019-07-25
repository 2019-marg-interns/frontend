import React from 'react';
import {connect} from 'react-redux';

class GroupDesignList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.my_designs.map(design =>
                    <ul key={design.index}>
                    <div className="DesignList-Button-Field">
                       <span>{design.design}</span>
                    </div>
                    </ul>
                )}
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    my_designs: state.my_designs,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(GroupDesignList);
