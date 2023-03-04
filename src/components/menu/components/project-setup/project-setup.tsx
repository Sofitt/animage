import '../../../..//styles/components/project-setup.css'
import InputLabel from "../../../UI/inputLabel";
import FromToBlock from "./components/fromToBlock"
import {Dropdown} from "../../../UI/dropdown";
import React, {Dispatch, useEffect, useState} from "react";
import storage from "../../../../main/storage";

interface inputModel {
    title: string,
    inputName: string
}
interface inputs extends Record<string, any>{
    name: string,
    cubic: string,
    delay: string,
    duration: string,
    direction: string,
    'fill-mode': string,
    'it-count': string
}
interface inputData {
    name: string,
    value: string
}

const inputsModel:Array<inputModel> = [
    {title: 'Cubic-bezier', inputName: 'cubic'},
    {title: 'Delay', inputName: 'delay'},
    {title: 'Duration', inputName: 'duration'},
    {title: 'Direction', inputName: 'direction'},
    {title: 'Fill-mode', inputName: 'fill-mode'},
    {title: 'It-count', inputName: 'it-count'}
]
const inputs:inputs = {
    name: '',
    cubic: '',
    delay: '',
    duration: '',
    direction: '',
    'fill-mode': '',
    'it-count': ''
}
export default function projectSetup () {
    const [inputValues, setValue]:[inputs, Dispatch<inputs>] = useState(inputs)
    const modifyValue = (obj:inputData) => {
        setValue({...inputValues, [obj.name]: obj.value})
    }
    useEffect(() => {
        for (const key in inputValues) {
            storage.changeSettings(key, inputValues[key])
        }
    }, [inputValues])
    return (
        <fieldset className='project-setup settings-block'>
            <legend>Настройка проекта</legend>
            <InputLabel title='Название'
                        name='name'
                        value={inputValues.name}
                        handleInput={modifyValue}/>
            <Dropdown title='Animation-settings' content={
                inputsModel.map((data, i) => {
                    const value = inputValues[data.inputName]
                    return <InputLabel title={data.title}
                                       key={i}
                                       name={data.inputName}
                                       value={value}
                                       handleInput={modifyValue}/>
                })
            }/>
            <FromToBlock />
        </fieldset>
    )
}
