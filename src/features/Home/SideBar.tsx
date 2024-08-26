import SidebarGenresSection from "./SidebarGenresSection";
import SidebarPlatformsSection from "./SidebarPlatformsSection";

export const SideBar = () => {
  return (
    <aside className="sidebar  w-full overflow-x-hidden p-5 grid gap-10">
      <SidebarGenresSection />
      <SidebarPlatformsSection />
    </aside>
  );
};
