import { EnvelopeIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import ThemeSwitcher from "./theme-switcher";

const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <div
      data-testid="footer"
      className="flex flex-col justify-center p-4 bg-background text-foreground"
    >
      <div className="my-10 md:mx-10">
        <div className="flex flex-col space-y-4 text-sm md:text-lg">
          <a
            href="mailto:blombergalexandras@gmail.com"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <EnvelopeIcon className="w-6 h-6" />
            <span>blombergalexandras@gmail.com</span>
          </a>
          <a
            href="https://linkedin.com/in/alexandra-blomberg-7231a616a"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <UserPlusIcon className="w-6 h-6" />
            <span>LinkedIn</span>
          </a>
          <ThemeSwitcher />
        </div>
      </div>
      <p
        data-testid="bottom-text"
        className="text-center pt-14 border-t-2 border-t-gray-300 font-SansNarrow md:text-lg"
      >
        Alexandra Blomberg &copy; {currentDate} | &nbsp;
        <a
          href="https://github.com/blombergalex/alex-bloom"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          Source code
        </a>
      </p>
    </div>
  );
};

export default Footer;
