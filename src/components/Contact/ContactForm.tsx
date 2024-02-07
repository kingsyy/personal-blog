"use client";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Turnstile from "react-turnstile";
import Link from "next/link";
import { LoadingCircle } from "../Icons";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  async function onSubmit(data:FieldValues) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("message", data.message);
      formData.append("token", data.token);
      const response = await fetch("/api/contact", {
        body: formData,
        method: "POST",
      });

      if (response.ok) {
        setIsSubmitSuccess(true);
      } else {
        throw new Error("Failed to send the form data.");
      }
    } catch (error) {
      setSubmitError("An error occurred while sending the form, try again later or send an email to privacy.xzcpl@8shield.net.");
    } finally {
      setIsSubmitting(false);
    }
  };
  register('token', { required: "Cloudflare verification token is required. If it keeps " });
  return (
    <div>
      {isSubmitSuccess ? (
        <div className="text-center">
          <p className="mt-4 text-lg font-medium">
            Thanks for reaching out. We will contact you soon!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 text-base xs:text-lg sm:text-xl font-medium leading-relaxed font-in"
        >
          Hello! My name is{" "}
          <input
            type="text"
            placeholder="your name"
            {...register("name", { required: "Name is required.", maxLength: 80 })}
            className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
          />
          and I want to discuss a potential project. You can email me at
          <input type="email" placeholder="your@email" {...register("email", { required: "Email Address is required" })} className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray focus:border-gray bg-transparent
        "/>
          or reach out to me on
          <input
            type="tel"
            placeholder="your phone"
            {...register("phone", {})}
            className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
          />
          Here are some details about my project or opportunity: <br />
          <textarea {...register("message", {})}
            placeholder="My project or job offer is about..."
            rows={4}
            className="w-full outline-none border-0 p-0 mx-0 focus:ring-0  placeholder:text-lg border-b border-gray focus:border-gray bg-transparent " />
          <Turnstile
            className="py-2"
            sitekey="0x4AAAAAAAMK4XAjRSyWAf1f"
            onVerify={(token) => setValue('token', token)}
          />

          {errors.name && <p role="alert" className="font-medium text-red-500 py-1">{errors.name.message?.toString()}</p>}
          {errors.email && <p role="alert" className="font-medium text-red-500 py-1">{errors.email.message?.toString()}</p>}
          {errors.token && <p role="alert" className="font-medium text-red-500 py-1">{errors.token.message?.toString()}</p>}
          {submitError && (<p role="alert" className="font-medium text-red-500 py-1">{submitError}</p>)}

          {isSubmitting ? (
            <button type="submit" className="flex items-center mt-4 font-medium capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-not-allowed bg-gray-500 dark:text-white text-black disabled" disabled>
              <LoadingCircle />
              Sending
            </button>
          ) : (
            <>
              <input type="submit" value="send request" className="mt-4 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer" />
              <p className="text-sm pt-1"> By pressing “Send Request” you agree to the <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="!underline underline-offset-2">Terms and Conditions and Privacy Policy.</Link></p>
            </>
          )}

        </form>
      )}
    </div>

  );
}
