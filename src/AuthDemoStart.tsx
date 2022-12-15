import axios from "axios";
import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "./configureFirebase"
import { signInWithPopup, User } from "firebase/auth"; 

export function AuthDemoStart(): JSX.Element {
    const [lastAPIReply, setLastAPIReply] = useState<string>("");
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        function handleAuthStateChange(user: User | null) {
            setUser(user);
        }
        const unsubscribeFn = auth.onAuthStateChanged(handleAuthStateChange);
        return unsubscribeFn;
    }, [])


    async function handleFetchTimeClicked() {
        const reply = await axios.get("http://localhost:4000/");
        setLastAPIReply(reply.data);
    }

    async function handleFetchWisdomClicked() {
        //This SHOULD be hard to get, eventually.
        if (!user) {
            setLastAPIReply("Gotta login to see this buddy")
            return
        }
        try {
        const idToken: string = await user.getIdToken()
        const config = { headers: {"Authorization": "Bearer " + idToken }}
        const reply = await axios.get("http://localhost:4000/wisdom", config);
        setLastAPIReply(reply.data);
        } catch (err) {
            console.error(err)
        }
    }
    async function handleSignInClicked() {
        const userCredentials = await signInWithPopup(auth, googleAuthProvider);
        const signedInUser = userCredentials.user;
        setUser(signedInUser)
    }
    async function handleSignOutClicked() {
        await auth.signOut();
        setUser(null);
    }

    return (
        <div>
            <h2>Auth Demo</h2>

            <button onClick={handleSignInClicked}>Sign in</button>
            <button onClick={handleSignOutClicked}>Sign out</button>
            {user && <div>Hi You are signed in as: {user?.displayName}</div>}
            {user && user.photoURL && <img src={user.photoURL} alt="User"/>}
            <hr />
            <h3>Talk to the API</h3>
            <button onClick={handleFetchTimeClicked}>Fetch Time</button>
            <button onClick={handleFetchWisdomClicked}>Fetch Ancient Wisdom!</button>
            <h4>Last successful reply from API</h4>
            <div>{lastAPIReply}</div>
            <br />
            <i>(also check console for any failures)</i>

            <hr />

        </div>
    );
}

