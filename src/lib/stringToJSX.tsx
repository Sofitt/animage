//@ts-nocheck
import React from "react";

type NodeArray = NodeListOf<ChildNode>

const getNodes = (str:string):NodeArray => {
	return new DOMParser().parseFromString(str, "text/html").body.childNodes;
}
const createJSX = (nodeArray) => {
	return nodeArray.map((node, index) => {
		const attributeObj = {};
		const {
			attributes,
			localName,
			childNodes,
			nodeValue
		} = node;
		const validLocalName = /^[A-Za-z0-9]*$/
		if (!validLocalName.test(localName)) {
			return nodeValue
		}
		if (attributes) {
			Array.from(attributes).forEach((attribute) => {
				if (attribute.name === "style") {
					const styleAttributes = attribute.nodeValue.split(";");
					const styleObj = {};
					styleAttributes.forEach(attribute => {
						if ( attribute && !/\d:?/.test(attribute) ) {
							const [key, value] = attribute.trim().split(":");
							const camelCaseKey = key.replace(/-\w/, x=>x[1].toUpperCase()) // fixme сбилась поддержка
							styleObj[camelCaseKey] = value;
						}
					});
					attributeObj[attribute.name] = styleObj;
				} else if (attribute.name === 'classname') {
					attributeObj.className = attribute.nodeValue;
				} else {
					attributeObj[attribute.name] = attribute.nodeValue;
				}
			});
			// console.log('attribute', attributeObj);
		}
		return localName ?
			React.createElement(
				localName,
				{...attributeObj, key: index},
				childNodes && Array.isArray(Array.from(childNodes)) ?
					createJSX(Array.from(childNodes)) :
					[]
			) :
			nodeValue;
	});
};

export const StringToJSX = ({domString}:{domString: string}) => {
	return createJSX(Array.from(getNodes(domString)));
};
