import Link from "next/link";
import { BiBookmarkHeart } from "react-icons/bi";

const NavBar = () => {
  return (
    <nav className="mb-0 mx-10 lg:mx-auto mt-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
         <Link href= "#home"><div className="flex items-center space-x-0">
          <BiBookmarkHeart className="text-black text-2xl" />
          <div className="text-black text-2xl font-semibold">Toniann</div>
        </div></Link>
        <div className="flex space-x-6">
          <div className="text-black text-xl font-semibold"><Link href= "#about">About Me</Link></div>
          <div className="text-black text-xl font-semibold"><Link href="#portfolio">Portfolio</Link></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
