const lexer = {
    tokenize(string) {
        let token = '';
        let isString = false;
        const tokens = [];

        for(let i = 0; i < string.length; i++) {
            if(string[i] === '[') tokens.push(string[i]);
            else if(string[i] === ']') {
                tokens.push(token);
                tokens.push(string[i]);
            } else if(string[i] === ',' && !isString) {
                tokens.push(token); 
                token = '';
            } else if(string[i] === ' ' && !isString) {
            } else if(string[i] === "'" || string[i] === '"') {
                token += string[i];
                if(isString) {
                    isString = false;
                    continue;
                }
                isString = true;
            }
            else token += string[i];
        }
        return tokens;
    },
    
    lex(string) {
        const tokens = this.tokenize(string);
        const lexedTokens = this.attatchNameToTokens(tokens);
        return lexedTokens;
    },

    attatchNameToTokens(tokens) {
        return tokens.map((token) => {
            if(token === '[') {
                token = {'name' : 'arrayOpener', 'value' : token};
                return token;
            } else if(!isNaN(token)) {
                token = {'name' : 'number', 'value' : token};
                return token;
            } else if(token === 'true' || token === 'false') {
                token = {'name' : 'boolean', 'value' : token};
                return token;
            } else if(!(token.search(/[',"].+[',"]/) === -1)) {
                token = {'name' : 'string', 'value' : token};
                return token;
            } else if(token === 'null') {
                token = {'name' : 'null', 'value' : token};
                return token;
            } else if(token === ']') {
                token = {'name' : 'arrayCloser', 'value' : token};
                return token;
            } else {
                token = {'name' : undefined, 'value' : token};
                return token;
            }
        }, []);
    }
}

module.exports = lexer;