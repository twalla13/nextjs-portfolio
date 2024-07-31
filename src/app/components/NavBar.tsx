import Link from "next/link";
import { BiBookmarkHeart } from "react-icons/bi";

const NavBar = () => {
  return (
    <nav className=" mx-10 lg:mx-auto mt-4 bg-white mb-0">
      <div className="container mx-auto flex justify-between items-center">
         <Link href= "#home"><div className="flex items-center space-x-0">
         <BiBookmarkHeart className="text-black text-2xl" />
          <div className="text-black text-2xl font-display">Toniann</div>
        </div></Link>
        <div className="flex space-x-6">
          <div className="text-black text-xl font-display"><Link href= "#contact">Hire Me</Link></div>
          <div className="text-black text-xl font-display"><Link href="#portfolio">Portfolio</Link></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
