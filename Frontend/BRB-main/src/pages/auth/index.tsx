import { FormEvent, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { login } from "../../services/authService";
import { useDispatch } from "react-redux";
import { signIn, signOut } from "../../store/authSlice";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Auth() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    login(email, password)
      .then((res) => {
        setIsLoading(false);
        toast.success("You have successfully Logged In!");
        dispatch(signIn(res.token));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error("Problem to Log In, please try again!");
        dispatch(signOut());
      });
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Login
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Login..."
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                  <input
                    type={`${isPasswordHidden ? "password" : "text"}`}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 mt-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button
                  onClick={() => {
                    setIsPasswordHidden((prev) => !prev);
                  }}
                  type="button"
                  className="absolute right-2 bottom-3"
                >
                  {!isPasswordHidden && <FiEye />}
                  {isPasswordHidden && <FaRegEyeSlash />}
                </button>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center w-[80%] h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto"
                >
                  {!isLoading && <>Sign In</>}
                  {isLoading && (
                    <PropagateLoader
                      color="white"
                      style={{ marginBottom: "18px" }}
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
