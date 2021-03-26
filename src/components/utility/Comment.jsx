export default function Comment(props) {
  const { commentInfo, removeComment } = props;
  const { commentOn, detail, userId, _id } = commentInfo;
  const { firstName, lastName } = userId;
  const commentDate = new Date(commentOn);
  return (
    <div className="my-3">
      <div className="flex items-center">
        <div className="my-2 p-3 inline-block bg-gray-600 rounded-xl">
          <div className="flex flex-col">
            <span>{`${firstName} ${lastName}`}</span>
            <span>{detail}</span>
          </div>
        </div>
        <div
          className="cursor-pointer ml-3 rounded-full hover:bg-gray-600 material-icons p-1"
          onClick={() => removeComment(_id)}
        >
          delete
        </div>
      </div>
      <span className="block text-xs ml-2">{commentDate.toLocaleString()}</span>
    </div>
  );
}
