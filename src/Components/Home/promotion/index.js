import React from 'react';
import PromotionAnimation from './Animation'
import Enroll from './Enroll'

const Promotion = () => {
	return (
		<div className="promotion_wrapper" style={{background:'#fff'}}>
			<div class="container">
				<PromotionAnimation />
				<Enroll/>
			</div>
		</div>
	);
};

export default Promotion;