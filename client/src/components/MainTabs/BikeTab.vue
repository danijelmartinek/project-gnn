<template>
  <div class="biketab">
    <v-container>
      <v-layout row wrap align-center justify-center>
        <v-flex xs6>
          <v-layout align-center justify-center>
            <v-flex xs12 class="py-2">
              <v-btn-toggle mandatory v-model="toggle_one">
                <v-btn flat>
                  <span>Dnevno</span>
                </v-btn>
                <v-btn flat>
                  <span>Tjedno</span>
                </v-btn>
                <v-btn flat>
                  <span>Mjesečno</span>
                </v-btn>
                <v-btn flat>
                  <span>Godišnje</span>
                </v-btn>
              </v-btn-toggle>
            </v-flex>
          </v-layout>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">
                <v-chip class="lime darken-1 white--text">1.</v-chip>
              </div>
              <div slot="header">
                <v-chip class="transparent">
                  <v-avatar>
                    <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="pero">
                  </v-avatar>
                  Pero Perić
                </v-chip>
              </div>
              <div slot="header">
                <div slot="header">
                  <v-chip>28 km</v-chip>
                </div>
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs3>
                        <v-card light class="white">
                          <v-card-text class="px-0">DNEVNA: 2 km</v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex xs3>
                        <v-card light class="white">
                          <v-card-text class="px-0">TJEDNA: 2 km</v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex xs3>
                        <v-card light class="white">
                          <v-card-text class="px-0">MJESEČNA: 2 km</v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex xs3>
                        <v-card light class="white">
                          <v-card-text class="px-0">GODIŠNJA: 2 km</v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex xs2 v-for="i in 6" :key="i">
                        <v-card dark class="primary">
                          <v-card-text class="px-0">2</v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex xs1 v-for="i in 12" :key="i">
                        <v-card dark class="secondary">
                          <v-card-text class="px-0">1</v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
              <div slot="header">
                <v-chip class="grey lighten-1 white--text">2.</v-chip>
              </div>
              <div slot="header">
                <v-chip class="transparent">
                  <v-avatar>
                    <img src="https://randomuser.me/api/portraits/men/40.jpg" alt="klaudio">
                  </v-avatar>
                  Klaudio Trakovakovski
                </v-chip>
              </div>
              <div slot="header">
                <div slot="header">
                  <v-chip>23 km</v-chip>
                </div>
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
              <div slot="header">
                <v-chip class="yellow darken-4 white--text">3.</v-chip>
              </div>
              <div slot="header">
                <v-chip class="transparent">
                  <v-avatar>
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="pero">
                  </v-avatar>
                  Živorad Jurić
                </v-chip>
              </div>
              <div slot="header">
                <div slot="header">
                  <v-chip>18 km</v-chip>
                </div>
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
              <div slot="header">
                <v-chip>4.</v-chip>
              </div>
              <div slot="header">
                <v-chip class="transparent">
                  <v-avatar>
                    <img src="https://randomuser.me/api/portraits/men/21.jpg" alt="pero">
                  </v-avatar>
                  Jasmin Tukelj
                </v-chip>
              </div>
              <div slot="header">
                <div slot="header">
                  <v-chip>6 km</v-chip>
                </div>
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
              </v-card>
            </v-expansion-panel-content>

          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'BikeTab',
    data () {
      return {
        text: 'center',
        icon: 'justify',
        toggle_none: null,
        toggle_one: 0,
        toggle_exclusive: 2,
        toggle_multiple: [0, 1, 2]
      }
    }
  }
</script>

<style>
