window.onload = function () {
    let eqCtl = document.getElementById('result');
    let currNumberCtl = document.getElementById('previous');
    calculator.init(eqCtl, currNumberCtl);
};

var calculator = function() {
    let eqCtl,
        currNumberCtl,
        operator,
        operatorSet = false,
        equalsPressed = false,
        lastNumber = null,

        init = function(equals, currNumber) {
            eqCtl = equals;
            currNumberCtl = currNumber;
        },

        add = function(x, y) {
            return x + y;
        },

        subtract = function(x, y) {
            return x - y;
        },

        multiply = function(x, y) {
            return x * y;
        },

        divide = function(x, y) {
            if (y == 0) {
                alert("Can't divide by 0");
                return 0;
            }
            return x / y;
        },

        setVal = function(val) {
            currNumberCtl.innerHTML = val;
        },

        setEquation = function(val) {
            eqCtl.innerHTML = val;
        },

        clearNumbers = function() {
            lastNumber = null;
            equalsPressed = operatorSet = false;
            setVal('0');
            setEquation('');
        },

        setOperator = function(newOperator) {
            if (newOperator == '=') {
                equalsPressed = true;
                calculate();
                setEquation('');
                return;
            }
            if (!equalsPressed) calculate();
            equalsPressed = false;
            operator = newOperator;
            operatorSet = true;
            lastNumber = parseFloat(currNumberCtl.innerHTML);
            let eqText = (eqCtl.innerHTML == '') ?
                lastNumber + ' ' + operator + ' ' :
                eqCtl.innerHTML + ' ' + operator + ' ';
            setEquation(eqText);
        },

        numberClick = function(e) {
            let button = (e.target) ? e.target : e.srcElement;
            if (operatorSet == true || currNumberCtl.innerHTML == '0') {
                setVal('');
                operatorSet = false;
            }
            if(equalsPressed) {
                clearNumbers();
                setVal( button.innerHTML);
                setEquation( button.innerHTML);
                equalsPressed = false;
            } else{
                setVal(currNumberCtl.innerHTML + button.innerHTML);
                setEquation(eqCtl.innerHTML + button.innerHTML);
            }
            
        },

        
        clearLastNumber = function() {
            let arNum = currNumberCtl.innerHTML.split('');            
            arNum.splice(-1,1);
            setVal(arNum.join('' ));
            let arRes = eqCtl.innerHTML.split('');
            arRes.splice(-1,1);
            setEquation(arRes.join('' ));
        },

        calculate = function() {
            if (!operator || lastNumber == null) return;
            let currNumber = parseFloat(currNumberCtl.innerHTML),
                newVal = 0;
            
            switch (operator) {
            case '+':
                newVal = add(lastNumber, currNumber);
                break;
            case '-':
                newVal = subtract(lastNumber, currNumber);
                break;
            case '*':
                newVal = multiply(lastNumber, currNumber);
                break;
            case '/':
                newVal = divide(lastNumber, currNumber);
                break;
            }
            setVal(newVal);
            lastNumber = newVal;
        };

    return {
        init: init,
        numberClick: numberClick,
        setOperator: setOperator,
        clearNumbers: clearNumbers,
        clearLastNumber: clearLastNumber
    };
}();