import axios from "../../axiosInstance/backend.instance";
import { useState } from "react";
import People from "./People";
export default function SearchList() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [resultClass, setResultClass] = useState("hidden");
  const [peopleCollection, setPeopleCollection] = useState(null);
  const [text, setText] = useState("");
  async function searchPeople() {
    const queryFirstName = `?firstName=${firstName}`;
    let queryLastName = `&lastName=${lastName}`;
    if (!lastName) queryLastName = "";
    const response = await axios.get(
      `/api/user/${queryFirstName}${queryLastName}`,
      { withCredentials: true }
    );
    if (response.status === 200) {
      setPeopleCollection(response.data);
    }
    if (!response.data.length) setPeopleCollection(null);
  }
  function handleOnChange(value) {
    setText(value);
    const nameArr = value.split(" ");
    setFirstName(nameArr[0]);
    if (nameArr.length > 1) {
      setLastName(nameArr[1]);
    }
    searchPeople();
    setResultClass("");
  }
  return (
    <div className="ml-3 w-full relative">
      <input
        type="text"
        placeholder="ค้นหาเพื่อน"
        className="bg-gray-600 w-full p-2 rounded text-white"
        onChange={(event) => handleOnChange(event.target.value)}
        onBlur={() => {
          setResultClass("hidden");
          setText("");
        }}
        value={text}
      />
      <div
        className={`overflow-y-scroll p-3 max-h-40 absolute w-full bg-navBarBg text-white ${resultClass}`}
      >
        {peopleCollection
          ? peopleCollection.map((user) => (
              <div key={user._id}>
                <People user={user} />
              </div>
            ))
          : "ไม่พบบุคคลนี้"}
      </div>
    </div>
  );
}
