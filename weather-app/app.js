//npm init
//npm init -y
//http://api.weatherstack.com/current?access_key=533f04916d0237b8b99c4e1fbefe0e20&query=37.8267,-122.4233
// /current?access_key='api access key'&query=위도 경도
//--> 이 링크에 json파일로 우리가 원하는 정보가 들어있다.

const request=require('request')
//url 얻는 방법 https://weatherstack.com/documentation#current_weather 에 가면 api documentation이 있고, current weather 탭에서 쓰는 방법을 찾을 수 있다.
const url='http://api.weatherstack.com/current?access_key=533f04916d0237b8b99c4e1fbefe0e20&query=37.8267,-122.4233&units=f' //work well url
//const url='http://api.weatherstack.com/current?access_key=533f04916d0237b8b99c4e1fbefe0e20&query=' //error url

//우린 지금 http로 request를 보내는 거야 !
request({ url: url, json: true }, (error, response)=>{
    //error와 response는 하나가 있으면 하나가 없는 관계
    //error의 code 멤버로 어떤 에러가 발생했는지 확인하고 안내 문구를 바꿀 수 있다.

    //console.log(response)
    //json 객체 추가 전
    //const data=JSON.parse(response.body)//json인 response의 멤버인 body만을 객체로 만들어서 data에 저장
    //console.log(data.current);//response.body.current

    //json 객체 추가 후 -> json 파일을 자동으로 객체로 만들어서 response에 넣어준다
    //console.log(response.body.current)
    //여기서 body는 그냥 json 전체를 뜻하는 듯

    //console.log(error)
    //error 객체가 존재한다 = 시스템상의 에러가 발생했다 ex) network error
/*     if(error){ //low level os error ex) network error
        console.log('Unable to connect to Weather Service !');
        //error를 더럽게 보여주기 보단, 보기좋게 알아듣게 에러를 제시할 수 있다.
    }else if(response.body.error){//error를 구분
        //os상의 문제가 아닌 경우에, response의 body에 error 멤버에 내용이 뜨지, error 객체만 생성되고 response 객체가 생성되지 않는 것이 아님
        //ex) 위도 경도를 건네주지 않은 경우
        console.log('Unable to find location')
    }else{
        console.log(response.body.current.weather_descriptions[0]+' now. It is currently '+response.body.current.temperature+' degrees out. But it feels like '+response.body.current.feelslike+' degrees out... 😂')
    } */
})
//지정한 url로 request를 보낸다. response에 답변 json을 받아온다. 받아온 response를 가지고 함수 내용을 설정한다.

//언어도 바꿔보고, 화씨 섭씨도 바꿔볼겨
//객체에 json:true 하면 자동으로 json을 parse 해는 거 같어

//Geocoding api 에서 response 가져오는거 해볼거야 챌린지로 
//Address(동네 이름) -> 넣어서 geocoding에서 (위도 경도) 가져와서 -> 위도경도로 weather-stack 써서 날씨 가져올거야 
//우린 forward geocoding : 1. longitude 2. latitude
//option은 &하고 쓰면 되는 기준들 같은 것이다. limit=1--> 하나의 결과만 보여준다.

//geo 챌린지
//url은 https://docs.mapbox.com/api/search/#forward-geocoding 에 가면 쓰는 방법 + sample 코드가 있다.


//const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/yatap%20station.json?access_token=pk.eyJ1IjoianVuZTk3MTQiLCJhIjoiY2tmZmM4ZXloMGRsdDJycGlzYTlhanE4aCJ9.pJPQet5VpnagGQ7b8i24Ww&limit=1'//work well url

const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/Sungkyunkwan.json?access_token=pk.eyJ1IjoianVuZTk3MTQiLCJhIjoiY2tmZmM4ZXloMGRsdDJycGlzYTlhanE4aCJ9.pJPQet5VpnagGQ7b8i24Ww&limit=1' //error url

request({url:geoUrl, json:true},(error, response)=>{
    if(error){ //시스템상 오류인 경우 
        console.log('Unable to connect to MAPBOX service')
    }else if(response.body.message=="Not Found"){ //주소를 입력하지 않은 경우
        console.log('Please make sure your location key words to be inserted')
    }else if(response.body.features.length === 0){ //이상한 주소일 경우 빈 배열인데 이렇게 되넹,,,
        console.log('Unable to find location. Try another search')
    }else{ //성공할 경우
        const feat=response.body.features[0] //데이터 구조를 잘 확인하는 것이 중요하다
        console.log('Place name : '+feat.place_name)
        console.log('Longitude : '+feat.center[0]+', Latitude : '+feat.center[1])
    }

    
})