import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function RightSide(props) {
  const [friends, setFriends] = useState(null);
  useEffect(() => {
    async function requestFriendList() {
      const response = await axios.get(
        `http://localhost:5000/relationship/friends`,
        { withCredentials: true }
      );
      setFriends(response.data);
    }
    requestFriendList();
  });
  return (
    <div className="flex flex-col w-side p-3">
      <h1 className="text-2xl font-bold border-b-2 border-gray-500 py-3">
        รายชื่อเพื่อน
      </h1>
      <div className="pt-4">
        {friends
          ? friends.map((friend) => {
              return (
                <Link
                  to={`/${friend.userId}`}
                  className="hover:bg-gray-500 w-full p-5 rounded my-3 overflow-y-scroll"
                  key={friend.userId}
                >
                  <span>{friend.userId}</span>
                </Link>
              );
            })
          : "คุณไม่มีเพื่อนที่ออนไลน์อยู่ใน ขณะนี้"}
      </div>
    </div>
  );
}
