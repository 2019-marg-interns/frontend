import React from 'react'
import { connect } from 'react-redux'

import GroupList from './GroupList'
import { toSearchGroup, toJoinGroup, gotoGroupDetail, toWithdrawGroup } from '../../actions/index.js';

class SearchingGroup extends React.Component {

	render() {

		let onSubmit = () => {
			console.log("search onSubmit", this.searchword.value)
			if(this.searchword.value !== undefined) {
				this.newList = this.props.all_groups.filter(group => {
					return group.group_name.includes(this.searchword.value)
				});
			}
			console.log("after: ", this.newList)
			this.props.onSearchGroup(this.newList)
		}

		return(
			<div>
				<form onSubmit={e => {
					e.preventDefault()
					onSubmit()
				}}>
					<div className="SearchingBar">
						<input
							type="text"
							name="searchword"
							className="searching_input"
							ref={ node => {this.searchword=node;} }
							placeholder="Search"
						/>
						<button className="searching_button" type="submit">SEARCH</button>
					</div>
				</form>
				<GroupList
					grouplist={this.props.filtered_groups}
					onClickGroup={this.props.onToGroupDetail}
					onClickJoinGroup={this.props.onJoinGroup}
					onClickWithdrawGroup={this.props.onWithdrawGroup}
				/>
			</div>

		)
	}
}

const mapStateToProps = (state) => ({
	all_groups: state.all_groups,
	my_groups: state.my_groups,
	filtered_groups: state.filtered_groups
})

const mapDispatchToProps = (dispatch) => ({
	onSearchGroup: (newList) => dispatch(toSearchGroup(newList)),
	onJoinGroup: (groupid) => dispatch(toJoinGroup(groupid)),
	onWithdrawGroup: (groupid) => dispatch(toWithdrawGroup(groupid)),
    onToGroupDetail: (groupid) => dispatch(gotoGroupDetail(groupid)),
})

export default connect (mapStateToProps, mapDispatchToProps)(SearchingGroup)
