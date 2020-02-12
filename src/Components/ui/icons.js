import React from 'react'
import {Link} from 'react-router-dom'

import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png'

export const CityLogo = (props) => {

	const tamplate = <div
		className="img_cover"
		style={{
			width: props.width,
			height: props.height,
			background: `url(${mcitylogo}) no-repeat`
		}}
	></div>
	if(props.link){
		return(
			<Link to={props.linkTo} className="link_logo">
				{tamplate}
			</Link>
		)
	}else{
		return tamplate
	}
}