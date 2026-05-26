import { useRef } from "react";
import { AiFillTwitterSquare } from "react-icons/ai";
import { ImFacebook2, ImGoogle2 } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { PiLockKeyFill, PiLockKeyLight } from "react-icons/pi";
import axiosInstance from "./lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const SignupLogin = () => {

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const signupRef = {
        name: useRef(null),
        email: useRef(null),
        password: useRef(null),
        confirmPassword: useRef(null),
    }

    const loginRef = {
        email: useRef(null),
        password: useRef(null),
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        const name = signupRef.name.current.value;
        const email = signupRef.email.current.value;
        const password = signupRef.password.current.value;
        const confirmPassword = signupRef.confirmPassword.current.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await axiosInstance.post("/auth/register", { name, email, password });
            console.log(res.data);
            alert("Signup successful! Please login to continue.");
            setUser(res.data.user);
            navigate("/dashboard");

        } catch (error) {
            console.error(error.message);
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = loginRef.email.current.value;
        const password = loginRef.password.current.value;

        try {
            const res = await axiosInstance.post("/auth/login", { email, password });
            console.log(res.data);
            alert("Login successful! Welcome back.");
            setUser(res.data.user);
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert("Login failed! Please check your credentials and try again.");
        }
    }

    return (
        <>
            <div className="root-main w-full flex items-center justify-center bg-black/3 font-poppins">
                <div className="max-w-300 mx-auto w-270 px-20">
                    <div className="signup-main flex items-center justify-center min-h-screen" id="signup">
                        <div className="signup-card bg-white rounded-2xl shadow-lg w-full">
                            <div className="inner-content px-15 pt-20 pb-10 flex items-center justify-center gap-28">
                                <div className="inner-left flex flex-col w-[calc(50%-56px)] pl-10">
                                    <span className="text-4xl font-bold">Sign up</span>
                                    <form className="flex flex-col gap-5 py-10 w-full text-sm" onSubmit={handleSignup}>
                                        <div className="w-full flex items-center gap-3 border-b border-gray-300 py-2 focus-within:border-[#222222]">
                                            <label htmlFor="name"><MdPerson className="text-xl" /></label>
                                            <input type="text" id="name" placeholder="Your Name" ref={signupRef.name} className="flex-1 outline-none focus:placeholder:text-[#222222]" required />
                                        </div>
                                        <div className="w-full flex items-center gap-3 border-b border-gray-300 py-2 focus-within:border-[#222222]">
                                            <label htmlFor="email"><IoMdMail className="text-xl" /></label>
                                            <input type="email" id="email" placeholder="Your Email" ref={signupRef.email} className="flex-1 outline-none focus:placeholder:text-[#222222]" required />
                                        </div>
                                        <div className="w-full flex items-center gap-3 border-b border-gray-300 py-2 focus-within:border-[#222222]">
                                            <label htmlFor="password"><PiLockKeyFill className="text-xl" /></label>
                                            <input type="password" id="password" placeholder="Password" ref={signupRef.password} className="flex-1 outline-none focus:placeholder:text-[#222222]" required />
                                        </div>
                                        <div className="w-full flex items-center gap-3 border-b border-gray-300 py-2 focus-within:border-[#222222]">
                                            <label htmlFor="confirmPassword"><PiLockKeyLight className="text-xl" /></label>
                                            <input type="password" id="confirmPassword" placeholder="Repeat Your Password" ref={signupRef.confirmPassword} className="flex-1 outline-none focus:placeholder:text-[#222222]" required />
                                        </div>
                                        <div className="w-full flex items-center justify-left py-2">
                                            <input type="checkbox" id="tandc" className="" required />
                                            <label htmlFor="tandc" className="ml-3 text-xs">I agree all the statements <a href="#" className="text-blue-500 hover:underline">Terms of service</a></label>
                                        </div>
                                        <input type="submit" value="Register" className="mt-6 self-start w-fit bg-blue-400 px-10 py-4 rounded-sm text-white cursor-pointer hover:bg-blue-500 transition-all " />
                                    </form>
                                </div>

                                <div className="inner-right w-[calc(50%-56px)] flex flex-col items-center justify-center gap-10 py-3">
                                    <img src="/assets/images/signup-image.jpg" alt="" />
                                    <a href="#login" className="text-sm underline">I am already member</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="login-main flex items-center justify-center mt-30 min-h-screen" id="login">
                        <div className="login-card bg-white rounded-2xl shadow-lg w-full">
                            <div className="inner-content px-15 pt-20 pb-20 flex items-center justify-center gap-28">
                                <div className="inner-right w-[calc(50%-56px)] flex flex-col items-center justify-center gap-12 py-3 pl-10">
                                    <img src="/assets/images/signin-image.jpg" alt="" />
                                    <a href="#signup" className="text-sm underline">Create an account</a>
                                </div>
                                <div className="inner-left flex flex-col w-[calc(50%-56px)]">
                                    <span className="text-4xl font-bold">Login</span>
                                    <form className="flex flex-col gap-5 py-10 w-full text-sm" onSubmit={handleLogin}>
                                        <div className="w-full flex items-center gap-3 border-b border-gray-300 py-2 focus-within:border-[#222222]">
                                            <label htmlFor="email"><IoMdMail className="text-xl" /></label>
                                            <input type="email" id="email" placeholder="Your Email" ref={loginRef.email} className="flex-1 outline-none focus:placeholder:text-[#222222]" required />
                                        </div>
                                        <div className="w-full flex items-center gap-3 border-b border-gray-300 py-2 focus-within:border-[#222222]">
                                            <label htmlFor="password"><PiLockKeyFill className="text-xl" /></label>
                                            <input type="password" id="password" placeholder="Password" ref={loginRef.password} className="flex-1 outline-none focus:placeholder:text-[#222222]" required />
                                        </div>
                                        <div className="w-full flex items-center justify-left py-2">
                                            <input type="checkbox" id="tandc" className="" />
                                            <label htmlFor="tandc" className="ml-3 text-xs">Remember me</label>
                                        </div>
                                        <input type="submit" value="Login" className="mt-6 self-start w-fit bg-blue-400 px-10 py-4 rounded-sm text-white cursor-pointer hover:bg-blue-500 transition-all " />
                                    </form>
                                    <div className="media w-full flex items-center mt-10 gap-2">
                                        <span className="mr-5 text-sm">Or login with </span>
                                        <ImFacebook2 className="text-2xl text-blue-800 hover:scale-130 transition-all duration-400 cursor-pointer" />
                                        <AiFillTwitterSquare className="text-3xl text-blue-500 hover:scale-130 transition-all duration-400 cursor-pointer" />
                                        <ImGoogle2 className="text-2xl text-red-600 hover:scale-130 transition-all duration-400 cursor-pointer" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupLogin;