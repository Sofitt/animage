import InputLabel from "../../../UI/inputLabel";
import FromToBlock from "./components/fromToBlock"
import React, {useState} from "react";
interface inputModel {
    title: string,
    inputName: string
}
interface inputData {
    name: string,
    value: string
}

const inputsModel:Array<inputModel> = [
    {title: 'Название', inputName: 'name'},
    {title: 'Cubic-bezier', inputName: 'cubic'}
]
const inputsData:object = {
    name: '',
    cubic: ''
}

export default function projectSetup () {
    const [value, setValue] = useState(inputsData)
    const modifyValue = (obj:inputData) => {
        const tempValue = Object.assign(value, {[obj.name]: obj.value})
        setValue(tempValue)
    }
    const jsxInputs: JSX.Element[] = inputsModel.map((data, i) => {
        return <InputLabel title={data.title}
                           key={i}
                           name={data.inputName}
                           handleInput={modifyValue}/>
    })
    return (
        <fieldset>
            <legend>Настройка проекта</legend>
            {
                jsxInputs
            }
            <FromToBlock />
        </fieldset>
    )
}
