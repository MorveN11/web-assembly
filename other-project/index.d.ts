declare class DOMElements {
    constructor();

    getTrafficLights(): NodeListOf<Element>;
    getTrafficLightsTwo(): NodeListOf<Element>;
    getCar(): HTMLElement | null;
    getWall(): HTMLElement | null;
    getCarSecond(): HTMLElement | null;
    getWallSecond(): HTMLElement | null;
    getCarThird(): HTMLElement | null;
    getWallThird(): HTMLElement | null;
    getCarFourth(): HTMLElement | null;
    getWallFourth(): HTMLElement | null;
}

export { DOMElements };