//npm init
//npm init -y
//http://api.weatherstack.com/current?access_key=533f04916d0237b8b99c4e1fbefe0e20&query=37.8267,-122.4233
// /current?access_key='api access key'&query=위도 경도
//--> 이 링크에 json파일로 우리가 원하는 정보가 들어있다.

const request=require('request')

const url='http://api.weatherstack.com/current?access_key=533f04916d0237b8b99c4e1fbefe0e20&query=37.8267,-122.4233&units=f'
//우린 지금 http로 request를 보내는 거야 !
request({ url: url, json: true }, (error, response)=>{
    //console.log(response)
    //json 객체 추가 전
    //const data=JSON.parse(response.body)//json인 response의 멤버인 body만을 객체로 만들어서 data에 저장
    //console.log(data.current);//response.body.current

    //json 객체 추가 후 -> json 파일을 자동으로 객체로 만들어서 response에 넣어준다
    //console.log(response.body.current)
    //여기서 body는 그냥 json 전체를 뜻하는 듯

    //console.log(response.body.current.weather_descriptions[0]+' now. It is currently '+response.body.current.temperature+' degrees out. But it feels like '+response.body.current.feelslike+' degrees out... 😂')
})
//지정한 url로 request를 보낸다. response에 답변 json을 받아온다. 받아온 response를 가지고 함수 내용을 설정한다.

//언어도 바꿔보고, 화씨 섭씨도 바꿔볼겨
//객체에 json:true 하면 자동으로 json을 parse 해는 거 같어

//Geocoding api 에서 response 가져오는거 해볼거야 챌린지로 
//Address -> 넣어서 geocoding에서 (위도 경도) 가져와서 -> 위도경도로 weather-stack 써서 날씨 가져올거야 
//우린 forward geocoding : 1. longitude 2. latitude
//option은 &하고 쓰면 되는 기준들 같은 것이다. limit=1--> 하나의 결과만 보여준다.

//geo 챌린지
const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/yatap%20station.json?access_token=pk.eyJ1IjoianVuZTk3MTQiLCJhIjoiY2tmZmM4ZXloMGRsdDJycGlzYTlhanE4aCJ9.pJPQet5VpnagGQ7b8i24Ww&limit=1'

request({url:geoUrl, json:true},(error, response)=>{
    const feat=response.body.features[0] //데이터 구조를 잘 확인하는 것이 중요하다
    console.log('Place name : '+feat.place_name)
    console.log('Longitude : '+feat.center[0]+', Latitude : '+feat.center[1])
})