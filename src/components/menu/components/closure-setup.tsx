import React, {Dispatch, useEffect, useState} from "react";
import MonacoEditor from "@monaco-editor/react";
import '../../../assets/styles/closure-setup.css'
import storage from "../../../main/storage";

interface dropdown {
    title: string,
    saveFunc: Dispatch<string>,
    value: string,
    enclosed: boolean,
    placeholder?: string
}

const Dropdown = (props:dropdown) => {
    const [isExpand, setExpand] = useState(false)
    const toggleExpand = () => {
        setExpand(!isExpand)
    }
    const updateField = (value:string | undefined) => {
        props.saveFunc(value || '')
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
                && <MonacoEditor onChange={updateField}
                                 value={props.value}
                                 options={{wordWrap: "on", wordBreak: "keepAll"}}
                                 language='html'/>
            }
        </div>
    )
}

const isHTMLEnclosed = (str:string) => str === '' || />/.test(str.charAt(str.length - 1))

export default function closureSetup () {
    const [parentHTML, setParentHTML] = useState('')
    const [childHTML, setChildHTML] = useState('')
    useEffect(() => {
        if (isHTMLEnclosed(parentHTML) || isHTMLEnclosed(childHTML)) {
                storage.changeProperty('closure', {parent: parentHTML, child: childHTML})
            }
    })
    return (
        <div className="closure-setup settings-block">
            <span className='notice'>Используй [child] как метку для вставки child.</span>
            <samp>
                {'<div>[child]<div>'}
            </samp>
            <Dropdown title='Parent' saveFunc={setParentHTML} value={parentHTML} enclosed={isHTMLEnclosed(parentHTML)} placeholder={`<div>[child]<div> \n[child] - это место для вставки ребенка`}/>
            <Dropdown title='Child' saveFunc={setChildHTML} value={childHTML} enclosed={isHTMLEnclosed(childHTML)} />
        </div>
    )
}
