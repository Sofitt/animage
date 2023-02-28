import '../../../../assets/styles/project-setup.css'
import InputLabel from "../../../UI/inputLabel";
import FromToBlock from "./components/fromToBlock"
import React, {useEffect, useState} from "react";
import storage from "../../../../main/storage";

interface inputModel {
    title: string,
    inputName: string
}
interface inputData {
    name: string,
    value: string
}
interface inputs {
    name: string,
    cubic: string
}

const inputsModel:Array<inputModel> = [
    {title: 'Название', inputName: 'name'},
    {title: 'Cubic-bezier', inputName: 'cubic'}
]
const inputs:inputs = {
    name: '',
    cubic: ''
}
export default function projectSetup () {
    const [value, setValue] = useState(inputs)
    const modifyValue = (obj:inputData) => {
        const tempValue = Object.assign(value, {[obj.name]: obj.value})
        setValue(tempValue)
        // todo здесь нужна подписка на изменение value. Не понял пока как
        storage.changeProperty('cubic', value.cubic)
        storage.changeProperty('name', value.name)
    }
    return (
        <fieldset className='project-setup settings-block'>
            <legend>Настройка проекта</legend>
            {
                inputsModel.map((data, i) => {
                    return <InputLabel title={data.title}
                                       key={i}
                                       name={data.inputName}
                                       handleInput={modifyValue}/>
                })
            }
            <FromToBlock />
        </fieldset>
    )
}
