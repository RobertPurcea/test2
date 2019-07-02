import React, { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import Header from "./components/Header";
import Post from "./components/Post";
import { maxNumberOfPosts, stepForPostFetching } from "./util/constants";
import { fetchPosts, getCommentsForPost } from "./api/getResources";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const getNextRowOfPosts = () => {
    const lastPostId = posts.length === 0 ? 1 : posts[posts.length - 1].id;

    fetchPosts({ start: lastPostId, step: stepForPostFetching }).then(
      ({ data }) => setPosts([...posts, ...data])
    );
  };

  if (posts.length === 0) {
    getNextRowOfPosts();
  }

  return (
    <div>
      <Header title="I am a header. I need some styling" />

      <InfiniteScroll
        dataLength={posts.length}
        next={getNextRowOfPosts}
        hasMore={posts.length !== maxNumberOfPosts}
        loader={<h4>Loading...</h4>}
      >
        {posts.map(({ body, title, id }) => (
          <Post
            key={id}
            body={body}
            title={title}
            comments={comments.filter(({ postId }) => postId === id)}
            onClick={() => {
              // do not re-fetch data if we already have the comments for one post
              if (comments.find(comment => comment.postId === id)) {
                return;
              }

              getCommentsForPost({ postId: id }).then(({ data }) => {
                setComments([...comments, ...data]);
              });
            }}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default App;
