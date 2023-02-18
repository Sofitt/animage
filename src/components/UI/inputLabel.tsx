import React, {SyntheticEvent, useState} from "react";

interface input {
    name: string,
    value: string
}
interface model {
    title: string,
    name: string,
    handleInput: (data:input) => void
}

export default function inputLabel (props:model) {
    const [value, setValue] = useState('') // для cubic-bezier это надо, чтобы маску накладывать на данные.
    // Но есть ли в реакте слоты...
    const handleChange = (evt:SyntheticEvent) => {
        const value = (evt.target as HTMLInputElement).value
        setValue(value)
        props.handleInput({name: props.name, value})
    }
    return (
        <label>
            <h2 className="title">
                {props.title}
            </h2>
            <input type="text" onInput={handleChange}/>
        </label>
    )
}
