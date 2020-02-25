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
						{formdata.showlabel ? <div className="label_inputs">{formdata.config.label}</div>:null}
						<input
							{...formdata.config}
							value={formdata.value}
							onChange={(event) => change({event, id})}
						/>
						{showError()}
					</div>
				)
				break
			case('select'):
					formTamplate=(
						<div>
							{formdata.showlabel ? <div className="label_inputs">{formdata.config.label}</div>:null}
							<select
								value={formdata.value}
								onChange={(event) => change({event, id})}
							>
								<option value="">Select one</option>
								{
									formdata.config.options.map((item)=>(
										<option key={item.key} value={item.key}>
											{item.value}
										</option>
									))
								}
							</select>
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