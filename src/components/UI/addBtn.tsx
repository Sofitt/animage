import React, {MouseEventHandler} from "react";
import '../../styles/components/ui/addBtn.css'

export const AddBtn = (props:{onClick:MouseEventHandler}) => {
	return (
		<button onClick={props.onClick} className='add-btn'>+</button>
	)
}
