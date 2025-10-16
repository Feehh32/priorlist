import { FaGithubSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-secondary text-white text-center py-4">
      <div className="flex justify-center items-center gap-4 my-6">
        <a
          href="https://github.com/Feehh32"
          title="Github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Meu perfil no GitHub"
        >
          <FaGithubSquare size={24} aria-hidden="true" />
        </a>
        <a
          href="mailto:fernando.mkv@gmail.com"
          title="Email"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enviar email para fernando.mkv@gmail.com"
        >
          <MdEmail size={30} aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/fernando-pereira-710448247/"
          title="Linkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Meu perfil no Linkedin"
        >
          <FaLinkedin size={24} aria-hidden="true" />
        </a>
      </div>
      <hr className="my-4 opacity-25 border-gray-400 max-w-11/12 mx-auto" />
      <p className="font-secondary text-sm">
        &copy; {new Date().getFullYear()} PriorList
      </p>
    </footer>
  );
};

export default Footer;
