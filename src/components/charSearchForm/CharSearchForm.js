import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';


import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss';

const CharSearchForm = () => {

    const [char, setChar] = useState(null); //сюда ю=будет помезатся персонаж найденный в нашей api 
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService(); //иморт из сервиса

    const onCharLoaded = (char) => { // устанавливает состояние 
        setChar(char)
    }

    const updateChar = (name) => { // запускается в мементе когда идет запрос на сервер 
        clearError();   //чистим все ошибки

        getCharacterByName(name) //делаем запрос на сервер
            .then(onCharLoaded) // получаем данные
            .then(() => setProcess('confirmed')); //FSM

    }

    const errorMessage = process === 'error' ? <div className='char__search-critical-error'><ErrorMessage/></div> : null;
    const results = !char ? null : char.length ?
                    <div className='char__search-wrapper'>
                        <div className='char__search-success'>There is! Visit {char[0].name} page?</div>
                        <Link to={`/character/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;
    
    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{ //базовое значение
                    charName: ''
                }}
                validationSchema = {Yup.object({ // валидация
                    charName: Yup.string().required('This field is required') // поле должно быть строкой и должно присутсвовать 
                })}
                onSubmit = { ({charName}) => { //выполняем updateChar, когда форма будет отправлятся  
                    updateChar(charName);
                }}>
                <>
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={process === 'loading'}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
                </>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}


export default CharSearchForm;