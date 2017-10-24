<template>
  <v-app>
    <myHeader/>
    <main>
      <v-content>
        <nuxt/>
      </v-content>
    </main>
    <myFooter/>
  </v-app>
</template>

<script>
import myHeader from '~/components/core/Header.vue'
import myFooter from '~/components/core/Footer.vue'

export default {
  components: {
    myHeader,
    myFooter
  }
}
</script>

<style scoped>

</style>
