import { Game } from "@/scripts/types";
import axios from "axios";

type Props = {
  games: Game[];
};

export default function IndexPage({games} : Props) {
  console.log(games);
  return (
    <div>
      <h1>Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <a href={`/games/${game.id}`}>{game.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const games = await axios.get<Game[]>("http://localhost:5000/games")
  console.log(games.data);
  return {
    props: {
      games: games.data,
    },
  };
}
