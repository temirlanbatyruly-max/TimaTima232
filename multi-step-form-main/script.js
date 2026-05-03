const form = document.getElementById('multiStepForm');
const steps = document.querySelectorAll('section[data-step]');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const stepIndicators = document.querySelectorAll('.step-num');

let currentStep = 1;

function updateUI() {
  // Toggle step visibility
  steps.forEach(step => {
    step.classList.toggle('hidden', parseInt(step.dataset.step) !== currentStep);
  });

  // Update Sidebar Indicators
  stepIndicators.forEach((num, idx) => {
    num.classList.toggle('bg-blue-200', idx + 1 === currentStep);
    num.classList.toggle('text-blue-900', idx + 1 === currentStep);
  });

  // Button handling
  prevBtn.classList.toggle('invisible', currentStep === 1);
  if (currentStep === 4) {
    nextBtn.textContent = 'Confirm';
    nextBtn.classList.replace('bg-blue-900', 'bg-indigo-600');
  } else {
    nextBtn.textContent = 'Next Step';
  }
}

nextBtn.addEventListener('click', () => {
  if (currentStep < 4) {
    // Basic validation check before moving on
    const inputs = steps[currentStep - 1].querySelectorAll('input[required]');
    const isValid = [...inputs].every(input => input.reportValidity());
    
    if (isValid) {
      currentStep++;
      updateUI();
    }
  } else {
    // Show Step 5: Thank You
    document.querySelector('main').innerHTML = `
      <div class="text-center py-20">
        <img src="icon-thank-you.svg" class="mx-auto mb-4">
        <h1 class="text-3xl font-bold text-blue-900">Thank you!</h1>
        <p class="text-gray-400 mt-4">Thanks for confirming your subscription!</p>
      </div>`;
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    updateUI();
  }
});