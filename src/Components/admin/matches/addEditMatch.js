import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayot'

import FormField from '../../ui/formFields'
import {validate} from '../../ui/misc'

class AddEditMatch extends Component {
	state={
		matchId: '',
		formType:'',
		formError: false,
		formSuccess: '',
		teams:[],
		formdata:{
			date: {
				element:'input',
				value: '',
				config:{
					label:'Event date',
					name:'date_input',
					type: 'date',
					showlabel: true
				},
				validation:{
					required: true,
				},
				valid: false,
				validationMessage:'',
			},
			local: {
				element:'select',
				value: '',
				config:{
					label:'Select a local team',
					name:'select_local',
					type: 'select',
					showlabel: false,
					options:[]
				},
				validation:{
					required: true,
				},
				valid: false,
				validationMessage:'',
			},
		}
	}

	render() {
		return (
			<AdminLayout>
				<div className="editmatch_dialog_wrapper">
					<h2>
						{this.state.formType}
					</h2>
					<div>
						<form onSubmit={event=>this.submitForm(event)}>
							<FormField
							id={'date'}
							formdata={this.state.formdata.date}
						/>
							<FormField
							id={'local'}
							formdata={this.state.formdata.local}
						/>
						</form>
					</div>
				</div>
			</AdminLayout>
		);
	}
}

export default AddEditMatch;