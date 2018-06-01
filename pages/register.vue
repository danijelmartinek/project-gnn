<template>
  <div class="container">
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2 class="register">
        <v-card>
          <v-layout row wrap align-center class="app-description">
            <v-flex xs12 md10 offset-md1>
            	<v-card-title class="headline">
								<b>Registracija</b>
							</v-card-title>
							<v-card-title class="display-1">
								Pravila i uvjeti
							</v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis est, pretium ac elit eget, tincidunt consequat purus. Suspendisse ut porta diam. Nullam eu feugiat felis, eu rhoncus erat. Donec sollicitudin et ligula vitae condimentum. Donec at odio nec libero tempor auctor in eu arcu. Cras vestibulum leo in dolor dapibus scelerisque. Nunc mollis, purus a maximus auctor, nisi sapien fermentum tellus, sed sodales lectus velit sit amet ante. Praesent imperdiet sapien sed ornare hendrerit. Fusce malesuada orci feugiat, mattis nisi sed, tempus arcu. Morbi pellentesque est pulvinar est finibus, a placerat sem eleifend. Suspendisse potenti. Sed faucibus lacus risus, ut rutrum urna mattis non. Ut malesuada lorem et justo blandit, vitae elementum dolor fermentum.
              <br /><br />
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis est, pretium ac elit eget, tincidunt consequat purus. Suspendisse ut porta diam. Nullam eu feugiat felis, eu rhoncus erat. Donec sollicitudin et ligula vitae condimentum. Donec at odio nec libero tempor auctor in eu arcu. Cras vestibulum leo in dolor dapibus scelerisque. Nunc mollis, purus a maximus auctor, nisi sapien fermentum tellus, sed sodales lectus velit sit amet ante. Praesent imperdiet sapien sed ornare hendrerit. Fusce malesuada orci feugiat, mattis nisi sed, tempus arcu. Morbi pellentesque est pulvinar est finibus, a placerat sem eleifend. Suspendisse potenti. Sed faucibus lacus risus, ut rutrum urna mattis non. Ut malesuada lorem et justo blandit, vitae elementum dolor fermentum.
							<br /><br />
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis est, pretium ac elit eget, tincidunt consequat purus. Suspendisse ut porta diam. Nullam eu feugiat felis, eu rhoncus erat. Donec sollicitudin et ligula vitae condimentum. Donec at odio nec libero tempor auctor in eu arcu. Cras vestibulum leo in dolor dapibus scelerisque. Nunc mollis, purus a maximus auctor, nisi sapien fermentum tellus, sed sodales lectus velit sit amet ante. Praesent imperdiet sapien sed ornare hendrerit. Fusce malesuada orci feugiat, mattis nisi sed, tempus arcu. Morbi pellentesque est pulvinar est finibus, a placerat sem eleifend. Suspendisse potenti. Sed faucibus lacus risus, ut rutrum urna mattis non. Ut malesuada lorem et justo blandit, vitae elementum dolor fermentum.
							</v-card-text>
							<v-card-actions v-if="!$store.state.authUser">
								<v-layout row wrap align-center>
									<v-flex xs12 sm7 md7 xl9>
										<v-checkbox
											v-model="checkbox"
											:rules="[v => !!v || 'Da biste se mogli registrirati, trebate prihvatiti gore navedene uvjete.']"
											label="Prihvaćate li uvjete?"
											required
										></v-checkbox>
									</v-flex>
									<v-flex xs12 sm3 md3 xl3 class="text-xs-center text-md-right">
										<v-btn flat dark large href="/auth/strava" v-if="checkbox == true">
											<img src="~assets/svg/btn_strava_connectwith_orange.svg">
										</v-btn>
										<v-btn flat dark large disabled v-else>
											<img style="opacity: 0.5; filter: grayscale(100%);" src="~assets/svg/btn_strava_connectwith_orange.svg">
										</v-btn>
									</v-flex>
								</v-layout>
							</v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
/*eslint-disable*/

export default {
	data () {
    return {
			checkbox: false
    }
  }
}
</script>

<style scoped>
.register{
	margin-top: 50px;
}

@media only screen and (min-width: 600px)  {
  .register{
    margin-top: 70px;
  }
}
</style>