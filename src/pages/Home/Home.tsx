import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SideBar } from "../../features/Home/SideBar";

function Home() {
  // ANIMATION
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.fromTo(".sidebar", { x: -200 }, { x: 0, duration: 1 });
    gsap.fromTo(
      ".main",
      { translateX: "100%" },
      { translateX: 0, duration: 1, ease: "back.inOut" }
    );
  });

  return (
    <div className="w-full h-full flex">
      <div className="sidebar  w-1/5 hidden xl:block">
        <SideBar />
      </div>
      <main className="main w-full xl:w-4/5 overflow-x-hidden p-2 lg:p-7 xl:p-10 grid gap-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Home;
