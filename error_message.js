module.exports = {
    printArrayNotMatchedErrorMsg()       {console.log("'[', ']'개수가 맞지 않습니다");},
    printNotHaveInitialArrayErrorMsg()   {console.log("array로 시작해야해요");},
    printStringConventionErrorMsg(value) {console.log(`${value}은 올바른 문자열이 아닙니다.`);},
    printNotHaveDataTypeErrorMsg(value)  {console.log(`${value}은 알수 없는 Type입니다.`);}
}