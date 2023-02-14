import axios from "axios";
import {Game} from "@/scripts/types";
import {useRouter} from "next/router";

export default function CreatePage() {
    const router = useRouter();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        if (!formData.get("name")) {
            alert("Please enter a name");
            return;
        }

        const game = await axios.post<Game>("http://localhost:5000/games", {
            name: formData.get("name"),
        }).catch((err) => {
            alert(err.response.data)
            return err;
        });

        if (game.status === 200 && game.data.id) {
            await router.push(`/games/${game.data.id}`);
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-8">
            <h1 className="text-4xl font-bold">Create Game</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-1/3 px-4 py-2 rounded-full text-black"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Create Game</button>
            </form>
        </div>
    );
}