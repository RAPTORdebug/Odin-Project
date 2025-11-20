const display  = document.getElementById('display');

function appendNumber(number) {
  display.value += number;
}

function deleteLast() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function clearDisplay() {
  display.value = '';
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}

document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (!isNaN(key)) {
    // It's a number (0–9)
    appendNumber(key);
  } else if (['+', '-', '*', '/', '.'].includes(key)) {
    // It's a math operator or decimal
    appendNumber(key);
  } else if (key === 'Enter') {
    // Calculate result
    event.preventDefault(); // prevent form submission
    calculateResult();
  } else if (key === 'Backspace') {
    // Delete last character
    deleteLast();
  } else if (key.toLowerCase() === 'c') {
    // Clear display with 'c'
    clearDisplay();
  }
});
