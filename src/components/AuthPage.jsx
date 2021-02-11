import { useState } from "react";
import Input from "./Input";
export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleEmail(data) {
    setEmail(data);
  }
  function handlePassword(data) {
    setPassword(data);
  }
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto flex items-center min-h-screen justify-center">
        <div className="flex flex-col">
          <h1 className="text-5xl mb-3 text-primary">copybook</h1>
          <h2 className="text-4xl">copybook สร้างขึ้นเพื่อการศึกษา</h2>
        </div>
        <div className="w-2/6 ml-32 flex flex-col justify-center">
          <div className="flex flex-col bg-white p-7 shadow-lg  rounded items-center">
            <form onSubmit={handleSubmit} className="w-full">
              <Input
                type="email"
                placeholder="อีเมลหรือหมายเลขโทรศัพท์มือถือ"
                name="email"
                onChange={(data) => handleEmail(data)}
              />
              <Input
                type="password"
                placeholder="รหัสผ่าน"
                name="password"
                onChange={(data) => handlePassword(data)}
              />
              <Input
                type="submit"
                className="bg-primary text-white pointer"
                value="เข้าสู่ระบบ"
              ></Input>
            </form>
            <a
              href="#"
              className="text-center text-primary pointer hover:underline"
            >
              ลืมรหัสผ่านใช่หรือไม่
            </a>
            <div className="my-5 bg-gray-100 h-0.5 w-full"></div>
            <a
              href="#"
              className="bg-greenFb text-white p-3 w-1/3 text-center rounded"
            >
              สร้างบัญชีใหม่
            </a>
          </div>
          <p className="mt-10 text-center">
            สร้างเพจ สำหรับบุคคลมีชื่อเสียง วงดนตรี หรือธุรกิจ
          </p>
        </div>
      </div>
    </div>
  );
}
