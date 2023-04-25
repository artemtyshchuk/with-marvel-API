import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";


const SinglePage = ({Component, dataType}) => { // SinglePage отвечает за логику получения одного персонажа или комикса
    const {id} = useParams(); // получаем id из url пути 
    const [data, setData] = useState(null); 
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData() // в useEffect когда наш компонент будет создаватся он будет делать запрос с помощью updateData
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded); // получить один комикс
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded); // получить одного персонажа
        }
    }

    const onDataLoaded = (data) => {
        setData(data); // получаем данные котрые записываем в useState
    }

    const errorMessage = error ? <ErrorMessage/> : null;  //отображаем либо ошибку
    const spinner = loading ? <Spinner/> : null;                //либо спинер
    const content = !(loading || error || !data) ? <Component data={data}/> : null; // либо контент

    return (   //
        <>  
            <AppBanner/>
            {errorMessage}  
            {spinner}
            {content}
        </>
    )

}

export default SinglePage;