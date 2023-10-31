"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Turnstile from "react-turnstile";
import Link from "next/link";
import { DotLottiePlayer } from '@dotlottie/react-player';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async data => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to send the form data.");
      }
    } catch (error) {
      console.log(error.message)
      setSubmitError("An error occurred while sending the form, try again later or send an email to privacy.xzcpl@8shield.net.");
    } finally {
      setIsSubmitting(false);
    }
  };
  register('token', { required: "Cloudflare verification token is required." });
  return (
    <div>
      {isSubmitting ? (
        <DotLottiePlayer
          src="/contact.lottie"
          autoplay
          loop
        >
        </DotLottiePlayer>
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
          Here are some details about my project: <br />
          <textarea {...register("project details", {})}
            placeholder="My project or job offer is about..."
            rows={4}
            className="w-full outline-none border-0 p-0 mx-0 focus:ring-0  placeholder:text-lg border-b border-gray focus:border-gray bg-transparent " />
          <Turnstile
            className="py-1"
            sitekey="0x4AAAAAAAMK4XAjRSyWAf1f"
            onVerify={(token) => setValue('token', token)}
          />

          {errors.name && <p role="alert" className="font-medium text-red-500 py-1">{errors.name.message}</p>}
          {errors.email && <p role="alert" className="font-medium text-red-500 py-1">{errors.email.message}</p>}
          {errors.token && <p role="alert" className="font-medium text-red-500 py-1">{errors.token.message}</p>}
          {submitError && (<p role="alert" className="font-medium text-red-500 py-1">{submitError}</p>)}

          <input type="submit" value="send request" className="mt-4 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer" />
          <p className="text-sm pt-1"> By pressing “Send Request” you agree to the <Link href="/privacy" target="_blank" rel="noopener noreferrer">Terms and Conditions and Privacy Policy.</Link></p>
        </form>
      )}
    </div>

  );
}