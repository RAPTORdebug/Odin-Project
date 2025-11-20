const grid = document.querySelector('.grid');
const input = document.querySelector('.input');
const submitBtn = document.getElementById('submit');
let drawingMode = false;

// Toggle drawing mode on click anywhere
document.addEventListener('click', () => {
    drawingMode = !drawingMode;
    console.log("Drawing mode:", drawingMode);
});

// Function to create a grid
function createGrid(squaresPerSide) {
    grid.innerHTML = ''; // Clear existing grid

    // Adjust grid template for new size
    grid.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${squaresPerSide}, 1fr)`;

    for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        cell.addEventListener('mouseover', () => {
            if (drawingMode) {
                cell.classList.add('marked');
            }
        });

        grid.appendChild(cell);
    }
}

// Initial grid (60 × 30)
createGrid(60);

// Use input + submit button to resize grid
submitBtn.addEventListener('click', () => {
    let newSize = parseInt(input.value, 10);

    if (isNaN(newSize) || newSize < 1) newSize = 16;
    if (newSize > 100) newSize = 100; // limit max for performance

    createGrid(newSize);
    input.value = ''; // clear input after submission
});
