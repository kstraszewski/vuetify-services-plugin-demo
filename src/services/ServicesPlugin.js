import Vuetify from 'vuetify'
import ModalService from './ModalService'
import SnackbarService from './SnackbarService'
import 'vuetify/dist/vuetify.min.css'

const ServicesPlugin = {
  install (Vue, options = {}) {
    Vue.use(Vuetify, options.vuetifyOptions)
    // services
    Vue.prototype.$snackbarService = SnackbarService
    Vue.prototype.$modalService = ModalService
  }
}
export default ServicesPlugin
