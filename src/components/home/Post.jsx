import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axiosInstance/backend.instance";
import Comment from "../utility/Comment";
export default function Post(props) {
  const { user, post } = props;
  const { firstName, lastName } = user;
  const { _id, postOn, description, isEdited, likes, comments } = post;
  const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);
  const [commentDetail, setCommentDetail] = useState("");
  const postDate = new Date(postOn);
  useEffect(() => {
    const currentUserLiked = likes.filter(
      (element) => element.userId._id === user._id
    );
    if (currentUserLiked.length >= 1) setIsCurrentUserLiked(true);
    else setIsCurrentUserLiked(false);
  }, [isCurrentUserLiked, likes, user._id]);
  async function deletePost() {
    await axios.delete(`/api/post/delete/${_id}`);
    props.setShouldReRender(true);
  }
  async function handleLike() {
    if (!isCurrentUserLiked) {
      await axios.post("/api/post/like/add", {
        postId: _id,
      });
      setIsCurrentUserLiked(true);
    } else {
      await axios.post("/api/post/like/remove", {
        postId: _id,
      });
      setIsCurrentUserLiked(false);
    }
    props.setShouldReRender(true);
  }
  async function addComment(event) {
    event.preventDefault();
    await axios.post("/api/post/comment/add", {
      postId: _id,
      detail: commentDetail,
    });
    setCommentDetail("");
    props.setShouldReRender(true);
  }
  async function removeComment(commentId) {
    await axios.post("/api/post/comment/remove", {
      postId: _id,
      targetCommentId: commentId,
    });
    props.setShouldReRender(true);
  }
  function showLikeList() {
    if (likes) {
      const { firstName, lastName } = likes[0].userId;
      const firstUserName = firstName + " " + lastName;
      if (likes.length > 1) {
        return `${firstUserName} และอื่นๆอีก ${
          likes.length - 1
        } ได้ถูกใจสิ่งนี้`;
      } else {
        return `${firstUserName} ได้ถูกใจสิ่งนี้`;
      }
    }
  }
  return (
    <div className="bg-navBarBg p-5 my-3">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-bold">
            {firstName} {lastName}
          </span>
          <Link to={`/post/${_id}`} className="text-sm">
            {postDate.toLocaleString()}
          </Link>
        </div>
        <div>
          <div
            className="cursor-pointer rounded-full hover:bg-gray-600 material-icons p-2"
            onClick={deletePost}
          >
            more_horiz
          </div>
        </div>
      </div>
      <div className="mt-3">
        <span>{description}</span>
        <span>{isEdited ? "แก้ไขแล้ว" : ""}</span>
      </div>
      <div className="mt-3 text-sm text-gray-400">
        {likes.length ? showLikeList() : ""}
      </div>
      <div className="border-t-2 mt-5 p-2 border-b-2 border-gray-500 flex w-full">
        <button
          className={`w-2/4 hover:bg-gray-600 py-1 ${
            isCurrentUserLiked ? "text-primary" : ""
          }`}
          onClick={handleLike}
        >
          ถูกใจ
        </button>
        <button className="w-2/4 hover:bg-gray-600 py-1">
          แสดงความคิดเห็น
        </button>
      </div>
      <div className="mt-3">
        {comments
          ? comments.map((commentInfo) => (
              <div key={commentInfo._id}>
                <Comment
                  commentInfo={commentInfo}
                  removeComment={(commentId) => removeComment(commentId)}
                />
              </div>
            ))
          : ""}
        <form onSubmit={addComment}>
          <input
            type="text"
            onChange={(event) => setCommentDetail(event.target.value)}
            value={commentDetail}
            placeholder="แสดงความคิดเห็น"
            className="w-full bg-gray-600 py-2 px-6 rounded-full mt-3"
          ></input>
        </form>
      </div>
    </div>
  );
}
