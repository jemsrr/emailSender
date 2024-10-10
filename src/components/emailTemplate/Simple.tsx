"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill for client-side only rendering
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type emailForm = {
  from: string;
  to: string;
  subject: string;
  description: string;
};

const emailFormSchema = z.object({
  from: z.string().min(1, { message: "email is required" }),
  to: z.string().min(1, { message: "email is required" }),
  subject: z.string().nonempty(),
  description: z.string().nonempty(),
});

const Simple = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<emailForm>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      description: `<h1>Hello [Recipient Name],</h1>
      <br/>
                <p>
                  Thank you for joining our service! We&apos;re glad to have you on
                  board.
                </p>
                <p>Feel free to explore all the features we offer.</p>
                <br/>
                <p>Best regards,</p>
                <p>The [Your Company Name] Team</p>`,
    },
  });

  const onSubmit: SubmitHandler<emailForm> = async (data) => {
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
      reset();
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
          className="p-4 bg-neutral-800 rounded-xl bg-opacity-10 drop-shadow-xl grid sm:grid-cols-2 gap-4 min-w-96 w-[60%] absolute left-[50%] -translate-x-[50%] top-[50%] translate-y-[-50%]"
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
          <div className="grid sm:col-span-2 gap-2">
            <Label className="text-base font-semibold">Subject :</Label>
            <Input type="text" {...register("subject")} />
            {errors?.subject && (
              <div className="text-destructive mt-2">
                {errors?.subject?.message}
              </div>
            )}
          </div>
          <div className="grid sm:col-span-2 gap-2">
            <Label className="text-base font-semibold">Description :</Label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ReactQuill
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-lg bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50"
                />
              )}
            />
          </div>
          <div className="sm:col-span-2 flex justify-end items-end">
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-br from-sky-300 to-emerald-300 rounded-xl font-medium text-lg w-fit h-fit "
            >
              Send Email
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Simple;
