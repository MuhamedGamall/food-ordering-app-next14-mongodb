"use client";
import HeroAcountSection from "../_components/hero-acount-section";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import FormInputs from "../_components/form-inputs";

export default function CreateAcountPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  async function onSubmit({
    values,
  }: {
    values: { password: string; email: string };
  }) {
    try {
      setIsLoading(true);
      setIsError(false);
      await axios.post("/api/create-acount", values);
      toast.success("Acount created");
    } catch (error: any) {
      console.log(error);
      error.response.status === 401 ? setIsError(true) : setIsError(false);
      toast.error("Something went wrong try again");

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <HeroAcountSection />
      {/* <form onSubmit={handleFormSubmit} className=" ">
          <div className=" max-w-[90rem] mx-auto  mt-5 p-5">
            <div className="relative max-w-full md:max-w-[70%]">
              {isLoading && (
                <div className="absolute h-full w-full bg-slate-100/20 top-0 right-0 rounded-m flex items-center justify-center">
                  <Loader className="animate-spin h-6 w-6 text-sky-700" />
                </div>
              )}
              <Card className="border-none">
                <CardHeader className="space-y-1">
                  <h1 className="text-[50px] mb-5">CREATE YOUR ACCOUNT</h1>
                  <CardTitle className="text-2xl text-slate-500">
                    Create an account
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-[19px]">
                    Enter your email below to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-slate-500 ">
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      className={cn(
                        "text-[19px] py-6 border-slate-500 border-[2.5px]"
                      )}
                    >
                      <FaFacebook className="mr-2 h-6 w-6 " />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      className={cn(
                        "text-[19px] py-6 border-slate-500 border-[2.5px]"
                      )}
                    >
                      <FaGoogle className="mr-2 h-6 w-6" />
                      Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t  border-slate-500 " />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-slate-500 rounded-md px-2 text-muted-foreground text-white text-lg">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="email "
                      className="text-slate-500 text-[20px] "
                    >
                      Email
                    </Label>
                    <Input
                      className={cn(
                        "text-[22px] border-slate-500 border-[2.5px] p-6 focus:bg-slate-200"
                      )}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      disabled={isLoading}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="password"
                      className="text-slate-500 text-[20px] "
                    >
                      Password
                    </Label>
                    <Input
                      className={cn(
                        "text-[22px] border-slate-500 border-[2.5px] p-6 focus:bg-slate-200"
                      )}
                      id="password"
                      type="password"
                      placeholder="password"
                      value={password}
                      disabled={isLoading}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-y-3 justify-center items-start">
                  <span className="text-[20px] text-red-400">
                    {isError && "This account already exists."}
                  </span>
                  <span className="text-[16px] ">
                    You have already account?{" "}
                    <Link href={"login"} className="underline text-[#2D5D2A]">
                      Log In
                    </Link>
                  </span>
                  <Button
                    type="submit"
                    variant={"green"}
                    disabled={isLoading}
                    className={cn(
                      " text-white text-2xl text-center rounded-full"
                    )}
                  >
                    Create account
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form> */}
      <FormInputs onSubmit={onSubmit} isLoading={isLoading} isError={isError} />
    </>
  );
}
