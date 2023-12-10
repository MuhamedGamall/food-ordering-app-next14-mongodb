import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

interface Username_EmailFormProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Username must be at least 1 characters.",
    })
    .max(30, { message: "Username should be on a lot of 30 characters." }),
});

export default function Username_EmailForm({
  name,
  setName,
}: Username_EmailFormProps) {
  const session = useSession();
  const loading = session.status === "loading";
  const email = session.data?.user?.email as string;
  const currentUsername = session.data?.user?.name || email?.split("@")[0];

  const { formState, register,clearErrors } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    values: {
      name: currentUsername,
    },
  });

  const { isValid, isSubmitting } = formState;

  return (
    <>
      <form className="space-y-8 relative w-full">
        <div className="flex flex-col w-full">
          <div>
            <Label className="text-slate-500 text-[20px]">Username</Label>
            <Input
              placeholder="Enter first name & last name"
              className={cn(
                "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-6 "
              )}
              {...register("name")}
              onChange={(e) => setName(e.target.value.trim())}
              name="name"
              type="text"
              required
              disabled={isSubmitting || loading}
            />
    
          </div>
          <div className="mt-[10px_!important] ">
            <Label className="text-slate-500 text-[20px] ">Email</Label>
            <Input
              value={email}
              type="email"
              className={cn(
                "text-[18px] md:text-[22px]  bg-slate-300 focus:border-slate-500 border-[2.5px] p-6 "
              )}
              disabled
            />
          </div>
        </div>
      </form>
    </>
  );
}
