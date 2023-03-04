import React from "react";
import storage from "../../../main/storage";

export default function ExportAnim () {
	const composeAnimation = () => {
		const scene = storage.getScene()
		const settings:Record<string, any> = storage.getSettings()
		const animConfigMap:Record<string, any> = {
			_delay: 'animation-delay',
			_duration: 'animation-duration',
			_cubic: 'animation-timing-function',
			'_it-count': 'animation-iteration-count',
			_direction: 'animation-direction',
			'_fill-mode': 'animation-fill-mode'
		}
		let anim = `animation-name: ${scene._name || 'name'};\n`
		for (const optionName in settings) {
			const setting = animConfigMap[optionName]
			const optionValue = settings[optionName]
			optionValue && (anim += `${setting}: ${optionValue};\n`)
		}
		console.log(`${'%c'}animation settings`, 'color: red;')
		console.log(anim)
	}
	const composeKeyframe = () => {
		const scene = storage.getScene()
		const name = scene._name || 'name'
		const strTemplateOpen = `@keyframe ${name} {\n`
		const strTemplateClose = `}`
		const fromTo = scene._fromTo
		let contentStr = ''
		for (const step in fromTo) {
			const stepContent:Record<string, any> = fromTo[step] // 0
			const options:Array<string> = Object.keys(stepContent) // options, color...
			contentStr += `\t${step}% {\n`
			for (let i = 0; i < options.length; i++) {
				console.log(i);
				const optionName = options[i]
				const optionValue = stepContent[optionName]
				contentStr += `\t\t${optionName}: ${optionValue};`
				if (options.length - 1 !== i) {
					contentStr += `\n`
				}
			}
			contentStr += '\n\t}\n'
		}
		console.log(`${'%c'}keyframe`, 'color: red;')
		console.log(strTemplateOpen+contentStr+strTemplateClose)
		composeAnimation()
	}
	return (
		<button onClick={composeKeyframe}>Export</button>
	)
}
