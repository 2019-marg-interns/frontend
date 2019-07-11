import React from "react";
import {connect} from 'react-redux';
import { toAddComment } from "../../actions";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.name;
    this.message;
    // bind context to methods
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Form submit handler
   */
  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    if (!this.isNameValid()) {
      alert("이름을 적어주세요.")
      return;
    }

    if (!this.isMessageValid()) {
      alert("내용을 적어주세요.")
      return;
    }
    
    this.props.onAddComment(this.props.designid, this.name.value, this.message.value)
  }

  /**
   * Simple validation
   */
  isNameValid() {
    return this.name.value !== "";
  }

  isMessageValid() {
    return this.message.value !== "";
  }

  render() {

    return (
      <div>

        <form onSubmit={this.onSubmit}>

            <input
              ref={ node => {this.name=node;} }
              className="comment_name"
              placeholder="Name"
              name="name"
              type="text"
            />

            <input

              ref={ node => {this.message=node;} }
              // value={this.contents}
              className="comment_text"
              placeholder="Comment"
              name="message"
              rows="5"
            />
              <button className="button button_comment">
                Comment &#10148;
              </button>

        </form>
      
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddComment: (designid, name, message) => dispatch(toAddComment(designid, name, message)),
})

export default connect (null, mapDispatchToProps)(CommentForm)
