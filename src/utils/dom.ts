import { ClientRect } from '../dataTypes/ClientRect';

export type Dimension = {
    width: number;
    height: number;
};

function getContentDimensions(): Dimension {
    return {
        height: Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
        ),
        width: Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
        ),
    };
}

export function getWindowDimensions(): Dimension {
    return {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
    };
}

export function getPageDimensions(): Dimension {
    const contentDimension = getContentDimensions();
    const windowDimension = getWindowDimensions();

    return {
        height: Math.max(contentDimension.height, windowDimension.height),
        width: Math.max(contentDimension.width, windowDimension.width),
    };
}

function getScrollDimensions(): Dimension {
    return {
        height: window.pageYOffset,
        width: window.pageXOffset,
    };
}

function css(element: HTMLElement, property: string): string {
    return window.getComputedStyle(element).getPropertyValue(property);
}

function getParentElements(element: HTMLElement): HTMLElement[] {
    const parents = [];

    let child = element;
    while (child.parentElement) {
        parents.push(child.parentElement);
        child = child.parentElement;
    }

    return parents;
}

export function isElementFixed(element: HTMLElement): boolean {
    const parents = getParentElements(element);
    const elements = [element].concat(parents);
    return elements.some((element) => css(element, 'position') === 'fixed');
}

export function getAllBoundaries(elements: HTMLElement[]): ClientRect[] {
    return elements.map((element) => {
        return ClientRect.from(element.getBoundingClientRect());
    });
}

export function addPadding(
    rectangular: ClientRect,
    padding: number,
): ClientRect {
    const left = rectangular.left - padding;
    const right = rectangular.right + padding;
    const top = rectangular.top - padding;
    const bottom = rectangular.bottom + padding;

    return new ClientRect(left, right, top, bottom);
}

export function addPageOffset(
    rectangular: ClientRect,
    isFixed: boolean,
): ClientRect {
    const scrollDimensions = getScrollDimensions();

    const left = rectangular.left + (isFixed ? 0 : scrollDimensions.width);
    const right = rectangular.right + (isFixed ? 0 : scrollDimensions.width);
    const top = rectangular.top + (isFixed ? 0 : scrollDimensions.height);
    const bottom = rectangular.bottom + (isFixed ? 0 : scrollDimensions.height);

    return new ClientRect(left, right, top, bottom);
}

export function addClasses(element: HTMLElement, classes: string): void {
    const classArr = classes.split(' ');
    // eslint-disable-next-line prefer-spread
    element.classList.add.apply(element.classList, classArr);
}
