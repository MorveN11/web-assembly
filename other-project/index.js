var trafficLights = document.querySelectorAll('.traffic-light');
var trafficLightsTwo = document.querySelectorAll('.traffic-light-third');
var car = document.querySelector('.car');
var wall = document.querySelector('.wall');
var carsecond = document.querySelector('.car-second');
var wallsecond = document.querySelector('.wall-second');
var carthird = document.querySelector('.car-third');
var wallthird = document.querySelector('.wall-third');
var carfourth = document.querySelector('.car-fourth');
var wallfourth = document.querySelector('.wall-fourth');

function checkCarPosition() {
    var carRight = car.getBoundingClientRect().right;
    var carLeft = car.getBoundingClientRect().left;
    var wallRight = wall.getBoundingClientRect().right;
    var wallLeft = wall.getBoundingClientRect().left;

    var carsecondRight = carsecond.getBoundingClientRect().right;
    var carsecondLeft = carsecond.getBoundingClientRect().left;
    var wallsecondRight = wallsecond.getBoundingClientRect().right;
    var wallsecondLeft = wallsecond.getBoundingClientRect().left;

    var carthirdTop = carthird.getBoundingClientRect().top;
    var carthirdBottom = carthird.getBoundingClientRect().bottom;
    var wallthirdTop = wallthird.getBoundingClientRect().top;
    var wallthirdBottom = wallthird.getBoundingClientRect().bottom;

    var carfourthTop = carfourth.getBoundingClientRect().top;
    var carfourthBottom = carfourth.getBoundingClientRect().bottom;
    var wallfourthTop = wallfourth.getBoundingClientRect().top;
    var wallfourthBottom = wallfourth.getBoundingClientRect().bottom;


    var isStopped = false;
    var isStoppedTwo = false;
    var isStoppedThird = false;
    var isStoppedFourth = false;


    for (var i = 0; i < trafficLights.length; i++) {
        var trafficLightColor = window.getComputedStyle(trafficLights[i]).getPropertyValue('content');
        if (carLeft < wallLeft && carRight > wallRight && (trafficLightColor.includes('Red') || trafficLightColor.includes('Yellow'))) {
            isStopped = true;
            break;
        }
    }

    if (isStopped) {
        car.style.animationPlayState = 'paused';
    } else {
        car.style.animationPlayState = 'running';
    }

    for (var i = 0; i < trafficLights.length; i++) {
        var trafficLightColor = window.getComputedStyle(trafficLights[i]).getPropertyValue('content');
        if (carsecondLeft < wallsecondLeft && carsecondRight > wallsecondRight && (trafficLightColor.includes('Red') || trafficLightColor.includes('Yellow'))) {
            isStoppedTwo = true;
            break;
        }
    }

    if (isStoppedTwo) {
        carsecond.style.animationPlayState = 'paused';
    } else {
        carsecond.style.animationPlayState = 'running';
    }


    for (var i = 0; i < trafficLightsTwo.length; i++) {
        var trafficLightColor = window.getComputedStyle(trafficLightsTwo[i]).getPropertyValue('content');
        if (carthirdTop < wallthirdTop && carthirdBottom > wallthirdBottom && (trafficLightColor.includes('Red') || trafficLightColor.includes('Yellow'))) {
            isStoppedThird = true;
            break;
        }
    }

    if (isStoppedThird) {
        carthird.style.animationPlayState = 'paused';
    } else {
        carthird.style.animationPlayState = 'running';
    }

    for (var i = 0; i < trafficLightsTwo.length; i++) {
        var trafficLightColor = window.getComputedStyle(trafficLightsTwo[i]).getPropertyValue('content');
        if (carfourthTop < wallfourthTop && carfourthBottom > wallfourthBottom && (trafficLightColor.includes('Red') || trafficLightColor.includes('Yellow'))) {
            isStoppedFourth = true;
            break;
        }
    }

    if (isStoppedFourth) {
        carfourth.style.animationPlayState = 'paused';
    } else {
        carfourth.style.animationPlayState = 'running';
    }

    requestAnimationFrame(checkCarPosition);
}

requestAnimationFrame(checkCarPosition);
