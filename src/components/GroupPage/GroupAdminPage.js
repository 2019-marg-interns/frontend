import React from 'react';
import {connect} from 'react-redux';

import NavBar from '../NavBar/NavBar';
import ChangeGroupInfo from './ChangeGroupInfo';
import GroupUserList from './GroupUserList';
import GroupDesignList from './GroupDesignList';
import { toDeleteGroupUser, toDeleteGroupDesign, toChangeGroupInfo, toDeleteGroup, toGiveAdmin } from '../../actions';

class GroupAdminPage extends React.Component {
	constructor(props) {
		super(props)

		this.deleteGroupCheck = this.deleteGroupCheck.bind(this)
	}

	deleteGroupCheck(groupid) {
		if(confirm("정말 삭제하시겠습니까?") == true)
			return this.props.onDeleteGroup(groupid)
		else 
			return false;
	}

	render() {
		if(!this.props.loading) {
			return (
				<p>loading...</p>
			)
		}

		return (
			<div className="GroupAdminPage">
				<NavBar />

				<section className="wrap clear col3">
					<div className="aside">
						<h2 className="h_white">GROUP INFO</h2>
						<div className="content">
							<ChangeGroupInfo
								group={this.props.now_group}
								onClickChangeSubmit={this.props.onChangeGroupInfo}
							/>
						<br />
							<button onClick={() => this.deleteGroupCheck(this.props.now_group.id)}>DELETE GROUP</button>
						</div>
					</div>
					<div className="main">
						<h2 className="h_white">DESIGNS</h2>
						<div className="content">
							<GroupDesignList />
						</div>
					</div>
					<div className="aside">
						<h2 className="h_black">MEMBER LIST</h2>
						<div className="content">
							<GroupUserList />
						</div>
					</div>
				</section>
				</div>
		)
	}
}

const mapStateToProps = (state) => ({
	now_group: state.now_group,
	loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
	onChangeGroupInfo: (groupid, grouptype, groupname) => dispatch(toChangeGroupInfo(groupid, grouptype, groupname)),
	onDeleteGroup: (groupid) => dispatch(toDeleteGroup(groupid))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupAdminPage);
