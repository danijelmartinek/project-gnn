<template>
  <v-container>

        <usermanagment />

        <mappoint />

        <timebox />
  
  </v-container>
</template>

<script>
/* eslint-disable */
import usermanagment from '~/components/pages/admin/userManagment.vue'
import mappoint from '~/components/pages/admin/mapPoint.vue'
import timebox from '~/components/pages/admin/timeBox.vue'

import axios from 'axios'
import qs from 'qs'

export default {
  middleware: ['admin','username'],
  components: {
    mappoint,
    timebox,
    usermanagment
  }
}
</script>

<style scoped>

</style>