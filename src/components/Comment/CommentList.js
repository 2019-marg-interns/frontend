
import React from "react";
import Comment from "./Comment";

const CommentList = ({ designid, comments }) => {
  let comment_list = comments
  console.log("CommentList comments: ", comment_list, " length: ", comment_list.length, "designid: ", designid)
  return (
    <div className="commentList">
      <h5 className="text-muted mb-4">
        <span className="badge badge-success">{comment_list.length}</span>{" "}
        Comment{comment_list.length > 0 ? "s" : ""}
      </h5>

      {comment_list.length === 0 ? (
        <span className="title5">
          첫번째 댓글을 남겨주세요
        </span>
      ) : null}

      {comment_list.map(comment =>
        <ul key={comment.id}>
          <Comment designid={designid} comment={comment} />
        </ul>
      )}

    </div>
  );
}


export default CommentList
