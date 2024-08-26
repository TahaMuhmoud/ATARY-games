import DropDownText from "../../components/DropDownText";

const GameDescription = ({ description }: { description?: string }) => {
  if (!description) return;
  return <DropDownText title="Details" text={description} />;
};

export default GameDescription;
