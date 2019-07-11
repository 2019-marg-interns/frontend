import React from 'react';
import { connect } from 'react-redux';
import MyGroup from './MyGroup';
import { gotoGroupDetail, gotoAdminGroup, toWithdrawGroup } from '../../actions/index.js';

class MyGroupList extends React.Component {
    constructor(props) {
		super(props)

		this.withdrawGroupCheck = this.withdrawGroupCheck.bind(this)
	}

	withdrawGroupCheck(groupid) {
		if(confirm("정말 탈퇴하시겠습니까?") == true) 
			return this.props.onWithdrawGroup(groupid)
		else 
			return false;
    }
    
    render() {
        if(this.props.isLoggedIn !== "") {
            return (
                <div>
                    <ul>
                    {this.props.my_groups.filter(group => {
                        return group.group_type !== "UR"
                    }).map(group =>
                        <MyGroup 
                            key={group.id}
                            group={group}
                            onClickGroup={() => this.props.onToGroupDetail(group.id)}
                            onClickAdminGroup={() => this.props.onToAdminGroup(group.id)}
                            onClickWithdrawGroup={() => this.withdrawGroupCheck(group.id)}
                        />
                    )}
                    </ul>
                </div> 
            )
        }
        else {
            return (
                <p>로그인을 해주세요</p>
            )

        }
        
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authorization,
    my_groups: state.my_groups
})

const mapDispatchToProps = (dispatch) => ({
	onToGroupDetail: (groupid) => dispatch(gotoGroupDetail(groupid)),
    onToAdminGroup: (groupid) => dispatch(gotoAdminGroup(groupid)),
    onWithdrawGroup: (groupid) => dispatch(toWithdrawGroup(groupid))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyGroupList)