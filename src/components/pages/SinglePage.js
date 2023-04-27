import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setConted';



const SinglePage = ({Component, dataType}) => { // SinglePage отвечает за логику получения одного персонажа или комикса
    const {id} = useParams(); // получаем id из url пути 
    const [data, setData] = useState(null); 
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData() // в useEffect когда наш компонент будет создаватся он будет делать запрос с помощью updateData
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));  // получить один комикс
                break;
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed')); //FSM
                // получить одного персонажа
                break; 
            default:
                throw new Error('Unexpected process state')
        }
    }

    const onDataLoaded = (data) => {
        setData(data); // получаем данные котрые записываем в useState
    }


    return ( 
        <>  
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )

}

export default SinglePage;