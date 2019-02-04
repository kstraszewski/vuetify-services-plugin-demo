<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <v-btn @click="openModal()">Open modal</v-btn>
    <v-btn @click="openSnackbar()">Open snackbar</v-btn>
  </div>
</template>

<script>
import FooComponent from './FooComponent.vue'

export default {
  methods: {
    async openModal () {
      let response = await this.$modalService.open(FooComponent, {
        data: '123'
      })
      console.log(response)
    },
    openSnackbar () {
      this.$snackbarService.openSuccessSnackbar('Hallo world')
    }
  }
}
</script>
