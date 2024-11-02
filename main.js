const firstView = document.getElementById('first-view');
const resultsView = document.getElementById('resultsView');

document.querySelectorAll('.mortage-type').forEach(input => {
    input.addEventListener('change', function () {
        document.querySelectorAll('.radio-inputs').forEach(div => {
            div.classList.remove('selected');
        });
        this.closest('.radio-inputs').classList.add('selected');
    });
});

document.getElementById('calculateBtn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('mortage-amount').value);
    const term = parseFloat(document.getElementById('mortage-term').value);
    const rate = parseFloat(document.getElementById('Interest-rate').value) / 100;
    const type = document.querySelector('input[name="mortage-type"]:checked');
    
    let isValid = true;

   
    document.querySelectorAll('.align').forEach(el => {
        el.classList.remove('error');
    });

   
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('Amount-empty').style.display = 'block';
        document.getElementById('amount').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('Amount-empty').style.display = 'none';
    }

    if (isNaN(term) || term <= 0) {
        document.getElementById('term-empty').style.display = 'block';
        document.getElementById('mortage-term').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('term-empty').style.display = 'none';
    }

   
    if (isNaN(rate) || rate <= 0) {
        document.getElementById('rate-empty').style.display = 'block';
        document.getElementById('Interest-rate').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('rate-empty').style.display = 'none';
    }

    if (!type) {
        document.getElementById('type-empty').style.display = 'block';
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.add('error');
        });
        isValid = false;
    } else {
        document.getElementById('type-empty').style.display = 'none';
    }

    if (isValid) {
        let monthlyPayment = 0;
        let totalRepayment = 0;

        firstView.classList.add('hide');
        resultsView.classList.add('show');

        if (type.id === 'repayment') {
            const monthlyRate = rate / 12;
            const n = term * 12;
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -n));
            totalRepayment = monthlyPayment * n;
        } else if (type.id === 'interest-only') {
            monthlyPayment = (amount * rate) / 12;
            totalRepayment = monthlyPayment * term * 12;
        }

        document.getElementById('monthlyResult').innerText = `£${monthlyPayment.toFixed(2)}`;
        document.getElementById('totalpayment').innerText = `£${totalRepayment.toFixed(2)}`;
    } else {

        firstView.classList.remove('hide');
        resultsView.classList.remove('show');
    }
});

document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('form').reset();
    document.getElementById('monthlyResult').innerText = '';
    document.getElementById('totalpayment').innerText = '';
    document.querySelectorAll('.empty').forEach(alert => {
        alert.style.display = 'none';
    });

    firstView.classList.remove('hide');
    resultsView.classList.remove('show');
    document.querySelectorAll('.align').forEach(el => {
        el.classList.remove('error');
    });
});
