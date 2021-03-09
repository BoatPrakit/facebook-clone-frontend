import { Link } from "react-router-dom";

export default function LeftSide(props) {
  const { user } = props;
  const { firstName, lastName } = user;
  return (
    <div className="flex flex-col w-side p-3">
      <div className="flex flex-col border-b-2 border-gray-500">
        <Link to="/" className="hover:bg-gray-500 w-full p-5 rounded">
          <span>
            {firstName} {lastName}
          </span>
        </Link>
      </div>
    </div>
  );
}
