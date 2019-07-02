import root from "./root";
import axios from "axios";

export const fetchPosts = ({ start, step }) =>
  axios.get(`${root}/posts?_start=${start}&_limit=${step}`);

export const getCommentsForPost = ({ postId }) =>
  axios.get(`${root}/comments?postId=${postId}`);
