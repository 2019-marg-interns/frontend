import React from 'react';
import {connect} from 'react-redux';
import { toDeleteGroupUser, toGiveAdmin } from '../../actions';

class GroupUserList extends React.Component {
    constructor(props) {
        super(props)

        this.deleteUserCheck = this.deleteUserCheck.bind(this)
        this.giveAdminCheck = this.giveAdminCheck.bind(this)
    }


    admin_userlist = this.props.group_users.filter(user => {
        console.log("username: ", user.username)
        return (user.username !== this.props.user.split(":")[0])
    })

    deleteUserCheck = (userid) => {
        if(confirm("정말 삭제하시겠습니까?") == true)
            return this.props.onDeleteUser(this.props.now_group.id, userid)
        else
            return false;
    }

    giveAdminCheck = (userid) => {
        if(confirm("정말 관리자 권한을 부여하시겠습니까?") == true)
            return this.props.onGiveAdmin(this.props.now_group.id, userid)
        else
            return false;
    }

    render() {
        return (
            <div>
            <div className="Group-List-Field">
                {this.props.group_users.map(user =>
                    <ul key={user.id}>
                      <div className="Group-Name-Field">
                        <span>{user.username}</span>
                        </div>
                        {console.log(user)}
                        <div className="Group-Button-Field">
                        <button className="Button button_small" onClick={() => this.deleteUserCheck(user.id)}>삭제</button>
                        {user.admin
                            ? <div></div>
                            : <button className="Button button_small" onClick={() => this.giveAdminCheck(user.id)}>관리자</button>
                        }
                        </div>

                    </ul>
                )}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
	user: state.authorization,
    now_group: state.now_group,
    group_users: state.group_users,
})

const mapDispatchToProps = (dispatch) => ({
	onDeleteUser: (groupid, userid) => dispatch(toDeleteGroupUser(groupid, userid)),
	onGiveAdmin: (groupid, userid) => dispatch(toGiveAdmin(groupid, userid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupUserList);
