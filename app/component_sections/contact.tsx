"use client";
import { motion } from "framer-motion";
import AnimateWord from "../components/animateWord";
import { useMediaQuery } from "../components/mobile";
import ContactLogos from "../components/contactLogos";
import Swal from "sweetalert2";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function Contact() {
  const isMedium = useMediaQuery("(max-width: 1023px)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/sendEmail", {
        name,
        email,
        message,
      });

      if (data.submitted) {
        Swal.fire({
          title: "Success!",
          html: "Thank you for your message.",
          icon: "success",
          confirmButtonColor: "#000000",
        }).then(() => {
          setName("");
          setEmail("");
          setMessage("");
        });
      } else {
        Swal.fire({
          title: "Error",
          html:
            data.error ||
            "Message failed to send. Please try a different method of contact.",
          icon: "error",
          confirmButtonColor: "#000000",
        });
      }
    } catch (err: any) {
      console.log(err);
      Swal.fire({
        title: "Error",
        html:
          err.response?.data?.error ||
          "Message failed to send. Please try a different method of contact.",
        icon: "error",
        confirmButtonColor: "#000000",
      });
    }
  };

  return (
    // need to chagne to animate on scroll
    <section
      id="Contact"
      className="relative w-full min-h-screen h-full flex flex-col items-center justify-between"
    >
      <div className="mt-20">
        <AnimateWord
          word="Contact"
          f_smallest="text-[2.5rem]"
          f_sm="text-5xl"
          f_lg="text-6xl"
          border_col="#ffffff"
          fill_col="transparent"
          pixel={1.5}
          delay={0}
          once={false}
          strokeDuration={2.5}
        />
      </div>
      <form
        onSubmit={onSubmit}
        className="w-[75%] min-w-64 max-w-[800px] text-white flex flex-col justify-center gap-5 relative"
      >
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 bg-transparent border-[1px] rounded-xl border-gray-200 placeholder:text-gray-400 outline-none focus:border-gray-200 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 transition-shadow"
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 bg-transparent border-[1px] rounded-xl border-gray-200 placeholder:text-gray-400 outline-none focus:border-gray-200 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 transition-shadow"
          placeholder="Email"
        />
        <textarea
          name="message"
          className="w-full h-28 sm:h-40 resize-none my-2 py-4 px-3 bg-transparent border-[1px] rounded-xl border-gray-200 placeholder:text-gray-400 outline-none focus:border-gray-200 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 transition-shadow"
          placeholder="Enter your message!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <motion.button
          className="absolute -bottom-[20%] right-[0%] text-black bg-white py-2 px-6 cursor-pointer outline-none rounded-lg"
          whileHover="hover"
          initial="initial"
        >
          <p className="relative text-base md:text-lg xl:text-xl">
            <motion.span
              className="absolute bottom-0 left-0 h-[2px] bg-black cursor-pointer"
              variants={{
                initial: { width: "0%" },
                hover: { width: "100%" },
              }}
              transition={{ duration: 0.2 }}
            ></motion.span>
            Send →
          </p>
        </motion.button>
      </form>
      <div className="flex flex-col gap-6 items-center justify-center text-gray-300 p-5">
        <div className="flex flex-row gap-10 items-center justify-center">
          <ContactLogos
            svgUrl="/myContacts/linkedin.svg"
            link="https://www.linkedin.com/in/jocelyn-xu-741106289/"
            alt="linkedin"
          />
          <ContactLogos
            svgUrl="/myContacts/github.svg"
            link="https://github.com/joc31yn"
            alt="github"
          />
          <ContactLogos
            svgUrl="/myContacts/gmail.svg"
            link="mailto:joce.xxt22@gmail.com"
            alt="gmail"
          />
        </div>
        <p className="text-xs md:text-sm">
          &copy; 2025 Jocelyn Xu. All rights reserved.
        </p>
      </div>
    </section>
  );
}
