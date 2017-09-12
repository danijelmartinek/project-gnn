<template>
  <div class="appfooter">
    <v-footer fixed dark class="pa-3 blue">
      <h6 headline>QUANTi © {{ new Date().getFullYear() }} </h6>
      <v-spacer></v-spacer>
      <img src="../../assets/api_logo_pwrdBy_strava_horiz_white.svg">
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'appfooter'
}
</script>

<style>
h6{
  margin-top: 20px;
  color: white;
}
</style>
