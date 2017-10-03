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

          <TableViewBike></TableViewBike>

          </v-tabs-content>
          <v-tabs-content
            :id="'tab-2'"
          >

          <TableViewFoot></TableViewFoot>

          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import TableViewBike from '@/components/MainTabs/TableViewBike'
import TableViewFoot from '@/components/MainTabs/TableViewFoot'

export default {
  name: 'main',
  components: {
    TableViewBike,
    TableViewFoot
  }
}
</script>

<style>
  .main{
    margin-top: 60px;
  }
</style>
