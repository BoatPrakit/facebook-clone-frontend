import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Input from "../utility/Input";
import axios from "axios";
export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDOB] = useState(null);
  const history = useHistory();
  async function handleRegister(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          firstName: name,
          lastName: lastName,
          email: email,
          password: password,
          dob: dob,
          gender: document.querySelector("input[name=gender]").value,
        }
      );
      if (response.status === 200) {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-blue-800 text-white p-5 flex justify-center items-center">
        <div className="flex justify-between w-4/6 container">
          <Link to="/" className="text-3xl">
            copybook
          </Link>
          <Link to="/" className="bg-blue-900 p-2">
            เข้าสู่ระบบด้วยบัญชีที่มีอยู่แล้ว
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-10">
          <h2 className="text-4xl">สร้างบัญชีใหม่</h2>
          <h3 className="text-2xl text-gray-500">ง่ายและเร็ว</h3>
          <form className="mt-6" onSubmit={handleRegister}>
            <div className="flex">
              <Input
                type="text"
                placeholder="ชื่อ"
                onChange={(value) => setName(value)}
              ></Input>
              <Input
                type="text"
                placeholder="นามสกุล"
                className="ml-3"
                onChange={(value) => setLastName(value)}
              ></Input>
            </div>
            <Input
              type="email"
              placeholder="Email"
              onChange={(value) => setEmail(value)}
            ></Input>
            <Input
              type="password"
              placeholder="รหัสผ่าน"
              onChange={(value) => setPassword(value)}
            ></Input>
            <h3 className="text-2xl mb-5 text-gray-500">วันเกิด</h3>
            <Input
              type="date"
              name="dob"
              onChange={(value) => setDOB(new Date(value).getTime())}
            ></Input>
            <h3 className="text-2xl text-gray-500">เพศ</h3>
            <div className="flex">
              <div className="flex items-center">
                <input type="radio" value="M" name="gender" id="M" />
                <label for="M" className="ml-2">
                  ชาย
                </label>
              </div>
              <div className="flex items-center ml-5">
                <input type="radio" value="F" name="gender" id="F" />
                <label for="F" className="ml-2">
                  หญิง
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-greenFb text-white p-3 w-1/3 text-center rounded mt-5"
            >
              สมัคร
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
