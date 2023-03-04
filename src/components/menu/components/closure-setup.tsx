import React, {Dispatch, useEffect, useState} from "react";
import MonacoEditor, { OnChange } from "@monaco-editor/react";
import '../../..//styles/components/closure-setup.css'
import storage from "../../../main/storage";
import {Dropdown} from "../../UI/dropdown";

const isHTMLEnclosed = (str: string) => str === '' || />/.test(str.charAt(str.length - 1))

export default function closureSetup() {
    const closure = storage.getScene()._closure
    const [parentHTML, setParentHTML] = useState(closure.parent)
    const [childHTML, setChildHTML] = useState(closure.child)
    useEffect(() => {
        if (isHTMLEnclosed(parentHTML) || isHTMLEnclosed(childHTML)) {
            storage.changeProperty('closure', {parent: parentHTML, child: childHTML})
        }
    })
    const editor = (value: string, setValue: OnChange|Dispatch<string>) => {
        return <MonacoEditor onChange={setValue as OnChange}
                             value={value}
                             options={{wordWrap: "on", wordBreak: "keepAll"}}
                             language='html'/>
    }
    return (
        <div className="closure-setup settings-block">
            <span className='notice'>Используй [child] как метку для вставки child.</span>
            <samp>
                {'<div>[child]<div>'}
            </samp>
            <Dropdown title='Parent'
                      placeholder={`<div>[child]<div> \n[child] - это место для вставки ребенка`}
                      content={
                          editor(parentHTML, setParentHTML)
                      }/>
            <Dropdown title='Child'
                      content={
                          editor(childHTML, setChildHTML)
                      }/>
        </div>
    )
}
