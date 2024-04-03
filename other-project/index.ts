import { DOMElements } from './index.d';

const domElements = new DOMElements();

interface TrafficLight extends Element {
    style: CSSStyleDeclaration;
}

interface CarElement extends HTMLElement {
    style: CSSStyleDeclaration;
}

function checkCarPosition(): void {
    const trafficLights = domElements.getTrafficLights();
    const trafficLightsTwo = domElements.getTrafficLightsTwo();
    const car = domElements.getCar() as CarElement;
    const wall = domElements.getWall() as HTMLElement;
    const carSecond = domElements.getCarSecond() as CarElement;
    const wallSecond = domElements.getWallSecond() as HTMLElement;
    const carThird = domElements.getCarThird() as CarElement;
    const wallThird = domElements.getWallThird() as HTMLElement;
    const carFourth = domElements.getCarFourth() as CarElement;
    const wallFourth = domElements.getWallFourth() as HTMLElement;

    function isCarStopped(car: CarElement, wall: HTMLElement, lights: NodeListOf<Element>): boolean {
        const carLeft = car.getBoundingClientRect().left;
        const carRight = car.getBoundingClientRect().right;
        const wallLeft = wall.getBoundingClientRect().left;
        const wallRight = wall.getBoundingClientRect().right;

        for (let i = 0; i < lights.length; i++) {
            const trafficLightColor = window.getComputedStyle(lights[i] as TrafficLight).getPropertyValue('content');
            if (carLeft < wallLeft && carRight > wallRight && (trafficLightColor.includes('Red') || trafficLightColor.includes('Yellow'))) {
                return true;
            }
        }

        return false;
    }

    function updateCarState(car: CarElement, isStopped: boolean) {
        car.style.animationPlayState = isStopped ? 'paused' : 'running';
    }

    const stopCar = (car: CarElement, wall: HTMLElement, lights: NodeListOf<Element>) => updateCarState(car, isCarStopped(car, wall, lights));

    requestAnimationFrame(function animate() {
        stopCar(car, wall, trafficLights);
        stopCar(carSecond, wallSecond, trafficLights);
        stopCar(carThird, wallThird, trafficLightsTwo);
        stopCar(carFourth, wallFourth, trafficLightsTwo);
        requestAnimationFrame(animate);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    checkCarPosition();
});

export { DOMElements };
