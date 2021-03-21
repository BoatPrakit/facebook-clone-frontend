import { useEffect, useState } from "react";
import axios from "../../axiosInstance/backend.instance";
import Post from "./Post";
export default function MainContent(props) {
  const { user } = props;
  const [text, setText] = useState("");
  const [postCollection, setPostCollection] = useState(null);
  const [shouldReRender, setShouldReRender] = useState(false);
  async function handlePost(event) {
    event.preventDefault();
    const response = await axios.post(
      "/api/post/add",
      {
        description: text,
      },
      { withCredentials: true }
    );
    if (response.status === 200) {
      setShouldReRender(true);
      setText("");
    }
  }

  useEffect(() => {
    async function getPosts() {
      const response = await axios.get("/api/post/mypost", {
        withCredentials: true,
      });
      const posts = response.data;
      if (posts) {
        if (posts.allPost.length) setPostCollection(posts.allPost);
        else setPostCollection(null);
      }
    }
    getPosts();
    setShouldReRender(false);
  }, [shouldReRender]);
  return (
    <div className="flex w-full justify-center">
      <div className="w-main">
        <div className="w-full bg-navBarBg p-5">
          <form onSubmit={handlePost}>
            <input
              type="text"
              placeholder={`คุณกำลังคิดอะไรอยู่ ${user.firstName}`}
              className="bg-gray-600 w-full p-3 rounded"
              onChange={(event) => {
                setText(event.target.value);
              }}
              value={text}
            />
            <div className="flex mt-4 w-1/4 justify-between">
              <button type="submit" className="bg-primary rounded p-2 px-5">
                โพสต์
              </button>
              <button
                onClick={() => setText("")}
                className="p-2 px-5 rounded bg-gray-600"
                type="button"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col-reverse mt-3">
          {postCollection
            ? postCollection.map((post) => (
                <div key={post.postId._id}>
                  <Post
                    user={user}
                    post={post.postId}
                    setShouldReRender={(value) => setShouldReRender(value)}
                  />
                </div>
              ))
            : "คุณไม่มี Post ใดๆ"}
        </div>
      </div>
    </div>
  );
}
