// ============================================================================
import React from 'react';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { render } from 'react-dom';
import { Button, Slider } from 'antd';
import _ from 'lodash';
import './index.css';
import 'antd/dist/antd.css';
// ============================================================================

// Definitions
const NUMBER_OF_STEPS = 4;

// Component States
const defaultState = {
	step: 1,
	stepPercentage: 0,
};

// ============================================================================
// COMPONENT: App
// ============================================================================
class App extends React.Component {
	// ----------------------------------------------
	// Render
	// ----------------------------------------------
	render() {
		// Get states
		const step = this.props.step;
		const stepPercentage = this.props.stepPercentage;
		// Get actions
		const changeStep = this.props.changeStep.bind(this);
		const changePercentage = this.props.changePercentage.bind(this);

		return (
			<div>

				{/* PROGRESS */}
      	<ProgressBar 
					step={step}
					stepPercentage={stepPercentage}
				/>

				{/* BUTTONS */}
				<div className="buttons">
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
	        {
	        	_.times(NUMBER_OF_STEPS, (index) => {
							const stepNumber = index + 1;

							return <div
								key={stepNumber}
								id={`bubble-${stepNumber}`}
								className={`bubble ${isActiveStep(stepNumber)}`}
							></div>
						})
	        }
        </div>

        {/* STEP PERCENTAGES */}
        <div className="step-percentage-wrap">
	        {
	        	_.times(NUMBER_OF_STEPS - 1, (index) => {
							const stepNumber = index + 1;

							return <div
								key={stepNumber}
								id={`step-percentage-${stepNumber}`}
								className="step-percentage"
								style={{width: `${getPercentage(stepNumber)}%`}}
							></div>
						})
	        }
        </div>

      </div>
		)
	}
}

// ============================================================================
// Reducers
// ============================================================================
function reducer(state = defaultState, action) {
	switch (action.type) {

		// ----------------------------------------------
		// CHANGE_STEP
		// ----------------------------------------------
		case 'CHANGE_STEP':
	    let nextStep = state.step + action.stepJump;
	    
	    if (nextStep < 1) {
	      nextStep = 1;
	    }
	    if (nextStep > NUMBER_OF_STEPS) {
	      nextStep = NUMBER_OF_STEPS;
	    }

	    return {
	    	...state,
	    	step: nextStep,
	    	stepPercentage: 0
	    };

	  // ----------------------------------------------
		// CHANGE_PERCENTAGE
		// ----------------------------------------------
	  case 'CHANGE_PERCENTAGE':
	    return {
	    	...state,
	    	stepPercentage: action.value
	    };

	  // ----------------------------------------------
		// DEFAULT
		// ----------------------------------------------
		default:
			return state;
	}
};

// ============================================================================
// Actions
// ============================================================================
const actions = {
	changeStep: (stepJump) => {
		return {
			type: 'CHANGE_STEP',
			stepJump
		}
	},
	changePercentage: (value) => {
		return {
			type: 'CHANGE_PERCENTAGE',
			value
		}
	},
};

// ============================================================================
// Store
// ============================================================================
const AppContainer = connect(
	function mapStateToProps(state) {
		return {
			step: state.step,
			stepPercentage: state.stepPercentage,
		};
	},
	function mapDispatchToProps(dispatch) {
		return bindActionCreators(actions, dispatch);
	}
)(App);

const store = createStore(reducer, defaultState);

// ============================================================================
// Render Application
// ============================================================================
render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('app')
);
