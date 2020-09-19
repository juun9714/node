const fs =require('fs')

//const book={
//    title:'If we cannot go at the speed of light',
//    author:'Choyeop Kim'
//}

//const bookJSON=JSON.stringify(book);
//fs.writeFileSync('1-json.json',bookJSON);

/* const dataBuffer=fs.readFileSync('1-json.json');//머신코드가 됨
const dataJSON=dataBuffer.toString();//머신코드를 다시 문자열로 
const data=JSON.parse(dataJSON);//문자열을 다시 짤라서 객체로!
console.log(data.title); */

/* 
1. json파일을 가져와서 객체로 만들기
    **Buffer로 만들어서 그걸 문자열로 바꾸기**
--> const toBuffer=readFileSync('1-json.json')
    **Buffer를 다시 문자열로 바꾸기**
--> const str=toBuffer.toString();
    **문자열을 짤라서 객체로 바꾸기** 
    const obJ=JSON.parse(str);
    객체의 멤버를 변경하기 --> 현재 객체 상태
    **객체를 문자열로 바꿔서 파일에 덮어쓰기**
    const strobJ=JSON.stringify(obJ);
    fs.writeFileSync('1-json.json',strobJ);



*/


const content=fs.readFileSync('1-json.json');
console.log(content);
const strcontent=content.toString();
console.log(strcontent);
const myobJ=JSON.parse(strcontent);
console.log(myobJ);
myobJ.name='June';
myobJ.planet='Ryudmila';
myobJ.age=24;
console.log(myobJ);
const toSTR=JSON.stringify(myobJ);
console.log(toSTR);
fs.writeFileSync('1-json.json',toSTR);


//convert into json,,!
//객체인 book을 stringfy해서 JSON 파일로 만들었음
//json은 문자열이고 객체가 아님.
//JSON.parse는 JSON 파일을 짤라서 JS객체로 만들어줌