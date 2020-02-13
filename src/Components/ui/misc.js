import React from 'react'
import {Link} from 'react-router-dom'

export const Tag = (props) => {
	const tamplate = <div
		style={{
			background: props.bck,
			fontSize:props.size,
			color:props.color,
			padding:'5px 10px',
			display:'inline-block',
			fontFamily:'Righteous'
		}}
	>{props.children}</div>

	if(props){
		return(
			<Link to={props.linkto}>
				{tamplate}
			</Link>
		)
	}else{
		return tamplate
	}
}

export const firebaseLooper = (snapshot) => {
	const data = []
	snapshot.forEach((childSnapshot)=>{
		data.push({
			...childSnapshot.val(),
			id: childSnapshot.key
		})
	})
	return data
}

export const reverseArray = (actualArray) => {
	let reversedArray = []
	for(let i=actualArray.length-1;i>=0;i--){
		reversedArray.push(actualArray[i])
	}
	return reversedArray
}