import { Fragment } from "react/jsx-runtime";
interface ListElement {
  id: number;
  name: string;
}
interface FlexWithTitle {
  title: string;
  list: ListElement[];
  elementOnClick?: (el: ListElement) => void;
}
const FlexWithTitle = ({
  title,
  list = [],
  elementOnClick = () => {},
}: FlexWithTitle) => {
  if (list.length <= 0) return;
  return (
    <div className="grid gap-1">
      <span className="text-white/50 grid">{title}</span>
      <div className="flex flex-wrap gap-1">
        {list.map((element) => (
          <Fragment key={element.name}>
            <span
              key={element.name}
              className="underline hover:text-white/50"
              onClick={() => elementOnClick(element)}
            >
              {element.name}
            </span>
            ,
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default FlexWithTitle;
