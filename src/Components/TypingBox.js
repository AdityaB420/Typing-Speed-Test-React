import React, { useState,useRef, useEffect, useMemo,createRef } from "react"
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";

const randomWords = require('random-words');


const TypingBox = () => {

    const inputRef=useRef(null);
    const {testTime} = useTestMode();
    const [correctChars,setCorrectChars] = useState(0);
    const [incorrectChars,setIncorrectChars] = useState(0);
    const [missedChars,setMissedChars] = useState(0);
    const [extraChars,setExtraChars] = useState(0);
    const [correctWords,setCorrectWords] = useState(0);
    const [intervalId,setIntervalId] = useState(null);
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [countDown , setCountDown] = useState(testTime);
    const [testStart, setTestStart] = useState(false);
    const [testEnd , setTestEnd] = useState(false);

    const [graphData,setGraphData] = useState([]);
    const [wordsArray, setWordsArray] = useState(() => {
        return randomWords(50)
    });

    //creating an array of references equal to the length of the wordsArray
    //useMemo is somewhat kind of useEffect itself, but instead it returns a memoized value
    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i => createRef(null))
    }, [wordsArray]);

    const startTimer = ()=>{
        const intervalId =setInterval(timer,1000);
        setIntervalId(intervalId);
        function timer(){
            setCountDown((latestCountDown)=>{

                setCorrectChars((correctChars)=>{
                    setGraphData((graphData)=>{
                        return [...graphData,[
                            testTime-latestCountDown+1,(correctChars/5)/((testTime-latestCountDown+1)/60)]];
                    });
                    return correctChars;
                })

                if(latestCountDown === 1){
                    setTestEnd(true);
                    clearInterval(intervalId);//to stop the timer
                    return 0;
                }
                return latestCountDown - 1;
            });
        }
    }

    useEffect(()=>{
        resetTest();

    },[testTime])


    //as soon as the page gets loaded up the input will be focused
    const focusInput= ()=>{
        inputRef.current.focus();
    }
    useEffect(()=>{
        focusInput();
        //it will point to the first character by referencing
        wordsSpanRef[0].current.childNodes[0].className='current';
    },[]);
    

    const handleUserInput=(e)=>{

        if(!testStart){
            startTimer();
            setTestStart(true);
        }


        //it'll give a nodelist
        const allCurrChars=wordsSpanRef[currWordIndex].current.childNodes;
        //32 is the keycode for space key
        if(e.keyCode === 32){
            
            //to get the correct characters in the typed words and comparing it to the actual length of the words
            let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
            if(correctCharsInWord.length === allCurrChars.length){
                setCorrectWords(correctWords+1);
            }

            if(allCurrChars.length<=currCharIndex){
                //remove cursor from last place in the word
                //we just to remove the current-right class
                allCurrChars[currCharIndex-1].classList.remove('current-right');
            }
            else{
                //remove cursor from inbetween the words
                setMissedChars(missedChars+(allCurrChars.length - currCharIndex));
                allCurrChars[currCharIndex].classList.remove('current');
            }
            //after pressing space bar the cursor will point out the first character of the next word
            wordsSpanRef[currWordIndex+1].current.childNodes[0].className='current';

            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex(0);
            return;

        }

        //logic for backspace(only limited to get back to one character)
        if(e.keyCode === 8){

            if(currCharIndex !==0){
                //edge case
                if(allCurrChars.length === currCharIndex){

                    if(allCurrChars[currCharIndex-1].className.includes('extra')){
                        allCurrChars[currCharIndex-1].remove();
                        allCurrChars[currCharIndex-2].className += ' current-right';
                    }
                    else{
                        allCurrChars[currCharIndex-1].className = 'current';
                    }

                    setCurrCharIndex(currCharIndex-1);
                    return;
                }

                allCurrChars[currCharIndex].className ='';
                allCurrChars[currCharIndex-1].className = 'current';
                setCurrCharIndex(currCharIndex-1);
            }
            
            

            return;
        }
        
        //in case we forgot to press space after the word then the extra words will be added to that word 
        if(currCharIndex === allCurrChars.length){
            

            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = 'incorrect extra current-right';
            allCurrChars[currCharIndex-1].classList.remove('current-right');
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex+1);
            setExtraChars(extraChars+1);
            return;
        }






        if(e.key===allCurrChars[currCharIndex].innerText){
            allCurrChars[currCharIndex].className='correct';
            setCorrectChars(correctChars+1);
        }
        else{
            allCurrChars[currCharIndex].className='incorrect';
            setIncorrectChars(incorrectChars+1);

        }
        if(currCharIndex + 1 == allCurrChars.length){
            allCurrChars[currCharIndex].className += ' current-right'//to add a classname to a existing class we have a space before giving another class name
        }
        setCurrCharIndex(currCharIndex+1);
    }

    const calculateWPM = () => {
        return Math.round((correctChars / 5) / (testTime / 60))
    }

    const calculateAccuracy= ()=>{
        return Math.round(((correctWords)/currWordIndex)*100);
    }
    

    const resetTest = () =>{
        clearInterval(intervalId);//solves the counter issue
        setCountDown(testTime);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(randomWords(50));
        resetWordSpanRefClassName();
        focusInput();

    }

    const resetWordSpanRefClassName=()=>{
        wordsSpanRef.map(i=>{
            Array.from(i.current.childNodes).map(j=>{
                j.className='';
            });
        });
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    }

    return (
    <div>

            <UpperMenu countDown = {countDown} />
            {(testEnd) ? <Stats  wpm={calculateWPM()} accuracy={calculateAccuracy()} correctChars={correctChars} incorrectChars={incorrectChars}
            missedChars={missedChars} extraChars={extraChars} graphData={graphData} />
            :(<div className="type-box" onClick={focusInput}>
                <div className="words">
                    {
                        wordsArray.map((word,index)=>(
                            <span className="word" ref={wordsSpanRef[index]}>
                                {word.split('').map(char=>(
                                    <span>{char}</span>
                                ))}
                            </span>
                        ))
                    }
                </div>
            </div>)}
            <input 
            type="text"
            ref={inputRef}
            className="hidden-input"
            onKeyDown={handleUserInput}
            />
    </div>
    )
    

}
export default TypingBox;
