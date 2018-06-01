<template>
  <div class="container">
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card class="login">
          <v-layout row wrap class="app-description">
            <v-flex xs12 md10 offset-md1>
							<v-card-title class="headline">
								<b>Prijava</b>
							</v-card-title>
							<v-card-text>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis est, pretium ac elit eget, tincidunt consequat purus. Suspendisse ut porta diam. Nullam eu feugiat felis, eu rhoncus erat. Donec sollicitudin et ligula vitae condimentum. Donec at odio nec libero tempor auctor in eu arcu. Cras vestibulum leo in dolor dapibus scelerisque. Nunc mollis, purus a maximus auctor, nisi sapien fermentum tellus, sed sodales lectus velit sit amet ante. Praesent imperdiet sapien sed ornare hendrerit. Fusce malesuada orci feugiat, mattis nisi sed, tempus arcu. Morbi pellentesque est pulvinar est finibus, a placerat sem eleifend. Suspendisse potenti. Sed faucibus lacus risus, ut rutrum urna mattis non. Ut malesuada lorem et justo blandit, vitae elementum dolor fermentum.
							</v-card-text>
							<v-card-actions v-if="!$store.state.authUser">
								<v-layout row wrap align-center>
									<v-flex class="text-xs-center text-sm-left" style="margin-top: 1em;" xs12 sm8>
										<v-btn flat dark large href="/auth/strava">
											<img src="~assets/svg/btn_strava_connectwith_orange.svg">
										</v-btn>
									</v-flex>
									<v-flex class="text-xs-center text-sm-right" style="margin-top: 1em;" xs12 sm4>
										<span class="pa-2">Niste registrirani? </span><v-btn to="/register" flat color="info">registracija</v-btn>
									</v-flex>
								</v-layout>
							</v-card-actions>
							<v-card-actions v-else>
								<v-card-title class="headline">
									<b>Već ste prijavljeni</b>
								</v-card-title>
							</v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
.login{
	margin-top: 50px;
}

@media only screen and (min-width: 600px)  {
  .login{
    margin-top: 20vh;
  }
}
</style>