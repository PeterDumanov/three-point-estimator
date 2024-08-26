/* scripts.js */
document.addEventListener('DOMContentLoaded', function() {
    loadNameFields();
});

function loadNameFields() {
    const nameFields = document.querySelectorAll('.name-field');
    nameFields.forEach(field => {
        const index = field.getAttribute('data-index');
        const savedValue = localStorage.getItem('nameField' + index);
        if (savedValue) {
            field.value = savedValue;
        }

        field.addEventListener('input', function() {
            localStorage.setItem('nameField' + index, field.value);
        });
    });
}

function clearFields() {
    const oFields = document.querySelectorAll('.o-field');
    const mFields = document.querySelectorAll('.m-field');
    const pFields = document.querySelectorAll('.p-field');
    [...oFields, ...mFields, ...pFields].forEach(field => field.value = '');
}

function getAverage(fields) {
    const validFields = Array.from(fields)
        .map(field => parseFloat(field.value))
        .filter(value => !isNaN(value));
    if (validFields.length === 0) return null;
    const sum = validFields.reduce((acc, value) => acc + value, 0);
    return sum / validFields.length;
}

function calculateResult() {
    const oFields = document.querySelectorAll('.o-field');
    const mFields = document.querySelectorAll('.m-field');
    const pFields = document.querySelectorAll('.p-field');

    const oAvg = getAverage(oFields);
    const mAvg = getAverage(mFields);
    const pAvg = getAverage(pFields);

    if (oAvg === null || mAvg === null || pAvg === null) {
        alert("Please fill in all required fields in O, M, and P columns to calculate the result.");
        return;
    }

    const result = (oAvg + 4 * mAvg + pAvg) / 6;
    displayResult(result);
}

function displayResult(result) {
    document.getElementById('resultValue').textContent = result.toFixed(2);
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('resultPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('resultPopup').style.display = 'none';
}

function copyToClipboard() {
    const resultText = document.getElementById('resultValue').textContent;
    navigator.clipboard.writeText(resultText).then(() => {
        alert("Result copied to clipboard");
    });
}

function allowOnlyNumbersAndDots(event) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!charStr.match(/[\d.]/)) {
        event.preventDefault();
    }
}

document.querySelectorAll('.o-field, .m-field, .p-field').forEach(field => {
    field.addEventListener('keypress', allowOnlyNumbersAndDots);
});
