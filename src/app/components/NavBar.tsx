import Link from "next/link";
import { TbHexagonLetterTFilled } from "react-icons/tb";

const NavBar = () => {
  return (
    <nav className="p-4 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TbHexagonLetterTFilled className="text-black text-2xl" /> {/* Replace FaIconName with the actual icon name */}
          <div className="text-black text-2xl font-display">Toniann</div>
        </div>
        <div className="flex space-x-4">
          <div className="text-black text-xl font-normal"><Link href="/HireMe">Hire Me</Link></div>
          <div className="text-black text-xl font-normal"><Link href="/Portfolio">Portfolio</Link></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
