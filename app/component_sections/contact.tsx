"use client";
import { motion } from "framer-motion";
import AnimateWord from "../components/animateWord";
import ContactLogos from "../components/contactLogos";
import Swal from "sweetalert2";
import { FormEvent, useState } from "react";
import SectionWrapper from "../hoc/SectionWrapper";
import { SiGithub } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";
import { BiLogoGmail } from "react-icons/bi";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error("Failed to send email");
      }

      const data = await res.json();

      if (data.submitted) {
        Swal.fire({
          title: "Success!",
          html: "Thank you for your message.",
          icon: "success",
          confirmButtonColor: "#000000",
          allowOutsideClick: false,
        }).then(() => {
          setName("");
          setEmail("");
          setMessage("");
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      Swal.fire({
        title: "Error",
        html: "Message failed to send. Please try again or a different method of contact.",
        icon: "error",
        confirmButtonColor: "#000000",
        allowOutsideClick: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="Contact"
      className="relative w-full min-h-screen h-full flex flex-col items-center justify-between"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading" className="sr-only">
        Contact Me
      </h2>
      <div className="mt-12">
        <AnimateWord
          word="Contact"
          f_smallest="text-5xl"
          f_sm="text-5xl"
          f_lg="text-6xl"
          border_col="#ffffff"
          fill_col="transparent"
          pixel={1.5}
          delay={0}
          strokeDuration={2.5}
        />
      </div>
      <form
        onSubmit={onSubmit}
        className="w-[100%] min-w-64 max-w-[800px] text-white flex flex-col justify-center gap-5 relative"
        aria-describedby="contact-instructions"
      >
        <label htmlFor="name" className="sr-only">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 bg-transparent border-[1px] rounded-xl border-gray-200 placeholder:text-gray-400 outline-none focus:border-gray-200 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 transition-shadow"
          placeholder="Full Name"
          required
        />
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 bg-transparent border-[1px] rounded-xl border-gray-200 placeholder:text-gray-400 outline-none focus:border-gray-200 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 transition-shadow"
          placeholder="Email"
        />
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full h-32 sm:h-40 resize-none my-2 py-4 px-3 bg-transparent border-[1px] rounded-xl border-gray-200 placeholder:text-gray-400 outline-none focus:border-gray-200 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 transition-shadow"
          placeholder="Enter your message!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <motion.button
          type="submit"
          disabled={loading}
          className={`absolute -bottom-[20%] right-[0%] py-2 px-6 rounded-lg outline-none transition-colors
            ${
              loading
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-white text-black cursor-pointer"
            }`}
          whileHover={!loading ? "hover" : undefined}
          initial="initial"
        >
          <p className="relative text-base md:text-lg xl:text-xl">
            {loading ? "Sending..." : "Send →"}
            {!loading && (
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-black cursor-pointer"
                variants={{
                  initial: { width: "0%" },
                  hover: { width: "100%" },
                }}
                transition={{ duration: 0.2 }}
              ></motion.span>
            )}
          </p>
        </motion.button>
      </form>
      <div className="flex flex-col gap-6 items-center justify-center text-gray-300 p-5">
        <div className="flex flex-row gap-10 items-center justify-center">
          <ContactLogos link="https://www.linkedin.com/in/jocelyn-xu-741106289/">
            <SlSocialLinkedin className="text-black w-6 h-6" />
          </ContactLogos>
          <ContactLogos link="https://github.com/joc31yn">
            <SiGithub className="text-black w-6 h-6" />
          </ContactLogos>
          <ContactLogos link="mailto:joce.xxt22@gmail.com">
            <BiLogoGmail className="text-black w-6 h-6" />
          </ContactLogos>
        </div>
        <p className="text-xs md:text-sm">
          &copy; 2025 Jocelyn Xu. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact);
