import Image from "../../components/Image";

export const SideBarElement = ({
  id,
  text,
  imgSrc,
  logo,
  onClick,
}: {
  id: number;
  text: string;
  imgSrc?: string;
  logo?: string;
  onClick: ({ id, name }: { id: number; name: string }) => void;
}) => {
  return (
    <li className="w-full text-lg hover:bg-third p-2 rounded-lg cursor-pointer">
      <div
        className="w-full h-full flex items-center gap-2"
        onClick={() => onClick({ id, name: text })}
      >
        <div className="min-h-12 min-w-12 max-w-12 aspect-square rounded-lg overflow-hidden bg-black grid place-items-center">
          {logo ? (
            <div
              className="w-5"
              dangerouslySetInnerHTML={{ __html: logo }}
            ></div>
          ) : (
            <Image src={imgSrc!} />
          )}
        </div>
        {text}
      </div>
    </li>
  );
};
