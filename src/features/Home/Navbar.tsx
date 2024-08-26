import { useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MenuBarContext } from "../../context/MenuBarContext";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import SearchForm from "./SearchForm";

const Navbar = () => {
  const navigate = useNavigate();

  //====
  const [, setIsShowMenuBar] = useContext(MenuBarContext);

  // ANIMATION
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.fromTo(".navbar", { y: -100 }, { y: 0 });
  });

  const { contextSafe } = useGSAP();

  const handleMenuOnClick = contextSafe(() => {
    setIsShowMenuBar(true);
  });

  return (
    <div className="navbar w-full px-5 sm:px-10 xl:px-14 flex flex-col items-center">
      <div className="w-full h-24 flex items-center justify-between">
        <div
          className="box logo h-full cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="Logo" className="w-full h-full scale-" />
        </div>
        <div className="hidden lg:block w-[500px]">
          <SearchForm />
        </div>
        <div className="box xl:hidden flex gap-5">
          <MdMenu
            size={30}
            className="hover:fill-white/50 cursor-pointer"
            onClick={() => {
              handleMenuOnClick();
            }}
          />
        </div>
      </div>
      <div className="block lg:hidden w-full">
        <SearchForm />
      </div>
    </div>
  );
};

export default Navbar;
