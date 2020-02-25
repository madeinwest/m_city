import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayot'

import FormField from '../../ui/formFields'
import {validate} from '../../ui/misc'
import {firebasePlayers, firebaseDB, firebase} from '../../../firebase';
import {firebaseLooper} from '../../ui/misc'

class AddEditPlayers extends Component {
	state = {
		playerId: '',
		formType:'',
		formError: false,
		formSuccess: '',
		defaultImg:'',
		formdata:{
			name: {
				element:'input',
				value: '',
				config:{
					label:'Player Name',
					name:'player_name_input',
					type: 'text',
				},
				validation:{
					required: true,
				},
				showlabel: true,
				valid: false,
				validationMessage:'',
			},
			lastname: {
				element:'input',
				value: '',
				config:{
					label:'Player Last Name',
					name:'player_lastname_input',
					type: 'text',
				},
				validation:{
					required: true,
				},
				showlabel: true,
				valid: false,
				validationMessage:'',
			},
			number: {
				element:'input',
				value: '',
				config:{
					label:'Player number',
					name:'player_number_input',
					type: 'text',
				},
				validation:{
					required: true,
				},
				showlabel: true,
				valid: false,
				validationMessage:'',
			},
			position: {
				element:'select',
				value: '',
				config:{
					label:'Select a player position',
					name:'select_position',
					type: 'select',
					options:[
						{key:'Keeper', val:'Keeper'},
						{key:'Defence', val:'Defence'},
						{key:'Midfield', val:'Midfield'},
						{key:'Striker', val:'Striker'}
					]
				},
				validation:{
					required: true,
				},
				showlabel: false,
				valid: false,
				validationMessage:'',
			},
		}
	}

	updateForm(element){
		const newFormData = {...this.state.formdata}
		const newElement = {...newFormData[element.id]}
		newElement.value = element.event.target.value

		let validData = validate(newElement)
		newElement.valid = validData[0]
		newElement.validationMessage = validData[1]
		newFormData[element.id] = newElement
		this.setState({
			formError: false,
			formdata: newFormData
		})
	}
	submitForm(event){
		event.preventDefault();
		let dataToSubmit ={}
		let formIsValid = true

		for(let key in this.state.formdata){
			dataToSubmit[key] = this.state.formdata[key].value
			formIsValid = this.state.formdata[key].valid && formIsValid
		}
		
		if(formIsValid){
			//
		}else{
			this.setState({
				formError: true
			})
		}
	}
	componentDidMount(){
		const playerId = this.props.match.params.id
		if(!playerId){
			this.setState({
				formType: 'Add player'
			})
		}else{

		}
	}
	render() {

		return (
			<AdminLayout>
				<div className="editplayers_dialog_wrapper">
					<h2>{this.state.formType}</h2>
					<div>
						<form onSubmit={evt=>this.submitForm(evt)}>
							<FormField
									id={'name'}
									formdata={this.state.formdata.name}
									change = {elem => this.updateForm(elem)}
								/>
							<FormField
									id={'lastname'}
									formdata={this.state.formdata.lastname}
									change = {elem => this.updateForm(elem)}
								/>
							<FormField
									id={'number'}
									formdata={this.state.formdata.number}
									change = {elem => this.updateForm(elem)}
								/>
							<FormField
									id={'position'}
									formdata={this.state.formdata.position}
									change = {elem => this.updateForm(elem)}
								/>
								<div className="success_label">
							{this.state.formSuccess}
						</div>
						{this.state.formError ?
							<div className="error_label">Something is wrond</div>
							:null}
							<div className="admin_submit">
						<button onClick={evt=>this.submitForm(evt)}>{this.state.formType}</button>
							</div>
						</form>
					</div>
				</div>
			</AdminLayout>
		);
	}
}

export default AddEditPlayers;