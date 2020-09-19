const fs=require('fs');
const chalk=require('chalk');

const getNotes=()=> {
    return 'Your notes ...'
}

const addNote=(title,body)=>{
    //get the note saved to disk
    const notes=loadNotes();
    //filter 메서드 안에 제공되는 함수의 인자는 자동으로 배열의 각 요소를 가리키게 되는듯?
    //그리고 filter 메서드는 true를 반환하는 배열의 요소를 반환한다.
    const duplicateNotes=notes.filter((note) => note.title===title)

    if(duplicateNotes.length===0){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen('New note added !  :)  '));
    }else{
        console.log(chalk.bgRed('Note title taken! !  :(  '));
    }

    //push 메서드는 애초에 배열의 매서드로 배열의 맨 끝에 새로운 자료를 추가해주고 배열의 길이를 반환해준다. 
    //saveNotes 함수는 전달한 notes 배열을 json파일로 바꾼 후, 그 내용으로 파일을 생성했다! 
    //계속 추가된 배열을 문자열로 바꿔서 파일 덮어쓰기를 하는 것과 같음
    saveNotes(notes)
}

const saveNotes= (notes) => {
    const dataJSON=JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}



const loadNotes=() => {
    /*
    첫번째 실행이라면(notes.json 파일이 아예 존재하지 않을 때) 빈 배열을 생성해서 addNote 함수의 notes라는 변수에 반환해주고 끝난다.

    첫번째 실행이 아니라면 지금  json파일로 저장되어 있는 파일을 버퍼로 읽어온 후, 
    문자 형식으로 바꾸고, 나눈 다음 객체로 만든 것을 반환해주고 끝난다. 
    그 객체 형식을 반환한다.
    그 객체는 add function의 notes 변수에 저장될 것이다.
    */
    try{
        const dataBuffer=fs.readFileSync('notes.json');
        const dataJSON=dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return []
    }
}

const removeNote=(title) => {
    const notes=loadNotes(); //const에는 재할당이 안된다.

    /* 
    const notesToKeep=notes.filter(function(note){
        return note.title !==title;
    }) 
    */

    const notesToKeep=notes.filter((note) => note.title !==title)
    
    if(notesToKeep.length===notes.length){
        console.log(chalk.bgRed('No note found !  :(  '))
    }else{
        console.log(chalk.bgGreen('Note removed !  :)  '))
        saveNotes(notesToKeep);
    }

    
}



module.exports={
    //객체로 내보내면 여러개 내보낼 수 있음!
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote
}