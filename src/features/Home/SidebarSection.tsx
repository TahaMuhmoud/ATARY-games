import Title from "../../components/Title";
import { SideBarElement } from "./SideBarElement";
interface SideBarElementType {
  id: number;
  name: string;
  image_background?: string;
  logo?: string;
}
interface SidebarSectionType {
  title: string;
  list: SideBarElementType[];
  titleOnClick: () => void;
  elementOnClick: ({ id, name }: { id: number; name: string }) => void;
}
const SidebarSection = ({
  title,
  list,
  elementOnClick,
  titleOnClick,
}: SidebarSectionType) => {
  if (!list || list.length <= 0) return;
  return (
    <div className="flex flex-col gap-5">
      <Title
        title={title}
        className="hover:text-secondary cursor-pointer"
        onClick={titleOnClick}
      />
      <ul className="flex flex-col items-center gap-2">
        {list.map((el) => (
          <SideBarElement
            key={el.id}
            id={el.id}
            text={el.name}
            imgSrc={el.image_background}
            logo={el.logo}
            onClick={elementOnClick}
          />
        ))}
      </ul>

      <div
        className="w-full bg-third p-1 cursor-pointer flex items-center justify-center gap-1"
        onClick={titleOnClick}
      >
        <span>Show All</span>
      </div>
    </div>
  );
};

export default SidebarSection;
