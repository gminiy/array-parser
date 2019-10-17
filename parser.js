const lexer = require('./lexer');
const validation = require('./validation')

class Node {
    constructor(type, value) {
        this.type   = type;
        this.value = value;
        this.child  = [];
    }
}

class ArrayParser {
    static parse(lexedTokens) {
        const parentNodes = [];
        let [parentNode, arrayElement, countParentNodes] = [{}, {}, 0];

        lexedTokens.forEach((lexedToken) => {
            if(lexedToken.name === 'arrayOpener') {
                const arrayNode = new Node('array');
                delete arrayNode.value;
                parentNode = arrayNode;
                parentNodes.push(parentNode);
            } else if(lexedToken.name === 'arrayCloser') {
                arrayElement = parentNodes.pop();
                countParentNodes = parentNodes.length;
                if(!(countParentNodes === 0)) {
                    parentNode = parentNodes[countParentNodes-1];
                    parentNode.child.push(arrayElement);
                }
                return;
            } else {
                const elementNode = new Node(lexedToken.name, lexedToken.value);
                parentNode.child.push(elementNode);
            }
        });
        return parentNode;
    }

    static run(string) {
        const lexedTokens = lexer.lex(string);
        if(!validation.checkValidation(lexedTokens)) return;
        return this.parse(lexedTokens);
    }
}

//const str3 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const str = "['1 2', '3,4', 'fdsa', 33, true, false       ]";
const result = ArrayParser.run(str);
console.log(JSON.stringify(result, null, 2)); 

