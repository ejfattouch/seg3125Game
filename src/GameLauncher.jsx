import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button.jsx";
import React, {useState} from "react";
import {cn} from "@/lib/utils.js";

import Game from "@/components/Game.jsx";

import data1 from "@/data/data1.json"
import data2 from "@/data/data2.json"
import data3 from "@/data/data3.json"

const GameLauncher = () => {
    const [gameStart, setGameStart] = useState(false)
    const [selectedDifficulty, setSelectedDifficulty] = useState([false, false, false]);
    const [data_select, setDataSelect] = useState(null);

    const dataArray = [
        {
            data: data1,
            title: "Novice Seeker",
            desc: "Perfect for beginners.",
            hint_bg: "bg-green-300",
            hint_text_color: "text-green-800"
        },
        {
            data: data2,
            title: "Expert Seeker",
            desc: "Moderate challenge with more letter combinations.",
            hint_bg: "bg-blue-300",
            hint_text_color: "text-blue-800"
        },
        {
            data: data3,
            title: "Ultimate challenge for word masters.",
            desc: "Perfect for beginners.",
            hint_bg: "bg-purple-300",
            hint_text_color: "text-purple-800"
        }]

    const handleGameSelect = (e, index) => {
        console.log(data_select)
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        setDataSelect(index);

        const temp = [false, false, false];
        temp[index] = true;

        setSelectedDifficulty(temp);
    }

    return (
        <>
            {/*<Game setGameStart={setGameStart} charList={['C', 'A', 'T', 'D', 'O', 'G']} wordList={[{ word: 'CAT', status: 'missing' },*/}
            {/*       { word: 'DOG', status: 'missing' },*/}
            {/*       { word: 'COT', status: 'missing' },*/}
            {/*       { word: 'DOT', status: 'missing' },*/}
            {/*       { word: 'GOD', status: 'missing' },*/}
            {/*       { word: 'TAC', status: 'missing' },*/}
            {/*       { word: 'ADO', status: 'missing' },*/}
            {/*       { word: 'ACT', status: 'missing' }]} />*/}
            <div className="min-h-screen text-center container text-white flex flex-col gap-4 space-y-6 mx-auto py-12 px-4">
                <div className="flex flex-col gap-4">
                    <h1 className={"text-4xl font-bold"}>🔍 Word Seeker</h1>
                    <p className={"text-lg max-w-xl mx-auto"}>Challenge your mind and seek hidden words. Choose your difficulty level and start your word-hunting adventure!</p>
                </div>
                <div>
                    <h1 className={"text-2xl font-bold"}>Choose Your Challenge</h1>

                    <div className="grid grid-cols-1 gap-10 px-20 lg:px-0 lg:grid-cols-3 mt-6 mb-10 lg:mb-20">
                        {dataArray.map((data_set, index) => (
                            <Card
                                key={index}
                                onClick={(e) => {handleGameSelect(e, index)}}
                                className={cn(selectedDifficulty[index]? "border-primary-purple" : "border-white")}
                            >
                                <CardHeader>
                                    <CardTitle>{data_set.title}</CardTitle>
                                    <CardDescription>
                                        <p className={cn("rounded-full w-fit px-3 mx-auto", data_set.hint_bg, data_set.hint_text_color)}>
                                            {data_set.data.wordList.length} words to find
                                        </p>
                                        <p className={"mt-4 text-md"}>{data_set.desc}</p>
                                    </CardDescription>
                                    <CardContent className={"pt-3 pb-1"}>
                                        <h1 className={"font-bold text-md"}>Available Letters:</h1>
                                        <div className={"flex flex-row gap-2 flex-wrap justify-center mt-3"}>
                                            {data_set.data.charList.map((char) => (
                                                <span
                                                    key={char.toUpperCase()}
                                                    className="bg-gray-600 text-gray-100 font-bold text-2xl py-2 px-4 rounded-md"
                                                >
                                          {char.toUpperCase()}
                                        </span>
                                            ))}
                                        </div>
                                        {selectedDifficulty[index] ?
                                            <div className={"mt-6"}>
                                                <div className={"h-1 w-full bg-primary-purple"}></div>
                                            </div>:
                                            <></>}

                                    </CardContent>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                    <Button
                        className={cn( data_select === null ?  "bg-gray-400 cursor-not-allowed": "bg-primary-purple cursor-pointer", "text-2xl py-6 px-10 cursor-pointer mb-10 lg:mb-0")}
                        disabled={data_select === null}
                    >
                        Start Seeking!
                    </Button>
                </div>

            </div>
        </>
    )
}

export default GameLauncher;