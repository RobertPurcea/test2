import React, { useState } from "react";
import Comment from "./Comment";

const Post = ({ id, title, body, comments, onClick }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div
      onClick={() => {
        setShowComments(!showComments);
        onClick();
      }}
      className="post"
    >
      <h1>title</h1>
      <div>{body}</div>
      {showComments && (
        <div className="commentContainer">
          {comments.map(({ name, email, body, id }) => (
            <Comment
              className="comment"
              name={name}
              email={email}
              body={body}
              key={id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
