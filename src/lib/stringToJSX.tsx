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
						const [key, value] = attribute.split(":");
						styleObj[key] = value;
					});
					attributeObj[attribute.name] = styleObj;
				} else {
					attributeObj[attribute.name] = attribute.nodeValue;
				}
			});
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
