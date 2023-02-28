import React, {Dispatch, useState} from "react";
import {styleParser} from "../../../../../lib/styleParser";
import {numberMask} from "../../../../../lib/numberMask";
import '../../../../../assets/styles/from-to-block.css'
import storage from "../../../../../main/storage";

interface mode {
    mode: string
}

const mods:Array<mode> = [
    {mode: 'percent'},
    {mode: 'value'}
]

function DistanceBlock ({dValue, changeOptions}:{dValue:number, changeOptions: (options:object, dValue:number) => void}, ) {
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
        changeOptions(result as object, dValue)
        console.log('options', result);
    }
    const toggleEdit = () => {
        setEdit(!editMode)
    }
    return (
        <div className='distance-block'>
            { editMode
                ? (
                    <>
                        <p onClick={toggleEdit}>
                            {dValue}:
                        </p>
                        <textarea onInput={(evt) => updateOptions(evt)} defaultValue={composedOptions()}></textarea>
                    </>
                ) : (
                    <p onClick={toggleEdit}>
                        {`${dValue}: `}{`[ ${composedOptions(true)} ]`}
                    </p>
                )
            }
        </div>
    )
}

const AddBlock = (props: { addBlock: (arg0: string) => void; }):JSX.Element => {
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
        props.addBlock(inputValue)
    }
    return (
        isInputShow
            ? <input className='add-block_input'
                     placeholder='Шаг в процентах (0.01-99.99)'
                     type="text"
                     onKeyDown={add}
                     onInput={updateInputValue}
                     value={inputValue}/>
            : <button className='add-block'
                      onClick={() => showInput(true)}>+</button>
    )
}

const Blocks = (props: { addButton: boolean }):JSX.Element => {
    const list = {
        0: {},
        100: {}
    }
    const [blocks, updateBlocks]:[{[index: string]:any}, Dispatch<any>] = useState(list)
    const handleUpdateBlocks = (block: number|string) => {
        if (isNaN(+block) || blocks[block]) {
            return
        }
        block = +((+block).toFixed(2))
        const newBlocks = Object.assign({}, blocks)
        newBlocks[block] = {}
        updateBlocks(newBlocks)
        storage.changeProperty('fromTo', newBlocks)
    }
    const changeOptions = (options:object, dValue:string|number) => {
        const newBlocks = Object.assign({}, blocks)
        newBlocks[dValue] = options
        updateBlocks(newBlocks)
        storage.changeProperty('fromTo', newBlocks)
    }
    const distanceBlocks = Object.keys(blocks).map((block, i) => {
        return <DistanceBlock dValue={+block} key={i} changeOptions={changeOptions}/>
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
interface actions {
    mode: string,
    setMode: React.Dispatch<string>,
    noticeData: noticeData
}

const Actions = (props:actions):JSX.Element => {
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
