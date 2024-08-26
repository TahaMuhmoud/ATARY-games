import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

function ScrolledSection({
  style,
  children,
}: {
  style?: React.CSSProperties;
  children?: JSX.Element[] | JSX.Element;
}) {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <div
      className={
        "flex w-full h-full custom-scroll overflow-x-scroll cursor-pointer overflow-y-hidden"
      }
      style={style}
      ref={ref}
      {...events}
    >
      {children}
    </div>
  );
}

export default ScrolledSection;
