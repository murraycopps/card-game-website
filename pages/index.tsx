import {Game} from "@/scripts/types";
import axios from "axios";

type Props = {
    games: Game[];
};

export default function IndexPage({games}: Props) {
    // create game

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-8">
            <h1 className="text-4xl font-bold">Games</h1>
            <ul className="w-full flex flex-col items-center justify-center gap-4">
                {games.map((game) => (
                    <li key={game.id} className="w-full flex flex-col items-center justify-center gap-2">
                        <a
                            href={`/games/${game.id}`}
                            className="text-2xl font-bold"
                        >{game.name}</a>
                    </li>
                ))}
            </ul>
            <a
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
                href="/games/create"
            >Create Game
            </a>

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
