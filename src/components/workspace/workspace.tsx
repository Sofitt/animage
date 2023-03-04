import React, {useState, Dispatch, useMemo} from "react";
import storage from "../../main/storage";
import {subscribe} from "valtio";
import {subscribeKey} from "valtio/utils";
import '../../styles/components/workspace.css'
import {AddBtn} from "../UI/addBtn";
import {StringToJSX} from "../../lib/stringToJSX";

const ActionBtn = ({ text, onClick }:{text: string, onClick?: () => void}) => {
    return (
        <button className='action' onClick={onClick}>{text}</button>
    )
}

const scene = () => {
    const [sceneMenuShow, setSceneMenuShow] = useState(false)
    const [sceneList, updateSceneList] = useState(storage.getSceneList())
    subscribe(storage._scenes, () => {
        updateSceneList(storage.getSceneList())
    })
    return (
        <>
            <ActionBtn text={'scenes'} onClick={() => setSceneMenuShow(!sceneMenuShow)}/>
            {
                sceneMenuShow
                && <ol className="scene-menu">
                    {sceneList.map(scene => {
                        return (
                            <li key={scene} className='scene-menu_item'>
                                <span className='title'>Сцена {+scene + 1}</span>
                                <span className='status' />
                                <button onClick={() => storage.removeScene(scene)}>X</button>
                            </li>
                        )
                    })}
                    <AddBtn onClick={storage.addScene.bind(storage)}/>
                </ol>
            }
        </>
    )
}
const play = () => {
    return (
        <ActionBtn text={'play'} />
    )
}
const pause = () => {
    return (
        <ActionBtn text={'pause'} />
    )
}

const Actions = () => {
    return (
        <div className="actions">
            {play()}
            {pause()}
            {scene()}
        </div>
    )
}
const Closure = () => {
    const composeClosure = ():JSX.Element => {
        const scene: Record<string, any> = storage.getScene()
        const closure = {...scene._closure}
        const childWithClassLabel = closure.child.replace(/<\w*/, (x:string) => `${x} className="__child"`)
        const fullString = closure.parent.replace('[child]', childWithClassLabel)
        return fullString ? StringToJSX({domString: fullString}) : ''
    }
    const closureInit:JSX.Element = useMemo(() => composeClosure(), [])
    const [closure, setClosure]:[JSX.Element, Dispatch<JSX.Element>] = useState(closureInit)
    const scene = storage.getScene()
    subscribeKey(scene, '_closure', () => {
        setClosure(composeClosure())
    })
    return (
        <div className="closure">
            {closure}
        </div>
    )
}
function workspace () {
    return (
        <div className='workspace'>
            <Actions />
            <Closure />
        </div>
    )
}
export default workspace
