<template>
  <v-app id="example-2">
    <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" light>

    </v-navigation-drawer>
    <v-toolbar fixed class="blue" dark>
      <!-- <v-toolbar-side-icon dark @click.native.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>CARLESS</v-toolbar-title>
      <v-btn flat dark href="/">
        <span>POČETNA</span>
      </v-btn>
      <v-spacer></v-spacer>

      <v-layout row justify-center style="position: relative;">
        <v-dialog v-model="dialog" absolute width="500">
          <v-btn flat dark slot="activator">PRIJAVI SE</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">PRIJAVA</span>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <span class="body-2">Upišite vaše STRAVA podatke:</span>
              <v-text-field label="Email"></v-text-field>
              <v-text-field label="Lozinka" type="password"></v-text-field>
              <v-btn flat dark large><img src="./assets/btn_strava_connectwith_orange.svg"></v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

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
      right: null,
      dialog: false
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

</style>
