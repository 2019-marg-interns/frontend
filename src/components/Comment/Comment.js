import React from "react";
import { connect } from 'react-redux';
import { defaultCipherList } from "constants";
import { toEditComment, toLikeComment, toUnlikeComment, toDeleteComment } from "../../actions";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.new_name;
    this.new_message;

    console.log("Comment comment: ", props.comment)
    // console.log("c c: ", comment.comment)

    this.state = {
      editMode: false,
      name: props.comment.name,
      message: props.comment.comment,
      liked: props.comment.liked,
      likes: props.comment.likes,
    }

    this.deleteCommentCheck = this.deleteCommentCheck.bind(this)
    this.onClickEditComment = this.onClickEditComment.bind(this)
    this.onClickCompleteEditComment = this.onClickCompleteEditComment.bind(this)
    this.editModeRender = this.editModeRender.bind(this)
    this.readModeRender = this.readModeRender.bind(this)
  }

  deleteCommentCheck() {

		if(confirm("정말 삭제하시겠습니까?") == true)
			return this.props.onDeleteComment(this.props.designid, this.props.comment.id)
		else

			return false;
  }

  onClickEditComment() {
    this.setState({
      editMode: true
    })
  }

  onClickCompleteEditComment() {
    this.setState({
      editMode: false,
      name: this.new_name.value,
      message: this.new_message.value,
    })
    this.props.onEditComment(this.props.designid, this.props.comment.id, this.new_name.value, this.new_message.value)
  }

  editModeRender() {
    return (
      <div className="Comment-Edit-Field">

      <span className="title5">댓글 편집</span>
      <form onSubmit={this.onClickCompleteEditComment}>

          <input
            ref={ node => {this.new_name=node;} }
            className="comment_name"
            defaultValue={this.state.name}
            name="name"
            type="text"
          />


          <input
            ref={ node => {this.new_message=node;} }
            // value={this.contents}
            className="comment_text"
            defaultValue={this.state.message}
            name="message"
            rows="5"
          />

          <button className="button button_comment">
            Done &#10148;
          </button>

      </form>
      </div>
    )



  }

  readModeRender() {
    return (
      <div className="Comment-Field">

          <div className="Comment-List-Field">
            <div className="Group-Name-Field">
              <span className="title5">{this.state.name} </span>
            </div>

          <div className="Comment-Button-Field">
          {this.props.comment.auth
            // 댓글을 단 사람이거나 그룹의 관리자이면
            ? <div>
                <button className="button button_comment_delete" onClick={() => this.deleteCommentCheck()}> DEL</button>
                <button className="button button_comment_edit" onClick={() => this.onClickEditComment()}> EDIT </button>
              </div>
            // 댓글을 단 사람이 아니면
            : <div/>
          }
          </div>
          </div>

            <span className="title4">{this.state.message}
            </span>
              {/* {this.props.comment.liked */}

              {this.state.liked
              // 댓글을 좋아요 한 사람이면
              ? <span>
                  {/* <span className="likes_text"> {this.props.comment.likes} </span> */}
                  <span className="likes_text"> {this.state.likes} </span>
                  <span className="unlikes"
                    onClick={() => {
                      this.setState({liked: false, likes: this.state.likes - 1})
                      this.props.onUnlikeComment(this.props.comment.id)}
                    }> &#10084;
                  </span>
                </span>

              // 아직 좋아요를 하지 않은 사람이면
              : <span>
                  {/* <span className="likes_text"> {this.props.comment.likes} </span> */}
                  <span className="likes_text"> {this.state.likes} </span>
                  <span className="likes"
                    onClick={() => {
                      this.setState({liked: true, likes: this.state.likes + 1})
                      this.props.onLikeComment(this.props.comment.id)
                    }}> &#10084;
                  </span>
                </span>
              }
            
      </div>

    )
  }



  render() {
      return (
        <div>
          {
            this.state.editMode
            ? this.editModeRender()
            : this.readModeRender()
            // :<div></div>
          }
        </div>


      )
    }
  }

const mapDispatchToProps = (dispatch) => ({
	onEditComment: (designid, commentid, name, message) => dispatch(toEditComment(designid, commentid, name, message)),
  onDeleteComment: (designid, commentid) => dispatch(toDeleteComment(designid, commentid)),
  onLikeComment: (commentid) => dispatch(toLikeComment(commentid)),
  onUnlikeComment: (commentid) => dispatch(toUnlikeComment(commentid)),
})


export default connect(null, mapDispatchToProps)(Comment)
