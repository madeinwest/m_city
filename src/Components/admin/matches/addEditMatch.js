import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayot'

import FormField from '../../ui/formFields'
import {validate} from '../../ui/misc'
import {firebaseTeams, firebaseDB, firebaseMatches} from '../../../firebase';
import {firebaseLooper} from '../../ui/misc'
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
				},
				validation:{
					required: true,
				},
				showlabel: true,
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
					options:[]
				},
				validation:{
					required: true,
				},
				showlabel: false,
				valid: false,
				validationMessage:'',
			},
			resultLocal: {
				element:'input',
				value: '',
				config:{
					label:'Result local',
					name:'result_local_input',
					type: 'text',
				},
				validation:{
					required: true,
				},
				showlabel: false,
				valid: false,
				validationMessage:'',
			},
			away: {
				element:'select',
				value: '',
				config:{
					label:'Select a away team',
					name:'select_away',
					type: 'select',
					options:[]
				},
				validation:{
					required: true,
				},
				showlabel: false,
				valid: false,
				validationMessage:'',
			},
			resultAway: {
				element:'input',
				value: '',
				config:{
					label:'Result away',
					name:'result_away_input',
					type: 'text',
				},
				validation:{
					required: true,
				},
				showlabel: false,
				valid: false,
				validationMessage:'',
			},
			referee: {
				element:'input',
				value: '',
				config:{
					label:'Referee',
					name:'date_referee',
					type: 'text',
				},
				validation:{
					required: true,
				},
				showlabel: true,
				valid: false,
				validationMessage:'',
			},
			stadium: {
				element:'input',
				value: '',
				config:{
					label:'Stadium',
					name:'date_stadium',
					type: 'text',
				},
				validation:{
					required: true,
				},
				showlabel: true,
				valid: false,
				validationMessage:'',
			},
			result: {
				element:'select',
				value: '',
				config:{
					label:'Team result',
					name:'select_result',
					type: 'select',
					options:[
						{key:'W', value:'W'},
						{key:'D', value:'D'},
						{key:'L', value:'L'},
						{key:'n/a', value:'n/a'},
					]
				},
				validation:{
					required: true,
				},
				showlabel: true,
				valid: false,
				validationMessage:'',
			},
			final: {
				element:'select',
				value: '',
				config:{
					label:'Game played?',
					name:'select_final',
					type: 'select',
					options:[
						{key:'Yes', value:'Yes'},
						{key:'No', value:'No'},
					]
				},
				validation:{
					required: true,
				},
				showlabel: true,
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
	updateFields(match, teamOptions, teams,type, matchId) {
		const newFormData = {
			...this.state.formdata
		}
		for(let key in newFormData){
			if(match){
				newFormData[key].value = match[key]
				newFormData[key].valid = true
			}
			if(key === 'local' || key === 'away'){
				newFormData[key].config.options = teamOptions
			}
			this.setState({
				matchId,
				formType: type,
				formdata: newFormData,
				teams
			})
		}
	}
	seccessForm(message){
		this.setState({
			formSuccess:message
		})
		setTimeout(()=>{
			this.setState({
				formSuccess:''
			})
		},2000)
	}
	submitForm(event){
		event.preventDefault();
		let dataToSubmit ={}
		let formIsValid = true

		for(let key in this.state.formdata){
			dataToSubmit[key] = this.state.formdata[key].value
			formIsValid = this.state.formdata[key].valid && formIsValid
		}
		this.state.teams.forEach(team=>{
			if(team.shortName === dataToSubmit.local){
				dataToSubmit['localThmb'] = team.thmb
			}
			if(team.shortName === dataToSubmit.away){
				dataToSubmit['awayThmb'] = team.thmb
			}
		})
		if(formIsValid){
			if(this.state.formType === 'Edit Match'){
				firebaseDB.ref(`matches/${this.state.matchId}`)
				.update(dataToSubmit).then(resp=>{
					this.seccessForm('updated correctly')
				})
				.catch(err=>{
					this.setState({formError: true})
				})
			}else{
				firebaseMatches.push(dataToSubmit).then(()=>{
					this.props.history.push('/admin_matches')
				}).catch(e=>{
					this.setState({formError: true})
				})
			}
		}else{
			this.setState({
				formError: true
			})
		}
	}
	componentDidMount(){
		const matchId = this.props.match.params.id;
		const getTeams = (match, type) => {
			firebaseTeams.once('value')
			.then(snap=>{
				const teams = firebaseLooper(snap)
				const teamOptions = []
				snap.forEach(childSnap => {
					teamOptions.push({
						key: childSnap.val().shortName,
						value: childSnap.val().shortName
					})
				});
				this.updateFields(match, teamOptions, teams,type, matchId)
			})
		}
		if(!matchId){
			getTeams(false, 'Add Match')
		}else{
			firebaseDB.ref(`matches/${matchId}`).once('value')
			.then((snap)=>{
				const match = snap.val()
				getTeams(match, 'Edit Match')
			})
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
							change = {elem => this.updateForm(elem)}
						/>
						<div className="select_team_layout">
							<div className="label_inputs">Local</div>
							<div className="wrapper">
								<div className="left">
									<FormField
										id={'local'}
										formdata={this.state.formdata.local}
										change = {elem => this.updateForm(elem)}
									/>
								</div>
								<div>
									<FormField
										id={'resultLocal'}
										formdata={this.state.formdata.resultLocal}
										change = {elem => this.updateForm(elem)}
									/>
								</div>
							</div>
						</div>
						<div className="select_team_layout">
							<div className="label_inputs">Away</div>
							<div className="wrapper">
								<div className="left">
									<FormField
										id={'away'}
										formdata={this.state.formdata.away}
										change = {elem => this.updateForm(elem)}
									/>
								</div>
								<div>
									<FormField
										id={'resultAway'}
										change = {elem => this.updateForm(elem)}
										formdata={this.state.formdata.resultAway}
									/>
								</div>
							</div>
						</div>
						<div className="split_fields">
							<FormField
								id={'referee'}
								formdata={this.state.formdata.referee}
								change = {elem => this.updateForm(elem)}
							/>
							<FormField
								id={'stadium'}
								formdata={this.state.formdata.stadium}
								change = {elem => this.updateForm(elem)}
							/>
						</div>
						<div className="split_fields">
							<FormField
								id={'result'}
								formdata={this.state.formdata.result}
								change = {elem => this.updateForm(elem)}
							/>
							<FormField
								id={'final'}
								formdata={this.state.formdata.final}
								change = {elem => this.updateForm(elem)}
							/>
						</div>
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

export default AddEditMatch;