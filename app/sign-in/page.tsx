import Image from "next/image";
import { Metadata } from "next";

import { redirect } from "next/navigation";
import { UserAuthForm } from "@/app/sign-in/form";
export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components."
};
export default async function AuthenticationPage() {
  // const session = await getAuthSession();

  // if (session !== null && session.user) {
  //   return redirect("/tasks");
  // }

  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/asset/sigin.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        /> */}
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex ">
          <div className="absolute inset-0 bg-zinc-900" />
          {/* <div className="relative z-20 flex items-center text-lg font-medium"></div> */}
          <div className="relative flex z-20 h-full justify-center items-center">
            {/* <div className="sm:hidden flex-auto"> */}
            <Image
              src="/asset/sigin.png"
              width={1280}
              height={843}
              alt="Authentication"
              className="block max-h-[90vh] w-auto"
            />
            {/* </div> */}
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
