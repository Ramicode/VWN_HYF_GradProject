import React, { Component } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Map from './Map';
import TagsCheckBoxes from './TagsCheckBoxes';
import Observable from '../Observable'
import Snackbar from 'material-ui/Snackbar';

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
      activeRegions: {},
      activeTags: {},
      errorText: '',
      open: false
    }
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMapChange = this.handleMapChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleSecondSubmit = this.handleSecondSubmit.bind(this); this.handleRequestClose = this.handleRequestClose.bind(this);
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

  handleMapChange(event) {
    let { activeRegions } = this.state
    if (activeRegions[event.target.id]) {
      activeRegions[event.target.id] = false
    } else {
      activeRegions[event.target.id] = true
    }
    console.log(activeRegions)
  }

  handleTagsChange(event) {
    let { activeTags } = this.state
    if (event.target.checked) {
      activeTags[event.target.value] = true
    } else {
      activeTags[event.target.value] = false
    }
  }

  handleSecondSubmit() {
    const { activeRegions, activeTags, } = this.state
    let toggle = true
    for (const tag in activeTags) {
      if (activeTags[tag]) {
        for (const region in activeRegions) {
          if (activeRegions[region]) {
            const { stepIndex } = this.state;
            if (stepIndex < 2) {
              this.setState({ stepIndex: stepIndex + 1 });
            }
            toggle = false
          }
        }
      }
    }
    if (toggle) {
      this.setState({
        open: true,
        errorText: "Please select at least one Tag and one Region"
      })
    }
  }

  handleRequestClose() {
    this.setState({
      open: false
    })
  }

  errorText() {
    const { isValid } = this.state;
    if (isValid) {
      return null;
    }
    return (
      <div>
      </div>
    );
  }

  getStepContent(stepIndex) {
    const URLregex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-])\/?$/
    const { formData, tags } = this.state
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
                            value={formData.Name}
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
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSecondSubmit}
            onError={this.throwErrormessage}
          >
            <div className="step2-container">
              <div className="add-map">
                <Map handle={this.handleMapChange} activeRegions={this.state.activeRegions} />
              </div>
              <div>
                <TagsCheckBoxes handle={this.handleTagsChange} tags={tags} activeTags={this.state.activeTags} />
              </div>
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
              <div>
                <Snackbar
                  open={this.state.open}
                  message={this.state.errorText}
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
              </div>

            </div>
          </ValidatorForm>
        );
      case 2:
        return (
          <div>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleNext}
              onError={errors => console.log(errors)}
            >
              {Object.keys(this.state.activeRegions).map((region) => {
                if (this.state.activeRegions[region]) {
                  return (
                    <div>
                      <p>{region}</p>

                      <div>{this.state.activeRegions[region]}
                      </div><br />
                      <TextValidator
                        name="Website"
                        floatingLabelText="Phone:"
                        floatingLabelFixed={true}
                        type={Number}
                        onChange={this.handleChange}
                        value={formData.Phone}
                        validators={['required', 'isNumber']}
                        errorMessages={['this field is required', 'Please enter a valid number']}
                      /><br />
                      <TextValidator
                        name="PostCode"
                        floatingLabelText="Post Code:"
                        floatingLabelFixed={true}
                        type={Text}
                        onChange={this.handleChange}
                        value={formData.PostCode}
                        validators={['required',]}
                        errorMessages={['this field is required',]}
                      /><br />
                      <TextValidator
                        name="HouseNumber"
                        floatingLabelText="House Number:"
                        floatingLabelFixed={true}
                        type={Text}
                        onChange={this.handleChange}
                        value={formData.HouseNumber}
                        validators={['required',]}
                        errorMessages={['this field is required', 'url is not valid']}
                      /><br />
                      <div style={{ marginTop: 24, marginBottom: 12 }}>
                      </div>
                    </div>
                  )
                }
              })
              }
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
            </ValidatorForm>
          </div>
        )
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