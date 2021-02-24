import { useState } from "react";
import Input from "../utility/Input";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function AuthPage() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hiddenClass, setHiddenClass] = useState("invisible");
  async function handleSubmit(event) {
    event.preventDefault();
    if (password && email) {
      setHiddenClass("invisible");
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          history.push("/");
        }
      } catch (err) {
        setHiddenClass("");
      }
    } else {
      setHiddenClass("");
    }
  }
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto flex items-center min-h-screen justify-center">
        <div className="flex flex-col">
          <h1 className="text-5xl mb-3 text-primary">copybook</h1>
          <h2 className="text-4xl">copybook สร้างขึ้นเพื่อการฝึกฝน</h2>
        </div>
        <div className="w-2/6 ml-32 flex flex-col justify-center">
          <div className="flex flex-col bg-white p-7 shadow-lg  rounded items-center">
            <form onSubmit={handleSubmit} className="w-full flex flex-col">
              <Input
                type="email"
                placeholder="อีเมลหรือหมายเลขโทรศัพท์มือถือ"
                name="email"
                onChange={(data) => setEmail(data)}
              />
              <Input
                type="password"
                placeholder="รหัสผ่าน"
                name="password"
                onChange={(data) => setPassword(data)}
              />
              <span className={`${hiddenClass} text-red-500 text-center`}>
                กรุณาใส่อีเมลหรือรหัสผ่านให้ถูกต้อง
              </span>
              <Input
                type="submit"
                className="bg-primary text-white cursor-pointer"
                value="เข้าสู่ระบบ"
              ></Input>
            </form>
            {/* <a href="#" className="text-center text-primary hover:underline">
              ลืมรหัสผ่านใช่หรือไม่
            </a> */}
            <div className="my-5 bg-gray-100 h-0.5 w-full"></div>
            <Link
              to="/register"
              className="bg-greenFb text-white p-3 w-1/3 text-center rounded"
            >
              สร้างบัญชีใหม่
            </Link>
          </div>
          <p className="mt-10 text-center">
            สร้างเพจ สำหรับบุคคลมีชื่อเสียง วงดนตรี หรือธุรกิจ
          </p>
        </div>
      </div>
    </div>
  );
}
