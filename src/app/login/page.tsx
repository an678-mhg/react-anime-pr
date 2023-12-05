import Logo from "@/components/Layout/Header/Logo";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const signInMethods = [
    {
        icons: BsGithub,
        content: "Sign in with Github",
        provider: "github",
    },
    {
        icons: FcGoogle,
        content: "Sign in with Google",
        provider: "google",
    },
];

const SignIn = () => {
    return (
        <div className="h-screen">
            <div className="p-4 flex items-center justify-between">
                <Logo className="text-[40px]" />
                <h4 className="flex items-center space-x-2">
                    <AiOutlineInfoCircle />
                    <span className="font-semibold hover:underline">Feed and help</span>
                </h4>
            </div>

            <div>
                <div className="mx-auto w-[375px] max-w-[calc(100%-32px)] text-center">
                    <h4 className="my-4 text-[32px] font-bold text-primary">
                        Log in to React Anime
                    </h4>
                    <p className="mt-3 mb-[32px] text-[15px] font-normal text-[rgba(255,255,255,0.75)]">
                        Manage your account, check notifications, comment on anime, and
                        more.
                    </p>

                    <div>
                        {signInMethods.map((item) => (
                            <button
                                // onClick={() => signIn(item.provider)}
                                key={item.provider}
                                className="relative mb-4 flex w-full items-center justify-center border border-gray-600 px-4 py-2.5 last:mb-0"
                            >
                                <div className="absolute left-4 top-[50%] translate-y-[-50%]">
                                    <item.icons size={25} />
                                </div>{" "}
                                <span className="text-[15px]">{item.content}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;