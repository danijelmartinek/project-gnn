<template>
  <div class="name">
    <v-tabs light fixed icons centered>
      <v-tabs-bar class="transparent">
        <v-tabs-item href="#tab-1">
          <v-icon>directions_bike</v-icon>
        </v-tabs-item>
        <v-tabs-item href="#tab-2">
          <v-icon>directions_run</v-icon>
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content
          v-for="i in 3"
          :key="i"
          :id="'tab-' + i"
        >
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
  export default {
    name: 'main',
    data () {
      return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>
