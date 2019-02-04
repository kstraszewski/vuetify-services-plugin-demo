import Vue from 'vue'

const createModalTemplate = (modalComponent) => {
  return '' +
    `<v-dialog @keydown.esc="modalOptions.persistent ? () => {} : closeModal()" :persistent="modalOptions.persistent" scrollable v-model="showDialog" :fullscreen="modalOptions.fullscreen !== undefined ? modalOptions.fullscreen : $vuetify.breakpoint.xsOnly" :max-width="typeof modalOptions.maxWidth == 'number' ? (modalOptions.maxWidth + 'px') : modalOptions.maxWidth">` +
      `<v-card class="pa-0" :style="styles">` +
        `<v-icon v-if="!modalOptions.persistent" class="ma-2" @click="closeModal()" style="position: absolute; top: 4px; right: 5px; z-index: 1000;">close</v-icon>` +
        `<${modalComponent.name} :modal-data="modalData" :show-dialog.sync="showDialog"/>` +
      `</v-card>` +
    `</v-dialog>`
}

export default {
  open (modalComponent, modalData, modalOptions = {maxWidth: 650, persistent: false}) {
    return new Promise(resolve => {
      let extendedModalComponent = Vue.extend(modalComponent).extend({
        props: {
          showDialog: Boolean,
          modalData: Object | undefined
        },
        methods: {
          closeModal (data) {
            this.$emit('update:showDialog', false)
            resolve(data)
          }
        }
      })
      let TempComponent = Vue.component('mzn-modal', {
        data () {
          return {
            showDialog: true,
            modalData: modalData,
            modalOptions: modalOptions,
            styles: {
              'border-radius': '16px !important',
              'padding': '16px',
              'box-shadow': '0 2px 4px 0 rgba(38,38,38,.08) !important',
              'background': 'white'
            }
          }
        },
        components: {
          [modalComponent.name]: extendedModalComponent
        },
        methods: {
          closeModal (data) {
            this.showDialog = false
            resolve(data)
          }
        },
        template: createModalTemplate(modalComponent)
      })
      let ModalInstance = new TempComponent()
      ModalInstance.$mount()
    })
  }
}
