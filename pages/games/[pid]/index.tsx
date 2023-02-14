import { Game } from "@/scripts/types";
import axios from "axios";

type Props = {
  game: Game;
};

export default function GamePage({ game }: Props) {
  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.description}</p>
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  console.log(params.pid);
  const game = await axios.get<Game>(
    `http://localhost:5000/games/${params.pid}`
  );
  return {
    props: {
      game: game.data,
    },
  };
}
