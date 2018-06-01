<template>
  <div v-if="$store.state.authUser">
    <div v-if="!$store.state.authUser.groupId">
      <nogroup />
    </div>
    <div v-if="$store.state.authUser.groupId">
      <v-toolbar color="white" style="margin-top: 4em;" light tabs>
        <v-toolbar-title class="display-1 ml-3 mt-3"> POREDAK</v-toolbar-title>
        <v-tabs
          fixed-tabs
          v-model="currentItem"
          color="transparent"
          slider-color="blue"
          slot="extension"
        >
          <v-tab :href="'#bydistance-view'">
            Po udaljenosti
          </v-tab>
          <v-tab :href="'#bycount-view'" v-if="$store.state.userGroup">
            Po broju {{ ($store.state.userGroup.locations[0]) ? "dolazaka" : "aktivnosti" }}
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="currentItem" :touchless="true">
        <v-tab-item id="bydistance-view">
          <v-card flat>
            <v-card-text>
              
              <showbydistance />

            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item id="bycount-view">
          <v-card flat>
            <v-card-text>

              <showbyactivitycount />

            </v-card-text>
          </v-card>
        </v-tab-item> 
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import showbydistance from '~/components/pages/rank/byDistance.vue'
import showbyactivitycount from '~/components/pages/rank/byActivityCount.vue'
import nogroup from '~/components/pages/rank/noGroup.vue'

export default {
  middleware: 'username',
  components: {
    showbydistance,
    showbyactivitycount,
    nogroup
  },
  data: () => ({
    currentItem: 'bydistance-view'
  }),
  created () {
    if(!this.$store.state.authUser){
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>


</style>