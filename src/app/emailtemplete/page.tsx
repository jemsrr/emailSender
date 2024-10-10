"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type emailForm = {
  from: string;
  to: string;
};
const emailFormSchema = z.object({
  from: z.string().min(1, { message: "email is required" }),
  to: z.string().min(1, { message: "email is required" }),
});

const emailtemplate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<emailForm>({
    resolver: zodResolver(emailFormSchema),
  });
  const onSubmit: SubmitHandler<emailForm> = async (data) => {
    console.log(JSON.stringify(data), "JSON.stringify(data)");

    try {
      console.log(data, "data");
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response, "response");
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error sending email:", errorData.message);
        alert(`Error: ${errorData.message}`);
        return;
      }

      const result = await response.json();
      console.log(result.message);
      alert("Email sent successfully!");
      // Optionally reset your form fields here if you're using a controlled form
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while sending the email.");
    }
  };
  return (
    <div className="h-screen layout ">
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 bg-neutral-800 rounded-xl bg-opacity-10 drop-shadow-xl grid gap-4 min-w-96 w-[30%] absolute left-[50%] -translate-x-[50%] top-[50%] translate-y-[-50%]"
        >
          <div className="grid gap-2">
            <Label className="text-base font-semibold">From :</Label>
            <Input type="email" {...register("from")} />
            {errors?.from && (
              <div className="text-destructive mt-2">
                {errors?.from?.message}
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label className="text-base font-semibold">To :</Label>
            <Input type="email" {...register("to")} />
            {errors?.to && (
              <div className="text-destructive mt-2">{errors?.to?.message}</div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-br from-sky-300 to-emerald-300 rounded-xl font-medium text-lg w-fit "
            >
              Send Email
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default emailtemplate;
