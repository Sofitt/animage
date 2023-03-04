import React, {useState} from "react";
import '../../styles/components/ui/dropdown.css'

interface dropdown {
	title: string,
	content: JSX.Element|JSX.Element[],
	placeholder?: string
}

export const Dropdown = (props:dropdown) => {
	const [isExpand, setExpand] = useState(false)
	const toggleExpand = () => {
		setExpand(!isExpand)
	}
	return(
		<div className='dropdown'>
			<label className='header' onClick={toggleExpand}>
				<h3>
					{props.title}
				</h3>
				<span className={`icon ${isExpand ? 'active' : ''}`}>▲</span>
			</label>
			{
				isExpand
				&& props.content
			}
		</div>
	)
}
