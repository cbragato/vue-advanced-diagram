import { VueConstructor } from 'vue'
import Diagram from './components/Diagram.vue'

const LibraryModule = {
  Diagram,
  install(Vue: VueConstructor): void {
    Vue.component("diagram", Diagram)
  }
}

export {
  LibraryModule,
  Diagram
}