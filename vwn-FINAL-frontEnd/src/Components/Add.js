import React, { Component } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Map from './Map';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 0,
            tags: {},
            formData: {
                Name: '',
                Logo: '',
                Email: '',
                Website: '',
                Description: ''
            },
            submitted: false,
        }
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentWillMount() {
        this.setState({
            tags: this.props.tags
        })
    }

    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    getStepContent(stepIndex) {
        const URLregex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        const { formData } = this.state
        switch (stepIndex) {
            case 0:
                return (
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleNext}
                        onError={errors => console.log(errors)}
                    >
                        <TextValidator
                            name="Name"
                            floatingLabelText="Name"
                            floatingLabelFixed={true}
                            // value={formData.Name}
                            type="text"
                            onChange={this.handleChange}
                            value={formData.Name}

                            validators={['required']}
                            errorMessages={['this field is required']}
                        /><br />
                        <TextValidator
                            name="Logo"
                            floatingLabelText="Logo:"
                            floatingLabelFixed={true}
                            value={formData.Logo}
                            type="url"
                            onChange={this.handleChange}
                            validators={['required',]}
                            errorMessages={['this field is required', 'url is not valid']}
                        /><br />
                        <TextValidator
                            name="Email"
                            floatingLabelText="E-mail"
                            floatingLabelFixed={true}
                            onChange={this.handleChange}
                            value={formData.Email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        /><br />
                        <TextValidator
                            name="Website"
                            floatingLabelText="Website:"
                            floatingLabelFixed={true}
                            type="url"
                            onChange={this.handleChange}
                            value={formData.Website}
                            validators={['required',]}
                            errorMessages={['this field is required', 'url is not valid']}
                        /><br />
                        <TextValidator
                            name="Description"
                            floatingLabelText="Organization description:"
                            floatingLabelFixed={true}
                            onChange={this.handleChange}
                            rows={4}
                            rowsMax={100}
                            value={formData.Description}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /><br />
                        <div style={{ marginTop: 24, marginBottom: 12 }}>
                            <FlatButton
                                label="Back"
                                disabled={stepIndex === 0}
                                onClick={this.handlePrev}
                                style={{ marginRight: 12 }}
                            />
                            <RaisedButton
                                label={stepIndex === 2 ? 'Finish' : 'Next'}
                                primary={true}
                                type="submit"
                            />
                        </div>
                    </ValidatorForm>

                );
            case 1:
                return (
                    <div className="step2-container">
                        <div className="add-map">
                            <Map />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <p>
                        {'Try out different ad text to see what brings in the most customers, and learn ' +
                            'how to enhance your ads using features like ad extensions. If you run into any ' +
                            'problems with your ads, find out how to tell if they\'re running and how to ' +
                            'resolve approval issues.'}
                    </p>
                );
        }
    }

    handleNext() {
        const { stepIndex } = this.state;
        if (stepIndex < 2) {
            this.setState({ stepIndex: stepIndex + 1 });
        }
    }

    handlePrev() {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    }

    render() {
        const { stepIndex } = this.state;
        return (
            <div className="add-page-container" style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
                <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>
                    <Step>
                        <StepLabel>Please fill the below fields</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>Please Choose tags & regions</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>Please fill in your contact details:</StepLabel>
                    </Step>
                </Stepper>
                {this.getStepContent(stepIndex)}


            </div>
        )
    }

}
export default Add