import { FaX } from "react-icons/fa6";
import SidebarGenresSection from "./SidebarGenresSection";
import SidebarPlatformsSection from "./SidebarPlatformsSection";
import { MenuBarContext } from "../../context/MenuBarContext";
import { useContext } from "react";
import Footer from "./Footer";
const Menu = () => {
  const [isShowMenuBar, setIsShowMenuBar] = useContext(MenuBarContext);

  const handleMenuCloseOnClick = () => {
    setIsShowMenuBar(false);
  };

  return (
    <div
      className={`menu w-full h-full p-5 transition-all duration-[1500ms] ease-out sm:p-10 md:p-20 overflow-y-scroll bg-primary fixed top-0 left-0 z-[1000000] overflow-hidden flex flex-col items-center gap-5 ${
        isShowMenuBar
          ? "opacity-100 translate-x-0"
          : "opacity-40 -translate-x-full"
      }`}
    >
      <div
        className="absolute top-5 sm:top-10 right-5 sm:right-10 bg-third hover:bg-white/50 p-2 rounded-full cursor-pointer"
        onClick={handleMenuCloseOnClick}
      >
        <FaX size={22} />
      </div>
      <div className="">
        <img src="/logo.png" alt="" />
      </div>
      <div className="w-full sm:w-3/4 lg:w-1/2 flex flex-col sm:flex-row gap-10 justify-between">
        <SidebarGenresSection />
        <SidebarPlatformsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
