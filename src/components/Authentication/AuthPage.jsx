import { useContext, useEffect, useState } from "react";
import Input from "../utility/Input";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../App";

export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hiddenClass, setHiddenClass] = useState("invisible");
  const [isRedirectToHome, setIsRedirectToHome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(GlobalContext);
  async function handleSubmit(event) {
    event.preventDefault();
    if (password && email) {
      setHiddenClass("invisible");
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setIsRedirectToHome(true);
          const responseUser = await axios.get(
            "http://localhost:5000/api/auth",
            { withCredentials: true }
          );
          setUser(responseUser);
        }
      } catch (err) {
        setHiddenClass("");
      }
    } else {
      setHiddenClass("");
    }
  }
  useEffect(() => {
    let source = axios.CancelToken.source();
    async function checkCookie() {
      try {
        const response = await axios.get("http://localhost:5000/api/auth", {
          withCredentials: true,
          cancelToken: source.token,
        });
        if (response.status === 200) {
          setUser(response.data);
          setIsRedirectToHome(true);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    }
    checkCookie();
    return () => source.cancel("Cancelled");
  }, [user, setUser]);
  if (isLoading) return null;
  if (isRedirectToHome) return <Redirect to="/"></Redirect>;
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
