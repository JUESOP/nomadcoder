// 1. 실시간 시계
let clock = document.querySelector('.h1-clock');

function getTime(){
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    clock.innerHTML = `${hour<10 ? `0${hour}`:hour}:${minutes<10 ? `0${minutes}`:minutes}:${seconds<10 ? `0${seconds}`:seconds}`
}
setInterval(getTime, 1000);

// 2. to do list
let itemList = [];
let inputButton = document.querySelector(".input__button");
inputButton.addEventListener("click", addItem);

function addItem() {
    let item = document.querySelector(".item").value;
    if (item != null) {
        itemList.push(item);
        document.querySelector(".item").value = "";
        document.querySelector(".item").focus();
    }

    showList();
}

function showList() {
    let list = "<ul>"
    for (let i = 0; i <itemList.length; i++) {
        list += "<li>" + itemList[i] + "<span class='close' id=" + i + ">" + "\u00D7" + "</span></li>";
    }
    list += "</ul>";
    document.querySelector(".item__list").innerHTML = list;


    let deleteButtons = document.querySelectorAll(".close");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteItem);
    }
}

function deleteItem() {
    let id = this.getAttribute("id");
    itemList.splice(id, 1);
    showList();
}

let checkList = document.querySelector('.item__list');
checkList.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
  }
});

// 3. 랜덤 배경 이미지

const body = document.querySelector('body');

const createImg  = (number) => {
    // <img> 요소를 만듭니다.
    const img = document.createElement('img');

    // <img> src, alt 값을 지정하고 'bgImg' 클래스를 추가합니다.
    img.src = `images/img_0${number}.jpg`;
    img.alt = 'background images';
    img.classList.add('bgIme');

    // <body>에 <img> 삽입
    body.prepend(img);
}

const getRandom = () => {
    // 이미지 개수. 얼마든지 변경 가능.
    const IMG_NUM = 3;

    // 1 부터 3 까지의 랜덤 숫자 만들기
    let num = Math.floor(Math.random() * IMG_NUM ) + 1;

    // 이미지 생성함수 호출
    createImg(num);
}

// 마지막으로 getRandom 함수 호출
getRandom();

// 4. 날씨와 위치
const COORDS = "coords";

function handleGeoSucces(position) {
  console.log(position);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    //
  }
}

function init() {
  loadCoords();
}

init();

// 추가
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  }
  
  // handleGeoSucces 수정
  function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude,
    };
    saveCoords(coordsObj);
  }


