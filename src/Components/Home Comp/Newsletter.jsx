import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiLoader } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import slider2 from "../../assets/slider2.jpg";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Newsletter = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm("service_fwh8eve", "template_60bjc2k", form.current, {
        publicKey: "vuYSD7atTVsOA0PuN",
      })
      .then(
        () => {
          Swal.fire({
            title: "Message sent",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          Swal.fire({
            title: "Something went wrong!",
            text: `${error}`,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  };

  return (
    <div className="relative min-h-[500px] flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradien(circle_500px_at_50%_50%,rgba(255,255,255,0.1),transparen)]" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slider2})`,
            opacity: 0.7,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-lg mx-auto dark:bg-slate-700/50 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-red-100 dark:border-none">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
            Join Our Collection
          </h2>
          <p className="text-gray-600  dark:text-gray-300">
            Subscribe to receive updates about new artifacts, exhibitions, and
            exclusive previews of our latest restorations.
          </p>
        </div>

        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border dark:border-none dark:text-slate-950 dark:placeholder:text-slate-950 border-gray-200 focus:ring-2 focus:ring-red-500 transition bg-white/50 dark:bg-slate-300 backdrop-blur-sm focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border dark:border-none dark:text-slate-950 dark:placeholder:text-slate-950  border-gray-200 focus:ring-2 focus:ring-red-500 transition bg-white/50 dark:bg-slate-300 backdrop-blur-sm focus:outline-none"
              required
            />
          </div>
          <input
            type="hidden"
            name="reply_to"
            value={form.current?.email?.value}
          />

          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-xl border dark:border-none dark:text-slate-950 dark:placeholder:text-slate-950 border-gray-200 focus:ring-2 focus:ring-red-500 transition bg-white/50 dark:bg-slate-300 backdrop-blur-sm focus:outline-none"
              required
            />
          </div>
          <div>
            <textarea
              type="text"
              name="message"
              placeholder="Message"
              className="w-full px-4 py-3 rounded-xl border dark:border-none dark:text-slate-950 dark:placeholder:text-slate-950 border-gray-200 focus:ring-2 focus:ring-red-500 transition bg-white/50 dark:bg-slate-300 backdrop-blur-sm focus:outline-none"
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-rose-500 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center hover:from-red-700 hover:to-rose-600 transition-all focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? (
              <>Subscribing...</>
            ) : (
              <>
                <FiSend className="mr-2" />
                Subscribe Now
              </>
            )}
          </button>
        </form>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 text-center mt-6 dark:text-gray-200">
          Join our community of history enthusiasts and artifact collectors. We
          send newsletters twice a month.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
