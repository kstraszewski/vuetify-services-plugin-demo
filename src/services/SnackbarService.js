import Vue from 'vue'

const templatesType = {
  error: '<div><v-snackbar v-model="showSnackbar" :timeout="duration" style="padding: 0px 24px"><span><v-icon style="color: #F40545">error</v-icon> {{msg}}</span><v-btn small @click="showSnackbar = false" flat>Close</v-btn></v-snackbar></div>',
  success: '<div><v-snackbar v-model="showSnackbar" :timeout="duration" style="padding: 0px 24px"><span><v-icon style="color: #99FF33">done</v-icon> {{msg}}</span><v-btn small @click="showSnackbar = false" flat>Close</v-btn></v-snackbar></div>',
  warning: '<div><v-snackbar v-model="showSnackbar" :timeout="duration" style="padding: 0px 24px"><span><v-icon style="color: #FBC104">warning</v-icon> {{msg}}</span><v-btn small @click="showSnackbar = false" flat>Close</v-btn></v-snackbar></div>'
}

const CreateSnackBarComponent = (type, msg, duration) => Vue.component('fp-snackbar', {
  data () {
    return {
      msg: msg,
      showSnackbar: false,
      duration: duration
    }
  },
  mounted () {
    setTimeout(() => {
      this.showSnackbar = true
    }, 20)
    setTimeout(() => {
      this.showSnackbar = false
    }, 2000)
  },
  template: templatesType[type]
})
const openSnackBar = (type, msg, duration = 2000) => {
  const VueSnackBarComponent = Vue.extend(CreateSnackBarComponent(type, msg, duration))
  let SnackBarInstance = new VueSnackBarComponent()
  SnackBarInstance.$mount()
  document.getElementsByClassName('application')[0].appendChild(SnackBarInstance.$el)
}
export default {
  openSuccessSnackbar (msg, duration) {
    openSnackBar('success', msg, duration)
  },
  openErrorSnackbar (msg, duration) {
    openSnackBar('error', msg, duration)
  },
  openWarningSnackbar (msg, duration) {
    openSnackBar('warning', msg, duration)
  }
}
