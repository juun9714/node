const mongoose =require('mongoose')
const validator=require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true, 
    useCreateIndex:true,
    useUnifiedTopology: true 
    /*
    몽구스와 몽고디비가 같이 일할 때 인덱스를 만들어서 쉽게 접근할 수 있도록 해줌
    mongodb 모듈은 디비 주소를 connect하고, 그 다음에 연결 성공 반환값인 client.db(databaseName)으로 디비 이름 연결해서 디비 생성해줘야 했음
    그런데 mongoose 모듈은 주소와 디비 이름을 한번에 connect 해줄 수 있다.*/ 
})

/*
몽구스는 model의 첫번째 인자인 모델 이름 User을 받아서 소문자로 만들고, 
복수형를 취해서 그 이름으로 collection을 생성한다.
*/ 
const User=mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true,
        //trim은 문자열 중간에 있는 건 trim 해주지 못한다. 문자열 시작 전, 끝난 후에 있는 공백만 없애줌
        uppercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!!')
            } 
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password is included in your password !')
            }
        }
    },
    age:{
        type:Number,
        default:0,//if user does not provide age -> save it as 0 for default
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
})

const me=new User({
    name:'  haeri ',
    email:'DLGOFL85@DAVICHI.com  ',
    password:'hellowo     '
}) 
// age에 mike와 같은 문자열을 집어넣으면 오류 뜨면서 db에 새로 데이터 생성 안된다. --> 그런데 '30' 이렇게 넣으면 또 되더라고요? ... 머쨋든 최소한의 validation possible
//include 메서드 사용하기?



//Built in validation 
//require, max, min ...
//npm에 있는 validator module을 사용하면 더 복잡한 검증을 할 수 잇다.
//--> email 형식인지,, 등 ,


// save returns promise
me.save().then((me)=>{
    console.log(me)
}).catch((error)=>{
    console.log('Error!',error)
})


const Task=mongoose.model('Task',{
    Description:{
        type:String
    },
    Completed:{
        type:Boolean
    }
})
 
// const one=new Task({
//     Description:'Learn the Japanese',
//     Completed:false
// })

// one.save().then((one)=>{
//     console.log(one)
// }).catch((error)=>{
//     console.log('Fail',error)
// })
//save까지 해야 collection이 생성된다.
//save returns promise









const Pet=mongoose.model('Pet',{
    name:{
        type:String,
    },
    age:{
        type:Number
    },breed:{
        type:String
    }
})

// const nan=new Pet({
//     name:'Nanee',
//     age:14,
//     breed:'Dog'
// })

// nan.save().then((nan)=>{
//     console.log(nan)
// }).catch((error)=>{
//     console.log('Fail',error)
// })