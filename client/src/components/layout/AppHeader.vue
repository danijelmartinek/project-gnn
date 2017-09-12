<template>
  <div class="appheader">
    <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" light>

    </v-navigation-drawer>
    <v-toolbar fixed class="blue" dark>
      <!-- <v-toolbar-side-icon dark @click.native.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>CARLESS</v-toolbar-title>
      <!-- <v-btn flat dark href="/">
        <span>POČETNA</span>
      </v-btn> -->
      <v-spacer></v-spacer>

      <Login></Login>

    </v-toolbar>
  </div>
</template>

<script>
import Login from '@/components/pages/Login'

export default {
  name: 'appheader',
  data () {
    return {
      drawer: null,
      mini: false,
      right: null
    }
  },
  components: {
    Login
  }
}
</script>
