import { EnvelopeIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import ThemeSwitcher from "./theme-switcher";

const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <div
      className="flex flex-col justify-center p-4 bg-background text-foreground pt-10"
    >
      <div className="md:mx-10 border-t-2 border-t-gray-300 ">
        <div className="flex flex-col space-y-4 mt-6">
          <a
            href="mailto:blombergalexandras@gmail.com"
            className="flex items-center space-x-2 cursor-pointer w-fit"
          >
            <EnvelopeIcon className="w-6 h-6" />
            <span>blombergalexandras@gmail.com</span>
          </a>
          <a
            href="https://linkedin.com/in/alexandra-blomberg-7231a616a"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 cursor-pointer w-fit"
          >
            <UserPlusIcon className="w-6 h-6" />
            <span>LinkedIn</span>
          </a>
          <ThemeSwitcher />
        </div>
      </div>
      <p
        className="text-center pt-14 font-SansNarrow"
      >
        Alexandra Blomberg &copy; {currentDate} | &nbsp;
        <a
          href="https://github.com/blombergalex/alex-bloom"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
          </a>
      </p>
    </div>
  );
};

export default Footer;
