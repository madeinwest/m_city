import React from 'react'

const FormField = ({formdata, id,change}) => {
	const showError = () => {
		let errorMessage =<div className="error_label">
			{formdata.validation && !formdata.valid ? 
			formdata.validationMessage
			:
			null}
		</div>
		return errorMessage
	}
	const renderTamplate = () => {
		let formTamplate =null;
		switch(formdata.element){
			case('input'):
				formTamplate = (
					<div>
						<input
							{...formdata.config}
							value={formdata.value}
							onChange={(event) => change({event, id})}
						/>
						{showError()}
					</div>
				)
				break
			default:
				formTamplate = null
		}
		return formTamplate
	}
	return (
		<div>
			{renderTamplate()}
		</div>
	)
}

export default FormField