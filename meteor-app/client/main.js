let state;
const NUMBER_OF_STEPS = 4;

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//>   F U N C T I O N S       F U N C T I O N S       F U N C T I O N S       F U N C T I O N S
//
///////////////////////////////////////////////////////////////////////////////////////////////////
const changeStep = (stepChange) => {
  const currentStep = state.get('step');
  let nextStep = currentStep + stepChange;

  if (nextStep < 1) {
    nextStep = 1;
  }
  if (nextStep > NUMBER_OF_STEPS) {
    nextStep = NUMBER_OF_STEPS;
  }

  state.set('step', nextStep);
  state.set('stepPercentage', 0);
};

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//>   C R E A T E D      C R E A T E D      C R E A T E D      C R E A T E D      C R E A T E D
//
///////////////////////////////////////////////////////////////////////////////////////////////////
Template.progressBar.onCreated(() => {
  const component = Template.instance();

  // Create component state variables
  component.state = new ReactiveDict();
  component.state.set('step', 1);
  component.state.set('stepPercentage', 0);
  state = component.state;
});

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//>     D E S T R O Y E D      D E S T R O Y E D      D E S T R O Y E D      D E S T R O Y E D
//
///////////////////////////////////////////////////////////////////////////////////////////////////
Template.progressBar.onDestroyed(() => {
  state = null;
});

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//>   H E L P E R S      H E L P E R S      H E L P E R S      H E L P E R S      H E L P E R S
//
///////////////////////////////////////////////////////////////////////////////////////////////////
Template.progressBar.helpers({

  isActiveStep: (step) => {
    const currentStep = state.get('step');

    return step <= currentStep ? 'active' : '';
  },

  stepPercentage: (step) => {
    const currentStep = state.get('step');

    if (step < currentStep) {
      return 100;
    }
    if (step === currentStep) {
      return state.get('stepPercentage');
    }
    if (step > currentStep) {
      return 0;
    }
  },

  percentage: () => {
    return state.get('stepPercentage');
  },

  isDisabledButton: (type) => {
    const currentStep = state.get('step');

    if (type === 'decrease') {
      return currentStep <= 1;
    }

    if (type === 'increase') {
      return currentStep >= NUMBER_OF_STEPS;
    }

    return false;
  },

  isHiddenSlider: () => {
    const currentStep = state.get('step');

    return currentStep === NUMBER_OF_STEPS ? 'hidden' : '';
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//>      E V E N T S       E V E N T S       E V E N T S       E V E N T S       E V E N T S
//
///////////////////////////////////////////////////////////////////////////////////////////////////
Template.progressBar.events({

  'click .first-step-button': () => changeStep(-NUMBER_OF_STEPS),
  'click .previous-step-button': () => changeStep(-1),
  'click .next-step-button': () => changeStep(1),
  'click .last-step-button': () => changeStep(NUMBER_OF_STEPS),

  'change .range-slider': (event, component) => {
    const sliderNumber = Number($(event.target).val());

    state.set('stepPercentage', sliderNumber);
  },
});
