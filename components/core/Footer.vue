<template>
  <div class="appfooter">
    <v-footer :absolute="true" :app="true" color="white" height="64" class="pa-3 elevation-4">
      <h2 headline>Danijel Martinek © {{ new Date().getFullYear() }} </h2>
      <v-spacer></v-spacer>
      <img class="pwrdbystrava" src="~assets/svg/api_logo_pwrdBy_strava_horiz_gray.svg">
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'appfooter'
}
</script>

<style>
h2{
 font-size: 1em;
}

.pwrdbystrava{
  width: auto;
  height: 25px;
}

@media all and (min-width: 600px) 
{ 
  .pwrdbystrava{
    width: auto;
    height: 50px;
  }

  h2{
    font-size: 1.5em;
  }
}
</style>