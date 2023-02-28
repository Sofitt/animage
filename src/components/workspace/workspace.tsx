import React, {useState, Dispatch} from "react";
import storage from "../../main/storage";
import '../../assets/styles/workspace.css'
import {subscribe} from "valtio";
import {subscribeKey} from "valtio/utils";
import {useSnapshot} from "valtio/react";

const ActionBtn = ({ text, onClick }:{text: string, onClick?: () => void}) => {
    return (
        <button className='action' onClick={onClick}>{text}</button>
    )
}
const AddBtn = () => {
    //
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

const workspace = () => {
    const sstorage = useSnapshot(storage)
    const closureInit:JSX.Element = storage.composeClosure()
    const [closure, setClosure]:[JSX.Element, Dispatch<JSX.Element>] = useState(closureInit)
    const scene = storage.getScene()

    subscribeKey(scene, '_closure', () => {
        console.log('sub triggerred');
        setClosure(storage.composeClosure())
    })
    return (
        <div className='workspace'>
            <Actions />
            <div className="closure">
                {/* todo вставить closure из storage */}
                {sstorage._scenes[sstorage._sceneNum]._name}
                {closure}
            </div>
        </div>
    )
}
export default workspace
