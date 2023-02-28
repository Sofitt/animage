import {proxy} from "valtio";
import {devtools, watch} from "valtio/utils";
import {StringToJSX} from '../lib/stringToJSX'

interface closure {
    parent: string,
    child: string
}
interface scene {
    _name: string,
    _cubic: string,
    _fromTo: { [key: string]: object },
    _closure: closure
}
interface state {
    _sceneNum: string|number,
    _scenes: { [key: string]: scene },
    getScene: ()=>scene,
    getSceneNum: ()=>number|string,
    getSceneList: ()=>Array<string>,
    setScene: (scene:number|string)=>void,
    removeScene: (scene:number|string)=>void,
    changeProperty: (property: string, value: any)=>void,
    composeClosure: () => JSX.Element
    getClosure: () => JSX.Element
}

const initial:state = {
    _sceneNum: 0,
    _scenes: {
        0: {
            _name: '', // Название
            _cubic: '',
            _fromTo: {
                0: {}, 100: {}
            },
            _closure: {
                parent: '<div>[child]</div>',
                child: '<div></div>'
            }
        }
    },
    getScene: function () {
        return this._scenes[this._sceneNum as string]
    },
    getSceneNum: function () {
        return this._sceneNum
    },
    getSceneList: function () {
        return Object.keys(this._scenes)
    },
    setScene: function (scene) {
        this._sceneNum = scene
    },
    removeScene: function (scene) {
        delete this._scenes[scene]
    },
    changeProperty: function (property, value) {
        const key = `_${property}`
        const scene: {[index: string]:any} = this.getScene()
        if (!scene) {
            console.log('Сцена не найдена')
            // todo запилить уведомления
            return
        }
        scene[key] = value
    },
    composeClosure: function () {
        const scene: {[index: string]:any} = this.getScene()
        const closure = {...scene._closure}
        const fullString = closure.parent.replace('[child]', closure.child)
        return fullString ? StringToJSX({domString: fullString}) : ''
    },
    getClosure: function () {
        return this.composeClosure()
    }
}

const state = proxy(
    initial
)

watch(get => {
    console.log('22', get(state._scenes[state._sceneNum]));
})
devtools(state, { name: 'state', enabled: true })
export default state
