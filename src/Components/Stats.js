import React,{useEffect} from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { toast } from 'react-toastify';

const Stats=({wpm,
    accuracy,
    correctChars,
    incorrectChars,
    missedChars,
    extraChars,graphData})=>{


    let timeSet = new Set();
    const newGraph = graphData.filter(i => {
            if (!timeSet.has(i[0])) {
                timeSet.add(i[0]);
                return i;
            }
    });

    const pushDataTODB=()=>{
        if (isNaN(accuracy)) {
            toast.error('Invalid test', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        const resultRef=db.collection('Results');
        const { uid } = auth.currentUser;//to fetch the user id of the logged in user
        resultRef.add({
            wpm: wpm,
            accuracy: accuracy,
            timeStamp: new Date(),
            characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
            userId: uid
        }).then((res) => {
            toast.success('Result saved to DB', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((err) => {
            toast.error('Not able to save result', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }
    useEffect(() => {
        if (auth.currentUser) {
            pushDataTODB();
        } else {
            toast.warning('Login to save results', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [])

        return(
            <div className="stats-box">
                <div className="left-stats">
                    <div className="title">WPM</div>
                    <div className="subtitle">{wpm}</div>
                    <div className="title">Accuracy</div>
                    <div className="subtitle">{accuracy}</div>
                    <div className="title">Characters</div>
                    <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
                </div>
                <div className="right-stats">
                    <Graph graphData={newGraph}/>
                    
                </div>
            </div>
        )
    

}

export default Stats;