import { Link } from "react-router-dom";

export default function People(props) {
  const { user } = props;
  const { _id, firstName, lastName } = user;

  return (
    <div className="p-3 hover:bg-gray-500">
      <Link to={`/${_id}`} className="w-full 0">
        {firstName} {lastName}
      </Link>
    </div>
  );
}
