import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            patientname: '',
            age: 0,
            address: '',
            comments: '',
            doctor: 0,
            dateofbirth: '', //
            phone: '',//(234) --- ----
            message: '',
            patientsList: []
        }
    }

    handlePatientName = (event) => {
        this.setState({
            patientname: event.target.value
        })
    }

    handleAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    handleComments = (event) => {
        this.setState({
            comments: event.target.value
        })
    }

    handleDoctor = (event) => {
        this.setState({
            doctor: event.target.value
        })
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        alert(`${this.state.patientname} ${this.state.age} ${this.state.address} ${this.state.doctor} ${this.state.comments}`);
    }

    componentDidMount = () => {
        console.log('step1');
        axios.get('/hello').then((response) => {
            console.log('step2');
            console.log(response)
            this.setState({
                message: (response.data)
            })
        });
    }
    //http:localhost:3000/
    submitForm = () => {
        axios.post('/api/add-patient-info', {
            patientName: this.state.patientname, age: this.state.age,
            address: this.state.address, doctorId: this.state.doctor,
            comments: this.state.comments
        }).then((response) => {
            console.log(response);
            alert(response.data);
        });
    }

   deletePatient=(id)=>{
       axios.post('/api/delete-patient',id).then((response)=>{
           console.log(response.data);
       });
   }

    getAllPatients = () => {
        // const { data: patientsList }  = axios.get('/api/get-all-patients')
        // this.setState({patientsList})

        axios.get('/api/get-all-patients').then((response) => {
            console.log(response);

            // this.setState({
            //     patientsList: response.data
            // })
        });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div>
                    <label>Patient's Name:</label>
                    <input type="text" value={this.state.patientname} onChange={this.handlePatientName}></input>
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" value={this.state.age} onChange={this.handleAge}></input>
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={this.state.address} onChange={this.handleAddress}></input>
                </div>
                <div>
                    <label>Select Doctor:</label>
                    <select value={this.state.doctor} onChange={this.handleDoctor}>
                        <option value="1">Dr. Mary</option>
                        <option value="2">Dr. Smith</option>
                        <option value="3">Dr. John</option>
                    </select>
                </div>
                <div>
                    <label>Doctor Comments:</label>
                    <textarea value={this.state.comments} onChange={this.handleComments}></textarea>
                </div>
                <div>
                    <button type="button" onClick={this.submitForm}>Submit</button>
                    <button type="button" onClick={this.getAllPatients}>List of Patients</button>
                </div>
                <div>{this.state.message}</div>
                <div>{this.state.patientsList}</div>
                <div><button type="button" onClick={this.deletePatient}>Submit</button>
                    </div>

                {/* {(this.state.patientsList).map((p)=>(
                    <tr>
                        <td>{p}</td>
                    </tr>
                ))} */}
            </form>
        )
    }
}

export default Form;