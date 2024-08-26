import { Store } from "../../types/types";

const GameStores = ({ stores }: { stores: { store: Store }[] }) => {
  return (
    <div className="grid gap-1">
      <span className="text-white/50">Where To Buy</span>
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-5 md:text-xl">
        {stores?.map((store) => (
          <div
            key={store.store.id}
            className="bg-third hover:bg-white/50 hover:text-black px-4 py-2 rounded-lg cursor-pointer flex gap-1 items-center"
          >
            <span
              className="w-7 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: store.store.logo! }}
            ></span>
            <span>{store.store.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStores;
