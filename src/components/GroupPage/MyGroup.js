import React from 'react';

const MyGroup = ({ group, onClickGroup, onClickAdminGroup, onClickWithdrawGroup }) => {
    return (

        <div>
          <div className="Group-List-Field">
            <div className="Group-Name-Field" onClick={onClickGroup}>

              <span className="group_type"> {group.group_type} </span>
              <br/>
              <span className="group_name">{group.group_name} </span>
              </div>
              <div className="Group-Button-Field">
                <button className="button button_small" onClick={onClickWithdrawGroup}>탈퇴</button>
                {group.admin && (group.group_type !== "UR") &&
                  (
                    <button className="button button_admin" onClick={onClickAdminGroup}>관리</button>
                  )
                }
                  </div>

              </div>
            </div>


    )
}

export default MyGroup
