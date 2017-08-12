// ============================================================================
// Multi step progress bar Component
// ============================================================================
(function Component() {
  // Definitions
  const NUMBER_OF_STEPS = 4;

  // ----------------------------------------------
  // Component state variables
  // ----------------------------------------------
  let step = 1;
  let stepPercentage = 0;

  // ----------------------------------------------
  // Functions
  // ----------------------------------------------
  const renderComponent = () => {
    // 1. Render correct state of the bubbles
    const bubbles = $('.bubble');
    bubbles.each(function(index) {
      if ((index + 1) <= step) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });

    // 2. Render correct step percentage
    const stepPercentages = $('.step-percentage');
    stepPercentages.each(function(index) {
      if ((index + 1) < step) {
        return $(this).width('100%');
      }
      if ((index + 1) === step) {
        $(this).width(`${stepPercentage}%`);
      }
      if ((index + 1) > step) {
        return $(this).width('0%');
      }
    });

    // 3. Render correct slider position
    $('.range-slider').val(stepPercentage);

    // 4. Render slider or not
    if (step === NUMBER_OF_STEPS) {
      $('.slider-wrap').addClass('hidden');
    } else {
      $('.slider-wrap').removeClass('hidden');
    }
  };

  const changeStep = (amount) => {
    // 1. Set correct next step
    step = step + amount;
    if (step < 1) {
      step = 1;
    }
    if (step > NUMBER_OF_STEPS) {
      step = NUMBER_OF_STEPS;
    }

    // 2. Reset slider position
    stepPercentage = 0;

    // 3. Re-render component
    renderComponent();
  };

  // ----------------------------------------------
  // Logic - Event Handlers
  // ----------------------------------------------
  $('.first-step-button').click(() => changeStep(-NUMBER_OF_STEPS));
  $('.previous-step-button').click(() => changeStep(-1));
  $('.next-step-button').click(() => changeStep(+1));
  $('.last-step-button').click(() => changeStep(NUMBER_OF_STEPS));

  $('.range-slider').change(() => {
    const sliderValue = Number($('.range-slider').val());

    // 1. Set slider position
    stepPercentage = sliderValue;

    // 2. Re-render component
    renderComponent();
  });
})()
