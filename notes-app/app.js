const chalk=require('chalk');
const notes=require('./notes.js');//이제 여러 함수를 넘겨받은 변수가 되었움
const yargs=require('yargs');

//Customize yargs
yargs.version('1.1.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note Body',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body);
    }
})

//Create remove command
yargs.command({
    command : 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe:'Note title to be removed',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//Create list command
yargs.command({
    command:'list',
    describe:'List all notes',
    handler(){
        notes.listNotes();
    }
})

//Create read command
yargs.command({
    command:'read',
    describe:'Read the note',
    builder:{
        title:{
            describe:"Note's title to be read",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

//add remove read list

yargs.parse();
