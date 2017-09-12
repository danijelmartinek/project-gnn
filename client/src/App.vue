<template>
  <v-app id="app">

    <AppHeader></AppHeader>

    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>

    <AppFooter></AppFooter>

  </v-app>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader'
import AppFooter from '@/components/layout/AppFooter'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
