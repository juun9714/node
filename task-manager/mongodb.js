//CRUD create read update delete

// const mongodb=require('mongodb');
// const MongoClient=mongodb.MongoClient;
// const ObjectID=mongodb.ObjectID
//아래 한줄로 위에 세줄 똑같은 기능
const {MongoClient,ObjectID}=require('mongodb');


// const id = new ObjectID();
// console.log(id.id); //--> brand new object id 실행할 때마다 다른 값 반환
// //반환하는 값은 사실 binary data임, string 아님
// //length -> byte 기준
// console.log(id.id.length); //--> brand new object id 실행할 때마다 다른 값 반환
// console.log(id.toHexString().length)
// console.log(id.getTimestamp());


const connectionURL='mongodb://127.0.0.1:27017'
//몽고 디비가 돌고있는 서버의 주소와 전용 포트를 url에 저장
const databaseName='task-manager'
//우리 디비의 이름이 될 것 지정



//우리의 js파일과 mongodb를 연결하는 함수 mongoclient의 메서드인 connect 함수를 활용한다. 
//인자는 디비가 돌고 있는 서버 주소와 콜백함수, 가운데꺼는 뭔지 모르겠음
//콜백함수로 error인지 성공인지 체크 
//성공하면 반환하는 client 변수의 메서드인 db를 활용
//성공하면 db메서드를 활용해서 바로 task-manager라는 데이터베이스 하나를 생성한다.
//그 db가 저장된 db라는 변수의 메서드를 통해서 users라는 collection을 만들어내고, insertOne 메서드를 통해서 데이터 하나를 추가!
MongoClient.connect(connectionURL, {    useNewUrlParser:true, useUnifiedTopology:true    }, (error, client)=>{
    if(error){
        return console.log("Unable to connect to database");
    }

    //name of the db i want to manipulate (for ref)
    //client connect method의 콜백함수의 성공시 반환값
    const db = client.db(databaseName);

    db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
        if(error){
            return console.log("fail");
        }
        console.log(tasks);
    });

    db.collection('tasks').findOne({_id:new ObjectID("5f7d912b0f8cf308889a226a")},(error, task)=>{
        if(error){
            return console.log("fail");
        }
        console.log(task);
    })
});










    // db.collection('users').findOne({ _id : new ObjectID("5f7d851c4fc1fa06887fe319") },(error, user)=>{
    //     if(error){
    //         return console.log("fail to fetch");
    //     }
    //     console.log(user);
    // })

    //find는 콜백없음, cursor을 반환한다. cursor은 원하는 데이터가 아니고, 원하는 데이터를 가리키는 포인터임
    //cursor의 메서드를 보면 toArray가 있음 -> toArray는 콜백함수를 갖는다. 성공하면 users에 담김

    // db.collection('users').find({ age:24 }).toArray((error,users)=>{
    //     console.log(users);
    // });

    // db.collection('users').find({ age:24 }).count((error, count)=>{
    //     console.log(count);

    // })





    // db.collection('users').insertOne({
    //     name: 'Hee',
    //     age:26
    // },(error, result)=>{
    //     //insertOne의 callback함수 
    //     if(error){
    //         return console.log("Unable to insert user");
    //     }

    //     //insertOne의 callback 함수인 insertOneWriteOpCallback(error, result)의 성공 반환값인 result의 프로퍼티인 ops를 활용하면 
    //     //ops	Array.<object>	All the documents inserted using insertOne/insertMany/replaceOne. 
    //     //Documents contain the _id field if forceServerObjectId == false for insertOne/insertMany
    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'Jen',
    //         age:24
    //     },{
    //         name:"Tom",
    //         age:28
    //     }
    // ],(error, result)=>{
    //     if(error){
    //         return console.log("Fail to insertMany")
    //     }

    //     console.log(result.ops);
    // })


    //mongodb's id => globally unique id(GUID) => db간의 id충돌이 없음
    //mongodb의 라이브러리를 통해서 id를 생성할 수 있음
//     db.collection('tasks').insertMany([
//         {
//         description:'Learn C++',
//         completed:false
//     },{
//         description:'Learn Node js',
//         completed:false
//     },{
//         description:'Learn Japanese',
//         completed:true
//     }
// ],(error, result)=>{
//     if(error){
//         return console.log('Fail to add things to tasks collection')
//     }

//     console.log(result.ops);

// })