"use client";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

export default function Home() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [participants, setParticipants] = useState([]);
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");
    const [sessionNotes, setSessionNotes] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [refreshToken, setRefreshToken] = useState("");

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const { code } = tokenResponse;
            try {
                const response = await axios.post(
                    "http://localhost:5000/auth/create-tokens",
                    { code }
                );
                console.log("res = ", response.data);
                // console.log("ref_token = ", response.data.refresh_token);
                setIsSignedIn(true);
                setRefreshToken(response.data.refresh_token);
            } catch (error) {
                console.log("Error:", error);
            }
        },
        flow: "auth-code",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/events/create-event",
                {
                    title,
                    description,
                    date,
                    duration,
                    sessionNotes,
                    refreshToken,
                }
            );
            console.log("resSubmit = ", response.data);
        } catch (error: any) {
            console.log("Error:", error.response.data);
        }
    };

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>Google Calendar API</h1>
                {isSignedIn ? (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Event Title</label>
                            <br />
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <br />
                            <label htmlFor="description">Description</label>
                            <br />
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <br />
                            {/* <label htmlFor="participants">Participants</label>
                            <br /> */}
                            {/* <input
                                    type="text"
                                    id="participants"
                                    value={participants}
                                    onChange={(e) => setParticipants(e.target.value)}
                                /> */}
                            <br />
                            <label htmlFor="date">Date</label>
                            <br />
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <br />
                            <label htmlFor="duration">Duration</label>
                            <br />
                            <input
                                type="time"
                                id="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                            <br />
                            <label htmlFor="sessionNotes">Session Notes</label>
                            <br />
                            <input
                                type="textarea"
                                id="sessionNotes"
                                value={sessionNotes}
                                onChange={(e) =>
                                    setSessionNotes(e.target.value)
                                }
                            />
                            <br />

                            <button type="submit">Create Event</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => login()}>
                            Sign in with Google 🚀
                        </button>
                    </div>
                )}
            </main>
        </>
    );
}
