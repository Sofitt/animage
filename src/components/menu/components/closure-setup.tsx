import React, {Dispatch, useState} from "react";
import '../../../assets/styles/closure-setup.css'

interface dropdown {
    title: string,
    saveFunc: Dispatch<string>,
    value: string
}
const Dropdown = (props:dropdown) => {
    const [isExpand, setExpand] = useState(false)
    const toggleExpand = () => {
        setExpand(!isExpand)
    }
    const updateField = (evt:React.FormEvent<HTMLTextAreaElement>) => {
        const value = (evt.target as HTMLInputElement).value
        props.saveFunc(value)
    }
    return (
        <div className='dropdown'>
            <label className='header' onClick={toggleExpand}>
                <h3>
                    {props.title}
                </h3>
                <span className={`icon ${isExpand ? 'active' : ''}`}>▲</span>
            </label>
            {
                isExpand
                && <textarea onInput={updateField}
                             value={props.value}></textarea>
            }
        </div>
    )
}

export default function closureSetup () {
    const [parentHTML, setParentHTML] = useState('')
    const [childHTML, setChildHTML] = useState('')
    return (
        <div className="closure-setup settings-block">
            <Dropdown title='Parent' saveFunc={setParentHTML} value={parentHTML} />
            <Dropdown title='Child' saveFunc={setChildHTML} value={childHTML} />
        </div>
    )
}
