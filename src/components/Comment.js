import React from "react";

const Comment = ({ name, email, body }) => {
  return (
    <div>
      {name}
      {email}
      {body}
    </div>
  );
};

export default Comment;
