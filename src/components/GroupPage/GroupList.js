import React from 'react';

const GroupList = ({ grouplist, onClickGroup, onClickJoinGroup, onClickWithdrawGroup }) => {

  return (
    <div>
        {grouplist.map(group =>
          <div className = "Group-List-Field">
          <ul key={group.id}>
            <div className="Group-Name-Field">
              <span id="groupName" onClick={() => onClickGroup(group.id)}>{group.group_type} {group.group_name}</span>
            </div>
            <div className = "Group-Button-Field">
            {group.member
              ? ( <button className="button button_small" onClick={() => onClickWithdrawGroup(group.id)}>탈퇴</button> )
              : ( <button className="button button_small" onClick={() => onClickJoinGroup(group.id)}>가입</button>)
            }
            </div>
          </ul>
          </div>
        )}
      </div>
  )
}

export default GroupList
