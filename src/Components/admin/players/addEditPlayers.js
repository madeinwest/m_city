import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayot'
import Fileuploader from '../../ui/fileuploader';
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
						{key:'Keeper', value:'Keeper'},
						{key:'Defence', value:'Defence'},
						{key:'Midfield', value:'Midfield'},
						{key:'Striker', value:'Striker'}
					]
				},
				validation:{
					required: true,
				},
				showlabel: false,
				valid: false,
				validationMessage:'',
			},
			image:{
				element:'image',
				value:'',
				validation: {
					required: true,
				},
				valid: false

			}
		}
	}

	updateForm(element, content = ''){
		const newFormData = {...this.state.formdata}
		const newElement = {...newFormData[element.id]}
		if(content === ''){
			newElement.value = element.event.target.value
		}else{
			newElement.value = content
		}

		let validData = validate(newElement)
		newElement.valid = validData[0]
		newElement.validationMessage = validData[1]
		newFormData[element.id] = newElement
		this.setState({
			formError: false,
			formdata: newFormData
		})
	}
	successForm = (msg) => {
		this.setState({
			formSuccess:msg
		})
		setTimeout(() => {
			this.setState({
				formSuccess: ''
			})
		}, 2000);
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
			if(this.state.formType === 'Edit player'){
				firebaseDB.ref(`players/${this.state.playerId}`)
				.update(dataToSubmit).then(()=>{
					this.successForm('Update correctly')
				})
				.catch(e=>{
					this.setState({formError:true})
				})
			}else{
				firebasePlayers.push(dataToSubmit).then(()=>{
					this.props.history.push('/admin_players')
				}).catch(e=>{
					this.setState({
						formError: true
					})
				})
			}
		}else{
			this.setState({
				formError: true
			})
		}
	}
	updateFields = (player, playerId, formType, defaultImg) => {
		const newFormData = {...this.state.formdata}
		for(let key in newFormData){
			newFormData[key].value = player[key]
			newFormData[key].valid = true
		}
		this.setState({playerId,defaultImg,formType,formdata:newFormData  })
	}
	componentDidMount(){
		const playerId = this.props.match.params.id
		if(!playerId){
			this.setState({
				formType: 'Add player'
			})
		}else{
			firebaseDB.ref(`players/${playerId}`).once('value')
			.then(snap =>{
				const playerData = snap.val()
				firebase.storage().ref('players')
				.child(playerData.image).getDownloadURL()
				.then(url=>{
					this.updateFields(playerData, playerId, 'Edit player', url)
				}).catch(e=>{
					this.updateFields(
						{...playerData,
							image:''
					}, playerId, 'Edit player', null)
				})
			})
		}
	}
	resetImage = () => {
		const newFormdata = {...this.state.formdata}
		newFormdata['image'].value = ''
		newFormdata['image'].valid = false
		this.setState({
			defaultImg: '',
			formdata: newFormdata
		})
	}
	storeFilename = (filename) => {
		this.updateForm({id:'image'},filename)
	}
	render() {

		return (
			<AdminLayout>
				<div className="editplayers_dialog_wrapper">
					<h2>{this.state.formType}</h2>
					<div>
						<form onSubmit={evt=>this.submitForm(evt)}>
							<Fileuploader
								dir="players"
								tag={"Player image"}
								defaultImg={this.state.defaultImg}
								defaultImgName={this.state.formdata.image.value}
								resetImage={()=> this.resetImage()}
								filename={filename=> this.storeFilename(filename)}
							/>
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