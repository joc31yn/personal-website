"use client";
import { motion } from "framer-motion";
import AnimateWord from "../utils/animateWord";
import { useMediaQuery } from "../utils/mobile";
import ContactLogos from "./contactLogos";
import Swal from "sweetalert2";


export default function Contact() {
  // const isSmall = useMediaQuery("(max-width: 767px)");
  const isMedium = useMediaQuery("(max-width: 1023px)");
  const temp = true
  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (temp) {
        Swal.fire({
          title: "Success!",
          html: "Thank you for your message.",
          icon: "success",
          confirmButtonColor: "#000000",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        html: "Message failed to send. Please try a different method of contact.",
        icon: "error",
        confirmButtonColor: "#000000",
      });
    }
  };

  return (
    // need to chagne to animate on scroll
    <section id="Contact" className="relative w-full h-screen">
      <AnimateWord
        word={"Contact"}
        x={"50%"}
        y={!isMedium ? "18%" : "13%"}
        f_smallest={"text-[2.5rem]"}
        f_sm={"text-5xl"}
        f_xl={"text-6xl"}
        border_col={"#ffffff"}
        fill_col={"transparent"}
        pixel={2.25}
        delay={0}
      />
      <div className="absolute top-0 left-0 w-full h-full min-h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="w-[70%] min-w-64 max-w-[800px] text-white flex flex-col justify-center gap-5 relative"
        >
          <input
            type="text"
            name="name"
            className="w-full p-3 bg-transparent border-[1px] rounded-xl border-gray-200 placeholder:text-gray-400 outline-none focus:border-white focus:shadow-[0_0_8px_0_rgba(255,255,255,0.85)] transition-shadow"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className="w-full p-3 bg-transparent border-[1px] rounded-xl border-gray-200 placeholder:text-gray-400 outline-none focus:border-white focus:shadow-[0_0_8px_0_rgba(255,255,255,0.85)] transition-shadow"
            placeholder="Email"
          />
          <textarea
            name="message"
            className="w-full h-28 sm:h-40 resize-none my-2 py-4 px-3 bg-transparent border-[1px] rounded-xl border-gray-200 placeholder:text-gray-400 outline-none focus:border-white focus:shadow-[0_0_8px_0_rgba(255,255,255,0.85)] transition-shadow"
            placeholder="Enter your message!"
            required
          ></textarea>
          <motion.button
            className="absolute -bottom-[20%] right-[0%] text-black bg-white py-2 px-6 cursor-pointer outline-none rounded-lg"
            whileHover="hover"
            initial="initial"
          >
            <p className="relative text-sm md:text-lg xl:text-xl">
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
        <div className="absolute bottom-0 flex flex-col gap-6 items-center justify-center text-gray-300 p-5">
          <div className="flex flex-row gap-10 items-center justify-center">
            <ContactLogos
              svgUrl="/linkedin.svg"
              link="https://www.linkedin.com/in/jocelyn-xu-741106289/"
              alt="linkedin"
            />
            <ContactLogos
              svgUrl="/github.svg"
              link="https://github.com/joc31yn"
              alt="github"
            />
            <ContactLogos
              svgUrl="/gmail.svg"
              link="mailto:joce.xxt22@gmail.com"
              alt="gmail"
            />
          </div>
          <p className="text-xs md:text-sm">
            &copy; 2025 Jocelyn Xu. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
