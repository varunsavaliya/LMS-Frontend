import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from "react-icons/bs";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="relative left-0 bottom-0 h-[10vh] py-5 px-3 flex flex-col sm:flex-row items-center justify-between bg-gray-800">
        <section className="flex text-red-50 text-lg">
          Copyright {currentYear} | All rights reserved
        </section>
        <div className="flex justify-between items-center gap-5">
          <a
            href="#"
            className="text-white transition-all ease-in-out duration-300 hover:text-yellow-300"
          >
            <BsFacebook />
          </a>
          <a
            href="#"
            className="text-white transition-all ease-in-out duration-300 hover:text-yellow-300"
          >
            <BsInstagram />
          </a>
          <a
            href="#"
            className="text-white transition-all ease-in-out duration-300 hover:text-yellow-300"
          >
            <BsLinkedin />
          </a>
          <a
            href="#"
            className="text-white transition-all ease-in-out duration-300 hover:text-yellow-300"
          >
            <BsTwitter />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
