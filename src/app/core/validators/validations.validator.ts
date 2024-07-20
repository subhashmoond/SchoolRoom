import { FormControl, FormGroup } from '@angular/forms';

// validation : Allow alphanumer char and space only
export class TextFieldValidator {

    static validTextField(fc: FormControl) {
        if (fc.value != undefined && fc.value != "") {
            const regex = /^[-_ a-zA-Z0-9]+$/;
            if (regex.test(fc.value)) {
                return null;
            } else {
                return { validTextField: true }
            }
        } else {
            return null;
        }
    }
}

// validation : Allow Number char only
export class NumericFieldValidator {
    static validNumericField(fc: FormControl) {
        if (fc.value != undefined && fc.value != "") {
            const regex = /^[0-9]+$/;
            if (regex.test(fc.value)) {
                return null;
            } else {
                return { validNumericField: true }
            }
        } else {
            return null;
        }
    }
}

// validation : Allow char and space only
export class OnlycharFieldValidator {
    static validOnlycharField(fc: FormControl) {
        if (fc.value != undefined && fc.value != "") {
            const regex = /^[a-zA-Z]+$/;
            if (regex.test(fc.value)) {
                return null;
            } else {
                return { validOnlycharField: true }
            }
        } else {
            return null;
        }
    }
}

// validation : Valid email only
export class EmailFieldValidator {
    static validEmailField(fc: FormControl) {
        if (fc.value != undefined && fc.value != "") {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regex.test(fc.value)) {
                return null;
            } else {
                return { validEmailField: true }
            }
        } else {
            return null;
        }
    }
}

// validation : Not Allow white space only
export class NotWhiteSpaceValidator {
    static notWhiteSpaceField(fc: FormControl) {
        if (fc.value != undefined && fc.value != "" && fc.value != null) {
            const isWhiteSoace = (fc.value.toString()).trim().length === 0;
            if (!isWhiteSoace) {
                return null;
            } else {
                return { notWhiteSpaceField: true }
            }
        } else {
            return null;
        }
    }
}

 