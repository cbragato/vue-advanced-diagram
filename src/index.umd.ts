import { LibraryModule, Diagram } from "./main";

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(LibraryModule)
}

export { Diagram }