import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function Showquestions() {
    const api_url = process.env.REACT_APP_API_URL
    const [Questions, setQuestions] = useState([]);

    const fromQuestionSetter = useLocation();
    // this data contains questionids
    const data = fromQuestionSetter.state.data;
    console.log(data)


    const getQuestions = async () => {

        const responce = await fetch(`${api_url}/PreviewQuestions/getquestions`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)

        })
        const result = await responce.json();
        setQuestions(result.Data);
        if (responce.ok) {
            console.log("error occured" + result.message)
        }
        else {
            console.log(responce.status)
        }

    }
    useEffect(() => {
        getQuestions();
    }, []);


    console.log(Questions)


    return (
        <div>
            hello

        </div>
    )
}

export default Showquestions
