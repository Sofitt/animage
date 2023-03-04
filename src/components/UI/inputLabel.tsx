import React, {SyntheticEvent} from "react";

interface input {
    name: string,
    value: string
}
interface model {
    title: string,
    name: string,
    value: string,
    handleInput: (data:input) => void
}

export default function inputLabel (props:model) {
    const handleChange = (evt:SyntheticEvent) => {
        const value = (evt.target as HTMLInputElement).value
        console.log(value.match(
            /(-?\d?\.?[0-9]*)/g
        ));
        props.handleInput({name: props.name, value})
    }
    return (
        <label className='input-label'>
            <h3 className="title">
                {props.title}
            </h3>
            <input type="text" onInput={handleChange} value={props.value}/>
        </label>
    )
}
