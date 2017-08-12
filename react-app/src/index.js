// ============================================================================
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Slider } from 'antd';
import './index.css';
import 'antd/dist/antd.css';
// ============================================================================

// Definitions
const NUMBER_OF_STEPS = 4;

// ============================================================================
// COMPONENT: App
// ============================================================================
class App extends React.Component {

	// ----------------------------------------------
	// Constuctor
	// ----------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      stepPercentage: 0,
    };
  }
  
  // ----------------------------------------------
	// Functions
	// ----------------------------------------------
  changeStep(stepJump) {
    const step = this.state.step;
    let nextStep = step + stepJump;
    
    if (nextStep < 1) {
      nextStep = 1;
    }
    if (nextStep > NUMBER_OF_STEPS) {
      nextStep = NUMBER_OF_STEPS;
    }
    
    this.setState({ 
      step: nextStep,
      stepPercentage: 0,
    });
  }

  changePercentage(value) {
  	this.setState({ 
      stepPercentage: value,
    });
  }
	
	// ----------------------------------------------
	// Render
	// ----------------------------------------------
	render() {
		// Get states
		const step = this.state.step;
		const stepPercentage = this.state.stepPercentage;
		// Get functions
		const changeStep = this.changeStep.bind(this);
		const changePercentage = this.changePercentage.bind(this);

		return (
			<div>

				{/* PROGRESS */}
      	<ProgressBar 
					 step={step}
					 stepPercentage={stepPercentage}
				/>
				
				{/* BUTTONS */}
				<div className="button-wrap">
					<Button 
						className="step-button first-step-button"
						disabled={step <= 1}
						onClick={() => changeStep(-NUMBER_OF_STEPS)}
						type="primary"
					>First</Button>
					<Button 
						className="step-button previous-step-button"
						disabled={step <= 1}
						onClick={() => changeStep(-1)}
						type="primary"
					>Prev</Button>
					<Button 
						className="step-button next-step-button"
						disabled={step >= NUMBER_OF_STEPS}
						onClick={() => changeStep(1)}
						type="primary"
					>Next</Button>
					<Button 
						className="step-button last-step-button"
						disabled={step >= NUMBER_OF_STEPS}
						onClick={() => changeStep(NUMBER_OF_STEPS)}
						type="primary"
					>Last</Button>
				</div>
				
				{/* SLIDER */}
				<div className="slider-wrap">
	        <Slider
						className={step === NUMBER_OF_STEPS ? 'hidden' : ''}
						onChange={changePercentage}
						step="25"
						value={stepPercentage}
					></Slider>
				</div>

			</div>
		)
	}
}

// ============================================================================
// COMPONENT: ProgressBar
// ============================================================================
class ProgressBar extends React.Component {

	// ----------------------------------------------
	// Functions
	// ----------------------------------------------
	isActiveStep(bubbleNumber) {
		// Get state
		const step = this.props.step;

  	return step >= bubbleNumber ? 'active' : '';
  }
  
  getPercentage(stepPercentageNumber) {
  	// Get state
  	const step = this.props.step;
		const stepPercentage = this.props.stepPercentage;

  	if (stepPercentageNumber < step) {
      return 100;
    }
    if (stepPercentageNumber === step) {
      return stepPercentage;
    }
    if (stepPercentageNumber > step) {
      return 0;
    }
  }

  // ----------------------------------------------
	// Render
	// ----------------------------------------------
	render() {
		// Get functions
		const isActiveStep = this.isActiveStep.bind(this);
		const getPercentage = this.getPercentage.bind(this);

		return (
			<div id="progress-bar-wrap">

				{/* PROGRESS BAR */}
        <div id="progress-bar"></div>

        {/* BUBBLES */}
        <div className="bubble-wrap">
          <div
          	id="bubble-1"
          	className={`bubble ${isActiveStep(1)}`}
          ></div>
          <div
          	id="bubble-2"
          	className={`bubble ${isActiveStep(2)}`}
          ></div>
          <div
          	id="bubble-3"
          	className={`bubble ${isActiveStep(3)}`}
          ></div>
          <div
          	id="bubble-4"
          	className={`bubble ${isActiveStep(4)}`}
          ></div>
        </div>

        {/* STEP PERCENTAGES */}
        <div className="step-percentage-wrap">
          <div
          	id="step-percentage-1"
          	className="step-percentage"
          	style={{width: `${getPercentage(1)}%`}}
          ></div>
          <div
          	id="step-percentage-2"
          	className="step-percentage"
          	style={{width: `${getPercentage(2)}%`}}
          ></div>
          <div
          	id="step-percentage-3"
          	className="step-percentage"
          	style={{width: `${getPercentage(3)}%`}}
          ></div>
        </div>
      </div>
		)
	}
}

// ============================================================================
// Render Application
// ============================================================================
ReactDOM.render(
  <App />,
	document.getElementById('app')
);
