import React from 'react';
import {connect} from 'react-redux';

import CommentForm from '../Comment/CommentForm';
import CommentList from '../Comment/CommentList';
import { gotoEditDesign, toPostDesign, toLikeDesign, toUnlikeDesign, toDeleteGroupDesign, toEditDesignName } from '../../actions';

class DesignForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editNameMode: false,
            name: this.props.design.name,
            liked: this.props.design.liked,
            likes: this.props.design.likes,

        }

        this.post_group;
        this.new_name;

        this.deleteDesignCheck = this.deleteDesignCheck.bind(this);

        this.onClickEditDesignName = this.onClickEditDesignName.bind(this);
        this.onClickCompleteEditDesignName = this.onClickCompleteEditDesignName.bind(this);

        this.editNameModeRender = this.editNameModeRender.bind(this);
        this.readNameModeRender = this.readNameModeRender.bind(this);
    }

    deleteDesignCheck() {
		if(confirm("정말 삭제하시겠습니까?") == true)
			return this.props.onDeleteDesign(this.props.now_group.id, this.props.design.id)
		else
			return false;
    }

    onClickEditDesignName() {
        this.setState({
          editNameMode: true
        })
    }

    onClickCompleteEditDesignName() {
        this.setState({
            editNameMode: false,
            name: this.new_name.value,
        })
        this.props.onEditDesignName(this.props.design.id, this.new_name.value)
    }

    editNameModeRender() {
        return (
          <form onSubmit={this.onClickCompleteEditDesignName}>
            <div className="Design-Title-Field">
              <input
                ref={ node => {this.new_name=node;} }
                className="edit_name"
                defaultValue={this.state.name}
                name="name"
                type="text"
              />
              <button className="button button_comment">
                Done &#10148;
              </button>
              </div>
          </form>
        )
    }

    readNameModeRender() {
        return (
            <div>
              <div className="Design-Title-Field">
                  <span className="design_name"> {this.state.name} </span>

                    {this.props.design.auth
                        // 디자인의 주인이거나 그룹의 관리자면
                        ?<button className="button button_name_edit" onClick={() => this.onClickEditDesignName()}> EDIT </button>
                        // 디자인 주인이 아니면
                        : <div/>
                    }
                    </div>

            </div>


        )
    }

    render() {
        return(
            <div>

                    {(this.props.now_group.group_type === "UR")
                        /* grouptype이 user 그룹일때 - edit 및 post 가능 */
                        ? <div>
                            {this.state.editNameMode
                                ? this.editNameModeRender()
                                : this.readNameModeRender()
                            }

                            <div>
                            <div className="DesignList-Button-Field">
                            <button className="button button_design_edit_delete" type="button" onClick={() => this.props.onToEditDesign(this.props.design.id)}>
                                   MODIFY
                                   </button>
                                   {this.props.design.auth && <button className="button button_design_edit_delete" onClick={() => this.deleteDesignCheck()}>
                                   DELETE
                                    </button>}
                                   </div>
                                {console.log("design: ", this.props.design)}
                                <p></p>
                                <img src={this.props.design.front_image_url} />
                                <img src={this.props.design.back_image_url} />

                            </div>
                        <select id="post_group" ref={node=>{this.post_group=node;}}>
                                <option>그룹을 선택하세요</option>
                                {this.props.my_groups.filter(group => {
                                    return group.group_type !== "UR"
                                }).map(option => {
                                    console.log("option: ", option)
                                    return <option key={option.id} value={option.id}> {option.group_type} {option.group_name} </option>
                                })}
                            </select>

                            <div className="Comment-Button-Field">
                                <button class="post_btn" type="button"
                                    onClick={() => {
                                        console.log("post_group: ", this.post_group)
                                        if(this.post_group.value === undefined || this.post_group.value == "그룹을 선택하세요") {
                                            alert("그룹을 선택하세요")
                                        }
                                        else {
                                            this.props.onPostDesign(this.props.design.id, this.post_group.value)
                                        }
                                        }}>
                                    POST
                                </button>
                            </div>

                 </div>

                /* grouptype이 user 그룹이 아닐 때 - like 및 댓글 가능 */
                : <div>
                    {this.state.editNameMode
                        ? this.editNameModeRender()
                        : this.readNameModeRender()
                    }
                    <div className="DesignList-Button-Field">
                        {this.props.design.auth && <button className="button button_design_edit_delete" onClick={() => this.deleteDesignCheck()}>DELETE</button>}
                    </div>
                    <div>
                        {console.log("design: ", this.props.design)}
                        <p></p>
                        <img src={this.props.design.front_image_url} />
                        <img src={this.props.design.back_image_url} />

                    </div>

                    <div className="Comment-Like-Field">
                        <span className="title5">{this.state.likes}명이 좋아합니다</span>

                        <div className="Group-Button-Field">
                            {this.state.liked
                            ? <button className="button button_unlike"
                                onClick={() => {
                                    this.setState({liked: false, likes: this.state.likes - 1})
                                    this.props.onUnlikeDesign(this.props.design.id)}
                                }> 좋아요 취소</button>
                            : <button className="button button_like"
                                onClick={() => {
                                    this.setState({liked: true, likes: this.state.likes + 1})
                                    this.props.onLikeDesign(this.props.design.id)}
                                }> 좋아요 </button>
                            }
                        </div>
                    </div>







                    {/* design의 주인일 때 - 삭제 가능 */}

                    <CommentList designid={this.props.design.id} comments={this.props.design.comments}/>
                    <div className="Comment-Write-Field">

                        <span className="title5">댓글 쓰기</span>
                        {/* {console.log("DesignForm design.comments: ", this.props.design.comments)} */}
                        <CommentForm designid={this.props.design.id}/>
                    </div>

                </div>
            }
            <br/>
            <br/>
            <br/>
            <br/>
        </div>

        )
    }
}

const mapStateToProps = (state) => ({
    my_groups: state.my_groups,
    now_group: state.now_group,
})

const mapDispatchToProps = (dispatch) => ({
    onEditDesignName: (designid, name) => dispatch(toEditDesignName(designid, name)),
    onToEditDesign: (designid) => dispatch(gotoEditDesign(designid)),
    onPostDesign: (designid, groupid) => dispatch(toPostDesign(designid, groupid)),
    onLikeDesign: (designid) => dispatch(toLikeDesign(designid)),
    onUnlikeDesign: (designid) => dispatch(toUnlikeDesign(designid)),
    onDeleteDesign: (groupid, designid) => dispatch(toDeleteGroupDesign(groupid, designid))
})

export default connect(mapStateToProps, mapDispatchToProps)(DesignForm);
