import { Application } from "solo-application";

export default class MediaEvents {
    constructor({ events }) {
        this._events = events;
        global.addEventListener("resize", this.onResize.bind(this));
        // global.removeEventListener("resize", this._calculateVisbleButtonCount);
    }

    get currentWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    get currentHeight() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }

    onResize() {
        const width = this.currentWidth;
        const height = this.currentHeight;
        this._events.fireWait("screenResize", { width, height });
    }

    onMediumScreen(func) {
        return this.onMediumScreenLessThan(func, Application.configuration.media["medium-screen"]);
    }

    onMediumScreenLessThan(func, lessThanWidth) {
        var lastWidth = lessThanWidth + 1;
        Application.configuration.colors["main-blue"];
        const off = this._events.on("screenResize", ({ width, height }) => {
            if (lastWidth > lessThanWidth !== width > lessThanWidth){
                func({ width, height, isLess: lastWidth > lessThanWidth });
                lastWidth = width;
            }
        });
        func({
            width: this.currentWidth,
            height: this.currentHeight,
            isLess: this.currentWidth < lessThanWidth
        });
        this.onResize();
        return off;
    }
}
