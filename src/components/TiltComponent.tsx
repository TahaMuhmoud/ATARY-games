import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false,
  max: 25,
  perspective: 1000,
  scale: 1,
  speed: 500,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};
const TiltComponent = ({
  children,
  style = { height: "100%" },
}: {
  children: JSX.Element[] | JSX.Element;
  style?: React.CSSProperties;
}) => {
  return (
    <Tilt options={defaultOptions} style={style}>
      {children}
    </Tilt>
  );
};

export default TiltComponent;
