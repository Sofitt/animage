import React, {Dispatch, useState} from "react";
import {styleParser} from "../../../../../lib/styleParser";
import {numberMask} from "../../../../../lib/numberMask";
import '../../../../../assets/styles/from-to-block.css'

interface mode {
    mode: string
}

const mods:Array<mode> = [
    {mode: 'percent'},
    {mode: 'value'}
]

function DistanceBlock ({dValue}:{dValue:number}) {
    const [options, setOptions]:[object|any, Dispatch<object>] = useState({})
    const [editMode, setEdit]:[boolean, Dispatch<boolean>] = useState(false)
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
        const result = styleParser(input)
        if (!result) return
        setOptions(result as object)
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
            {`${dValue}: `}{`[ ${composedOptions(true)} ]`}
        </p>
    return (
        <div className='distance-block'>
            { content }
        </div>
    )
}

const AddBlock = (props: { addBlock: (arg0: number) => void; }):JSX.Element => {
    const [isInputShow, showInput] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const updateInputValue = (evt:React.FormEvent) => {
        const value = (evt.target as HTMLInputElement).value
        const masked = numberMask(value)
        if (masked === false) {
            return
        }
        setInputValue(masked as string)
    }
    const add = (evt:React.KeyboardEvent) => {
        if (evt.key !== 'Enter') {
            return
        }
        showInput(false)
        props.addBlock(+inputValue)
    }
    const input = <input className='add-block_input' placeholder='Шаг в процентах (0.01-99.99)' type="text" onKeyDown={add} onInput={updateInputValue} value={inputValue}/>
    const button = <button className='add-block' onClick={() => showInput(true)}>+</button>
    return (
        isInputShow ? input : button
    )
}

const Blocks = (props: { addButton: boolean }):JSX.Element => {
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
        <div className='blocks'>
            {distanceBlocks}
            {props.addButton && <AddBlock addBlock={handleUpdateBlocks}/>}
        </div>
    )
}
interface noticeData {
    toggleFunc: () => void,
    state: boolean
}
interface btns {
    mode: string,
    setMode: React.Dispatch<string>,
    noticeData: noticeData
}

const Actions = (props:btns):JSX.Element => {
    return (
        <div className="actions">
            {
                mods.map((data, i) => {
                    return <button onClick={() => props.setMode(data.mode)}
                                   key={i}
                                   className={props.mode === data.mode ? 'active' : ''}
                    >+</button>
                })
            }
            <button onClick={props.noticeData.toggleFunc}
                    className={`show-notice ${props.noticeData.state ? 'active' : ''}`}>?</button>
        </div>
    )
}

const NoticeBlock = ():JSX.Element => {
    const notices = [
        'Сепаратор выражений - ";"',
        'При дублировании стилей записывается последний написанный'
    ]
    return (
        <ol className='notice-block'>
            {notices.map((notice, i) => {
                return (
                    <li key={i}>{`${i+1}.`} {notice}</li>
                )
            })}
        </ol>
    )
}

const fromToBlock = () => {
    const [mode, setMode] = useState('percent')
    const [notice, showNotice] = useState(false)
    const toggleNotice = () => {
        showNotice(!notice)
    }
    return (
        <div className='from-to-block'>
            <div className='header'>
                <h2>From-to</h2>
                <Actions mode={mode}
                         setMode={setMode}
                         noticeData={{toggleFunc: toggleNotice, state: notice}}/>
            </div>
            {notice && <NoticeBlock/>}
            <Blocks addButton={mode === 'value'}/>
        </div>
    )
}

export default fromToBlock
