const errorMessage = require('./error_message');

const validation = {
    checkValidation(lexedTokens) {
        if(!(this.checkNotSupportDataType(lexedTokens))) return false;
        if(!(this.checkNotHaveInitialArray(lexedTokens))) return false;
        if(!(this.checkMatchArraySquares(lexedTokens))) return false;
        if(!(this.checkStringConvention(lexedTokens))) return false;
        return true;
    },

    checkNotSupportDataType(tokens) {
        const undefinedTokens = tokens.filter((token) => token.name === undefined);
        if(undefinedTokens[0]) {
            undefinedTokens.forEach((token) => errorMessage.printNotHaveDataTypeErrorMsg(token.value));
            return false;
        }
        return true;
    },

    checkNotHaveInitialArray(tokens) {
        if(!(tokens[0].name === 'arrayOpener')) {
            errorMessage.printNotHaveInitialArrayErrorMsg();
            return false;
        }
        return true;
    },

    checkMatchArraySquares(tokens) {
        const countArrayOpeners = tokens.filter((token) => token.name === 'arrayOpener').length;
        const countArrayClosers = tokens.filter((token) => token.name === 'arrayCloser').length;
        if(!(countArrayOpeners === countArrayClosers)) {
            errorMessage.printArrayNotMatchedErrorMsg();
            return false;
        }
        return true;
    },

    checkStringConvention(tokens) {
        const stringTokens = tokens.filter((token) => token.name === 'string');
        for(let stringToken of stringTokens) {
            if(stringToken.value.startsWith("'") && !(stringToken.value.match(/'/g).length === 2)) {
                errorMessage.printStringConventionErrorMsg(stringToken.value);
                return false
            } else if(stringToken.value.startsWith('"') && !(stringToken.value.match(/"/g).length === 2)) {
                errorMessage.printStringConventionErrorMsg(stringToken.value);
                return false
            }
            return true;
        }
    }
}
module.exports = validation;