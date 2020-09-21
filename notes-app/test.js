const yargs=require('yargs')
//yargs.version('1.1.0')


yargs.command({ //command를 추가한다
    command:'add', //그 command 이름은 add이다
    describe:'Create new note with given title and body !', //command의 설명
    builder:{ //builder란 add명령을 했을 때, 함께 전달받아야할 내용들을 설정하는 것
        title:{ //title이라는 것을 받아야 하는데, title의 특징은 이러저러하다는 걸 설정하는 것
            describe:'Note title', //title은 뭐냐면 이런거야
            demandOption:true, //title은 add 명령이 이루어지면 꼭 전달받아야해, 안받으면 에러를 띄워
            type:'string' //title은 문자열 형태로 받아야해 
        },
        body:{ //body라는 것도 받어야 혀
            describe:'Note Body',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
        console.log('Title: '+argv.title + '\nBody: '+argv.body)
        console.log('Add function is called!\n\n\n\n\n\n')
    } //handler란 add명령이 내려졌을 때, 실행할 내용
})

console.log(yargs.argv)






