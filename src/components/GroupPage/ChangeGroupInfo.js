import React from 'react';

const ChangeGroupInfo = ({ group, onClickChangeSubmit }) => {
    let grouptype, groupname;

    const type_options = [
		'[동아리]',
		'[학과]',
		'[기타]'
        ]

    const onSubmit = () => {
        console.log("changing group information")
        if(grouptype !== undefined && grouptype.value !== 'Select an Option' && groupname !== undefined) {
            onClickChangeSubmit(group.id, grouptype.value, groupname.value)
        }
    }

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                onSubmit()
            }}>
                <div>
                    <span className="title1">
                    GROUP TYPE
                    </span>
                    <select
                        name="grouptype"
                        ref={ node => {grouptype=node;} }
                        className="type-select"
                        defaultValue={group.group_type}
                    >
                        {type_options.map(option => {
                            return <option value={option} key={option} >{option}</option>
                        })}
                    </select>
                </div>
                  <br/>
                    <span className="title1">
                    GROUP NAME
                    </span>
                    <input
                        type="text"
                        ref={ node => {groupname=node;}}
                        placeholder={group.group_name}
                    />

                    <br/>
                <button type="submit">CHANGE GROUP INFO</button>


            </form>
        </div>
    )

}

export default ChangeGroupInfo;
