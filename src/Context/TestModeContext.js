const { createContext, useState, useContext } = require("react");



const TestModeContext = createContext();


export const TestModeContextProvider = ({ children }) => {

    //to toggle the mode between time and words
    const [testMode, setTestMode] = useState('time')
    //changing the timer for the typing test
    const [testTime, setTestTime] = useState(15)
    //changing the words for the typing test
    const [testWords, setTestWords] = useState(10)

    //these are the values which will be provided to the children so that they can access whenever its required
    const values = {
        testMode,
        setTestMode,
        testTime,
        setTestTime,
        testWords,
        setTestWords
    }

    return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}


export const useTestMode = () => useContext(TestModeContext);

