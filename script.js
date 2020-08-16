function start(event_key, name_numeric_base) {
    const $inputs = [
        window.document.querySelector('#decimal'),
        window.document.querySelector('#binario'),
        window.document.querySelector('#octal'),
        window.document.querySelector('#hexadecimal')];

    const key = event_key.key;
    const names_list_numeric_base = ['decimal', 'binario', 'octal', 'hexadecimal'];

    for (const [number, $input] of $inputs.entries()) {
        if (name_numeric_base === names_list_numeric_base[number]) {
            var input = $input;
            break;
        }
    }
    return base_condition(key, name_numeric_base, names_list_numeric_base, input, $inputs);
}

function base_condition(key, name_numeric_base, names_list_numeric_base, input, $inputs) {
    const letters_hexadecimal = ["A", "B", "C", "D", "E", "F"];
    const Arrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (key === 'F5') {
        window.location.reload();

    } else if (Arrow.includes(key)) {
        //pass;
    } else {
        if (name_numeric_base === 'hexadecimal') {
            if (((parseInt(key) <= 9) || (key === 'Backspace')) || (letters_hexadecimal.includes(key.toUpperCase()))) {
                input.addEventListener('keyup', function () {
                    collect_value(letters_hexadecimal, name_numeric_base, input, $inputs);
                });
            } else {
                return false;
            }

        } else {
            const numeric_limit = [9, 1, 7];
            for (const [number, limite] of numeric_limit.entries()) {
                if (name_numeric_base === names_list_numeric_base[number]) {
                    if ((parseInt(key) <= limite) || (key === 'Backspace')) {
                        input.addEventListener('keyup', function () {
                            collect_value(letters_hexadecimal, name_numeric_base, input, $inputs);
                        })
                    } else {
                        return false;
                    }
                }
            }
        }
    }
}

function collect_value(letters_hexadecimal, name_numeric_base, input, $inputs) {
    const list_value = [];
    for (let value = 0; value < input.value.length; value++) {
        list_value.push(input.value[value]);
    }
    input_correction(letters_hexadecimal, name_numeric_base, list_value, $inputs);
}

function input_correction(letters_hexadecimal, name_numeric_base, list_value, $inputs) {
    const value = [];
    for (const index of list_value) {
        if (parseInt(index) || index === '0') {
            value.push(parseInt(index));
        } else {
            for (const [number, letter] of letters_hexadecimal.entries()) {
                if (index.toUpperCase() === letter) {
                    value.push(number + 10);
                    break;
                }
            }
        }
    }

    if (name_numeric_base === 'decimal') {
        let decimal_value = '';
        for (const decimal of value) {
            decimal_value += `${decimal}`;
        }
        render(decimal_base_to_other_base(parseInt(decimal_value)), name_numeric_base, letters_hexadecimal, $inputs);
    } else {
        render(decimal_base_to_other_base(other_base_to_decimal_base(value, name_numeric_base)), name_numeric_base, letters_hexadecimal, $inputs);
    }
}

function decimal_base_to_other_base(value) {
    const number_numeric_base = [10, 2, 8, 16];
    const results_list = [];

    if (value === 0) {
        for (let zero = 0; zero < 4; zero++) {
            results_list.push([0]);
        }
    } else {
        for (const index of number_numeric_base) {
            let temporary_value = value;
            const result = [];
            while (temporary_value / index > 0) {
                result.push(temporary_value % index);
                temporary_value = parseInt(temporary_value / index);
            }
            results_list.push(result.reverse());
        }
    }
    return results_list;
}

function other_base_to_decimal_base(value, name_numeric_base) {
    const list_multiplier_numeric_base = [2, 8, 16];
    const names_list_numeric_base = ['binario', 'octal', 'hexadecimal'];

    for (const [number_base, name_base] of names_list_numeric_base.entries()) {
        if (name_numeric_base === name_base) {
            var base = number_base;
            break;
        }
    }

    let decimal = (value[0] === 0) ? 0 : null;
    value.reverse();
    for (const [number, index] of value.entries()) {
        if (index > 0) {
            let amount = 1;
            for (let multiplier = 0; multiplier < number; multiplier++) {
                amount *= list_multiplier_numeric_base[base];
            }
            amount *= index;
            decimal += amount;
        }
    }
    return decimal;
}

function render(results_list, name_numeric_base, letters_hexadecimal, $inputs) {
    const names_list_numeric_base = ['decimal', 'binario', 'octal', 'hexadecimal'];

    for (const [number_matrix, value_matrix] of results_list.entries()) {
        if (name_numeric_base !== names_list_numeric_base[number_matrix]) {
            $inputs[number_matrix].value = null;

            for (let list = 0; list < value_matrix.length; list++) {
                if (value_matrix[list] < 10) {
                    $inputs[number_matrix].value += value_matrix[list];

                } else {
                    for (const [number, letter] of letters_hexadecimal.entries()) {
                        if (value_matrix[list] === number + 10) {
                            $inputs[number_matrix].value += letter;
                            break;
                        }
                    }
                }
            }
        }
    }
}