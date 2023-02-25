import React, {Dispatch, useState} from "react";
import {styleParser} from "../../../../../lib/styleParser";
import {numberMask} from "../../../../../lib/numberMask";

interface mode {
    mode: string
}

const mods:Array<mode> = [
    {mode: 'percent'},
    {mode: 'value'}
]

function DistanceBlock ({dValue}:{dValue:number}) {
    const [options, setOptions]:any = useState({})
    const [editMode, setEdit]:any = useState(false)
    const composedOptions = (transformDisplay?: boolean | undefined) => {
        // при сохранении в объект настроек дублирующие поля перезаписывают старые. Поэтому не нужно дополнительно проверять повторы
        const keys = Object.keys(options)
        return keys.reduce((composed, optionName, index) => {
            const value = options[optionName]
            let str = transformDisplay ? `${optionName}(${value})` : `${optionName}: ${value};`
            if (index < keys.length - 1) {
                str += transformDisplay ? ', ' : '\n'
            }
            return composed + str
        }, '')
    }
    const updateOptions = (evt: React.FormEvent<HTMLTextAreaElement>) => {
        const input:string|string[] = (evt.target as HTMLInputElement).value
        // todo оставить комментарий в ui, что сепаратор выражений - ";"
        const result = styleParser(input)
        if (!result) return
        setOptions(result)
    }
    const updateEdit = () => {
        setEdit(!editMode)
    }
    const content = editMode
        ? <>
            <p onClick={updateEdit}>
                {dValue}:
            </p>
            <textarea onInput={(evt) => updateOptions(evt)} defaultValue={composedOptions()}></textarea>
        </>
        : <p onClick={updateEdit}>
            {`${dValue}: `}{`[${composedOptions(true)}]`}
        </p>
    return (
        <div className='distanceBlock'>
            { content }
        </div>
    )
}

const AddBlock = (props: { addBlock: (arg0: number) => void; }):JSX.Element => {
    const [isInputShow, showInput] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const updateInputValue = (evt:Event) => {
        const value = (evt.target as HTMLInputElement).value
        const masked = numberMask(value)
        if (masked === false) {
            return
        }
        setInputValue(masked as string)
    }
    const add = (evt:KeyboardEvent) => {
        if (evt.key !== 'Enter') {
            return
        }
        showInput(false)
        props.addBlock(+inputValue)
    }
    const input = <input type="text" onKeyDown={add} onInput={updateInputValue} value={inputValue}/>
    const button = <button onClick={() => showInput(true)}>+</button>
    return (
        isInputShow ? input : button
    )
}

const block = (addButton:boolean):JSX.Element => {
    const list = [0, 100]
    const [blocks, updateBlocks] = useState(list)
    const handleUpdateBlocks = (block: number) => {
        if (blocks.indexOf(block) >= 0) {
            return
        }
        block = +(block.toFixed(2))
        const newBlocks = [...blocks, block].sort((a,b) => a-b)
        updateBlocks(newBlocks)
    }
    const distanceBlocks = blocks.map((block, i) => {
        return <DistanceBlock dValue={+block} key={i}/>
    })
    return (
        <div className="block">
            {distanceBlocks}
            {/* todo кнопка добавления блока шага */}
            {addButton && <AddBlock addBlock={handleUpdateBlocks}/>}
        </div>
    )
}

const btns = (mode:string, setMode:Dispatch<string>):JSX.Element => {
    return (
        <div className="btns">
            {
                mods.map((data, i) => {
                    return <button onClick={() => setMode(data.mode)}
                                   key={i}
                                   className={mode === data.mode ? 'active' : ''}
                    >+</button>
                })
            }
        </div>
    )
}

const fromToBlock = () => {
    const [mode, setMode] = useState('percent')
    const headerClasses = `header __${mode}`
    return (
        <div>
            <div className={headerClasses}>
                <h2>From-to</h2>
                {btns(mode, setMode)}
            </div>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span className='notice'>Сепаратор выражений - ";"</span>
            {/* todo дописать подсказку, что при повторении стилей записывается последняя найденная строка*/}
            {
                block(mode === 'value')
            }
        </div>
    )
}

export default fromToBlock
