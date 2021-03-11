import { Link } from "react-router-dom";
import axios from "axios";
export default function Post(props) {
  const { user, post } = props;
  const { firstName, lastName } = user;
  const { _id, postOn, description, isEdited, likes, comments } = post;
  const postDate = new Date(postOn);
  async function deletePost() {
    await axios.delete(`http://localhost:5000/api/post/delete/${_id}`, {
      withCredentials: true,
    });
    props.setShouldReRender(true);
  }
  return (
    <div className="w-full bg-navBarBg p-5 my-3">
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
      </div>
    </div>
  );
}
