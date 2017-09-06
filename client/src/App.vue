<template>
  <v-app id="example-2">
    <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" light>

    </v-navigation-drawer>
    <v-toolbar fixed class="deep-orange" dark>
      <v-toolbar-side-icon dark @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>CARLESS</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      drawer: null,
      mini: false,
      right: null
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

</style>
