import {proxy} from "valtio";
import {devtools} from "valtio/utils";

interface settings {
    _cubic: string,
    _delay: string,
    _duration: string,
    _direction: string,
    '_fill-mode': string,
    '_it-count': string
}
interface closure {
    parent: string,
    child: string
}
interface scene {
    _name: string,
    _settings: settings,
    _fromTo: { [key: string]: object },
    _closure: closure
}
interface state {
    _sceneNum: string|number,
    _scenes: { [key: string]: scene },
    getScene: ()=>scene,
    getSceneNum: ()=>number|string,
    getSceneList: ()=>Array<string|any>,
    getSettings: ()=>settings,
    setScene: (scene:number|string)=>void,
    addScene: ()=>void,
    removeScene: (scene:number|string)=>void,
    changeProperty: (property: string, value: any, isSettings?: boolean)=>void
    changeSettings: (property: string, value: any)=>void
}

const sceneTemplate:scene = {
    _name: '', // Название
    _settings: {
        _cubic: '',
        _delay: '',
        _duration: '',
        _direction: '',
        '_fill-mode': '',
        '_it-count': ''
    },
    _fromTo: {
        0: {}, 100: {}
    },
    _closure: {
        parent: '<div>[child]</div>',
        child: '<div></div>'
    }
}

const initial:state = {
    _sceneNum: 0,
    _scenes: {
        0: sceneTemplate
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
    getSettings: function () {
        return this.getScene()._settings
    },
    setScene: function (scene) {
        this._sceneNum = scene
    },
    addScene: function () {
        console.log(this);
        const scenesList = this.getSceneList()
        let sceneId
        if (!scenesList.length) {
            sceneId = 0
        } else {
            sceneId = +scenesList.at(-1) + 1
        }
        this._scenes[sceneId] = sceneTemplate
    },
    removeScene: function (scene) {
        delete this._scenes[scene]
    },
    changeProperty: function (property, value, isSettings = false) {
        const key = `_${property}`
        const scene: Record<string, any> = this.getScene()
        if (!scene) {
            console.log('Сцена не найдена')
            // todo запилить уведомления
            return
        }
        isSettings
            ? scene._settings[key] = value
            : scene[key] = value
    },
    changeSettings: function (property, value) {
        this.changeProperty(property, value, true)
    }
}

const state = proxy(
    initial
)

devtools(state, { name: 'state', enabled: true })
export default state
