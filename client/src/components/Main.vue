<template>
  <div class="main">
    <v-card>
      <v-tabs light fixed icons centered>
        <v-tabs-bar class="transparent">
          <v-tabs-slider class="primary"></v-tabs-slider>
          <v-tabs-item href="#tab-1">
            <v-icon>directions_bike</v-icon>
          </v-tabs-item>
          <v-tabs-item href="#tab-2">
            <v-icon>directions_run</v-icon>
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content
            :id="'tab-1'"
          >

          <BikeTab></BikeTab>

          </v-tabs-content>
          <v-tabs-content
            :id="'tab-2'"
          >
          ewfewgrew

          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import BikeTab from '@/components/MainTabs/BikeTab'

export default {
  name: 'main',
  data () {

  },
  components: {
    BikeTab
  }
}
</script>
