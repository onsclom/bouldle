import climbData from "../../scripts/data.json";
import gradeData from "../../scripts/grades.json";
import { random } from "../utilities/random";
import { getCurrentDateFormattedAsInt } from "../utilities/getCurrentDateFormattedAsInt";
import { haversine } from "../utilities/haversine";
import Close from "./close";
import { createSignal } from "solid-js";

export default function Guess(props) {
    const [showWarn, setShowWarn] = createSignal(false);

    const guess =
        climbData.climbs[
            climbData.climbs.map((climb) => climb.route).indexOf(props.guess)
        ];

    const todaysClimb =
        climbData.climbs[
            Math.floor(
                random(getCurrentDateFormattedAsInt()) * climbData.climbs.length
            )
        ];

    const handleLink = () => {
        setShowWarn(true);
    };

    return (
        <>
            <div
                class={`fixed top-0 left-0 w-full h-full z-10 transition-opacity ${
                    showWarn() ? "flex" : "hidden"
                } items-center justify-center`}
            >
                <div
                    class="absolute w-screen h-screen bg-black opacity-50"
                    onclick={() => {
                        setShowWarn(false);
                    }}
                />
                <div class="absolute w-3/4 h-fit bg-white rounded-lg shadow-md flex flex-col justify-center">
                    <div class="m-4">
                        <h1 class="mb-4 font-bold text-2xl">Warning!</h1>
                        <p class="text-lg">
                            This action will redirect you to{" "}
                            <span class="font-bold">{guess.route}</span>{" "}
                            Mountain Project page. This will{" "}
                            <span class="font-bold">
                                undo your current progress
                            </span>
                            . Are you sure you want to proceed?
                        </p>
                    </div>
                    <div class="flex m-4 gap-2">
                        <a
                            class="bg-slate-500 text-white p-2 rounded-lg font-bold w-1/2 text-center"
                            href={guess.link}
                        >
                            let's grow!
                        </a>
                        <button
                            class="bg-red-600 text-white p-2 rounded-lg font-bold w-1/2"
                            onclick={() => {
                                setShowWarn(false);
                            }}
                        >
                            close
                        </button>
                    </div>

                    <div class="w-full h-full flex justify-end absolute pointer-events-none">
                        <Close
                            handleClose={() => {
                                setShowWarn(false);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div class="text-white text-center mb-5">
                <div class="flex items-center gap-4 mb-5">
                    <div class="h-24 w-24 rounded-full overflow-hidden object-cover flex items-center justify-center">
                        <img
                            src={guess.image}
                            class="min-w-full min-h-full shrink"
                        />
                    </div>
                    <p
                        class="text-2xl text-black font-bold underline"
                        onclick={() => {
                            setShowWarn(true);
                        }}
                    >
                        {guess.route}
                    </p>
                </div>
                <div class="flex gap-3 mb-3 h-24">
                    <div
                        class={`w-1/3 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                            todaysClimb.grade === guess.grade
                                ? "bg-green-600"
                                : Math.abs(
                                      gradeData.grades.indexOf(
                                          todaysClimb.grade
                                      ) - gradeData.grades.indexOf(guess.grade)
                                  ) <= 4
                                ? "bg-yellow-500"
                                : "bg-slate-500"
                        }`}
                    >
                        <h1>grade</h1>
                        <p class="text-2xl h-full flex items-center">
                            {guess.grade}{" "}
                            {todaysClimb.grade !== guess.grade
                                ? gradeData.grades.indexOf(guess.grade) <
                                  gradeData.grades.indexOf(todaysClimb.grade)
                                    ? "▲"
                                    : "▼"
                                : ""}
                        </p>
                    </div>
                    <div
                        class={`w-1/4 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                            todaysClimb.length === guess.length
                                ? "bg-green-600"
                                : todaysClimb.length + 2 > guess.length &&
                                  todaysClimb.length - 2 < guess.length
                                ? "bg-yellow-500"
                                : "bg-slate-500"
                        }`}
                    >
                        <h1>length</h1>
                        <p class="text-2xl h-full flex items-center">
                            {guess.length === "" ? "N/A" : guess.length + " ft"}{" "}
                            {todaysClimb.length === "" ||
                            todaysClimb.length === guess.length ||
                            guess.length === ""
                                ? ""
                                : guess.length < todaysClimb.length
                                ? "▲"
                                : "▼"}
                        </p>
                    </div>
                    <div
                        class={`grow p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                            haversine(
                                guess.latitude,
                                guess.longitude,
                                todaysClimb.latitude,
                                todaysClimb.longitude
                            ).distance === 0
                                ? "bg-green-600"
                                : haversine(
                                      guess.latitude,
                                      guess.longitude,
                                      todaysClimb.latitude,
                                      todaysClimb.longitude
                                  ).distance <= 1
                                ? "bg-yellow-500"
                                : "bg-slate-500"
                        }`}
                    >
                        <div>distance</div>
                        <div class="text-2xl h-full flex items-center">
                            {
                                haversine(
                                    guess.latitude,
                                    guess.longitude,
                                    todaysClimb.latitude,
                                    todaysClimb.longitude
                                ).distance
                            }{" "}
                            mi{" "}
                            {haversine(
                                guess.latitude,
                                guess.longitude,
                                todaysClimb.latitude,
                                todaysClimb.longitude
                            ).distance > 0
                                ? haversine(
                                      guess.latitude,
                                      guess.longitude,
                                      todaysClimb.latitude,
                                      todaysClimb.longitude
                                  ).direction
                                : ""}
                        </div>
                    </div>
                </div>
                <div class="flex gap-3 w-full h-24">
                    <div
                        class={`w-1/2 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                            todaysClimb.area === guess.area
                                ? "bg-green-600"
                                : "bg-slate-500"
                        }`}
                    >
                        <h1>area</h1>
                        <p class="text-lg h-full flex items-center">
                            {guess.area}
                        </p>
                    </div>
                    <div
                        class={`w-1/3 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                            todaysClimb.stars === guess.stars
                                ? "bg-green-600"
                                : guess.stars < todaysClimb.stars + 0.5 &&
                                  guess.stars > todaysClimb.stars - 0.5
                                ? "bg-yellow-500"
                                : "bg-slate-500"
                        }`}
                    >
                        <h1>stars</h1>
                        <p class="text-2xl h-full flex items-center">
                            {guess.stars}{" "}
                            {todaysClimb.stars !== guess.stars
                                ? guess.stars < todaysClimb.stars
                                    ? "▲"
                                    : "▼"
                                : ""}
                        </p>
                    </div>
                    <div
                        class={`w-1/3 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                            todaysClimb.votes === guess.votes
                                ? "bg-green-600"
                                : todaysClimb.votes + 50 > guess.votes &&
                                  todaysClimb.votes - 50 < guess.votes
                                ? "bg-yellow-500"
                                : "bg-slate-500"
                        }`}
                    >
                        <h1>votes</h1>
                        <p class="text-2xl h-full flex items-center">
                            {guess.votes}{" "}
                            {todaysClimb.votes !== guess.votes
                                ? guess.votes < todaysClimb.votes
                                    ? "▲"
                                    : "▼"
                                : ""}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
