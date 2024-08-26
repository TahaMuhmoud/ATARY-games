import { Game } from "../../../types/types";
import { GameCard } from "./GameCard";
import ScrolledSection from "./ScrolledSection";

const GamesScrolledSection = ({ games }: { games?: Game[] }) => {
  return (
    <ScrolledSection
      style={{
        paddingLeft: "20px",
        paddingBottom: "20px",
        gap: "20px",
        zIndex: 10,
      }}
    >
      {games?.map((game: Game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </ScrolledSection>
  );
};

export default GamesScrolledSection;
