import React from 'react';
import {connect} from 'react-redux';
import { toDeleteGroupDesign } from '../../actions';

class GroupDesignList extends React.Component {
    constructor(props) {
        super(props);

        this.deleteDesignCheck = this.deleteDesignCheck.bind(this);
    }

    deleteDesignCheck() {
		if(confirm("정말 삭제하시겠습니까?") == true)
			return this.props.onDeleteDesign(this.props.now_group.id, this.props.design.id)
		else
			return false;
    }

    render() {
        return (
            <div>
                {this.props.group_designs.map(design =>
                    <ul key={design.id}>
                    <div className="DesignList-Button-Field">
                       <span>{design.name}</span>
                        <button button className="button button_comment_delete" onClick={() => this.deleteDesignCheck(design.id)}>DELETE</button>
                    </div>
                        <div>
                            <img src={design.front_image_url} />
                            <img src={design.back_image_url} />
                        </div>

                    </ul>
                )}
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
	now_group: state.now_group,
    group_designs: state.group_designs,
})

const mapDispatchToProps = (dispatch) => ({
    onDeleteDesign: (groupid, designid) => dispatch(toDeleteGroupDesign(groupid, designid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupDesignList);
