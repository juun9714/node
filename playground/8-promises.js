const doWorkPromise=new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //resolve([7,4,1])
        reject("Someting went wrong!")
        reject("Someting went wrong2!")
    },2000);
})

doWorkPromise.then((result)=>{
    //resolve가 실행되었을 때, resolve에 전달된 값을 result가 받는듯
    console.log("Success",result);
}).catch((error)=>{
    //reject가 실행되었을 때, reject에 전달된 값을 error가 받는듯
    console.log("Error !",error);
})

/*
프로그래머가 if문을 쓰지 않아도 됨
promise에서는 resolve 아니면 reject 둘중에 하나만 작동하면 promise는 종료된다. 
둘 다 작동되거나, 하나가 두 번 작동되거나 그런 일은 일어나지 않음
promise의 경우, resolve - reject1 - reject2 의 순서로 있을 때, resolve가 일어나면 그 뒤에 뭐가 있든 실행하지 않는다. 만약 reject - resolve의 순서로 이루어져 있다면, reject만 실행되고 reolve는 실행되지 않는다. 
왼쪽의 경우 setTimeout에 callback을 두 번 넣으면 각각 두번 실행된다. 
*/


/*

promise -- pending --> 
if resolve is called = fulfilled
if reject is called = rejected
*/