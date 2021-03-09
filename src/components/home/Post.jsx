import { Link } from "react-router-dom";

export default function Post(props) {
  const { user, post } = props;
  const { firstName, lastName } = user;
  const { _id, postOn, description, isEdited, likes, comments } = post;
  const postDate = new Date(postOn);
  return (
    <div className="w-full bg-navBarBg p-5 my-3">
      <div className="flex flex-col">
        <span className="text-lg font-bold">
          {firstName} {lastName}
        </span>
        <Link to={`/post/${_id}`} className="text-sm">
          {postDate.toLocaleString()}
        </Link>
      </div>
      <div className="mt-3">
        <span>{description}</span>
      </div>
    </div>
  );
}
