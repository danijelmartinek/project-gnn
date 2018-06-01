<template>
  <div class="container">
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card class="username">
          <v-layout row wrap class="app-description">
            <v-flex xs12 md10 offset-md1>
							<v-card-title class="display-1">
								Korisničko ime
							</v-card-title>
							<v-card-text>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis est, pretium ac elit eget, tincidunt consequat purus. Suspendisse ut porta diam. Nullam eu feugiat felis, eu rhoncus erat. Donec sollicitudin et ligula vitae condimentum. Donec at odio nec libero tempor auctor in eu arcu. Cras vestibulum leo in dolor dapibus scelerisque. Nunc mollis, purus a maximus auctor, nisi sapien fermentum tellus, sed sodales lectus velit sit amet ante. Praesent imperdiet sapien sed ornare hendrerit. Fusce malesuada orci feugiat, mattis nisi sed, tempus arcu. Morbi pellentesque est pulvinar est finibus, a placerat sem eleifend. Suspendisse potenti. Sed faucibus lacus risus, ut rutrum urna mattis non. Ut malesuada lorem et justo blandit, vitae elementum dolor fermentum.
							</v-card-text>
							<v-card-actions v-if="$store.state.authUser">
								<v-layout row wrap align-center>
									<v-flex style="margin-top: 1em;" xs12 sm5 md5 xl7>
										<v-form ref="form" v-model="valid" lazy-validation>
											<v-text-field
												v-model="username"
												:rules="usernameRules"
												:counter="10"
												label="Koriničko ime"
												required
											></v-text-field>
										</v-form>
									</v-flex>
									<v-flex style="margin-top: 1em;" xs12 sm7 md7 xl5 class="text-xs-center text-md-right">
										<v-btn
											:disabled="!valid"
											@click="submit"
											color="info"
										>
											Dodaj
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

import axios from 'axios'
import qs from 'qs'

export default {
	middleware: 'auth',
	data () {
    return {
			valid: false,
			username: '',
      usernameRules: [
        v => !!v || 'Napišite željeno korisničko ime',
				v => (v && v.length <= 10) || 'Korisničko ime može imati najviše 10 znakova',
				v => (v && v.length >= 4) || 'Korisničko ime mora imati najmanje 4 znaka',
				v => (this.existUsernames.includes(this.username) != true) || 'Korisničko ime je zauzeto'
			],
			existUsernames: []
    }
	},

	created () {
    this.initialize()
  },
	
	methods: {

		initialize () {
      axios.get(`/api/users`)
      .then(response => {
				var t = this;

				response.data.forEach(function(user){
					t.existUsernames.push(user.username);
				})

				function remove(array, element) {
						const index = array.indexOf(element);
						array.splice(index, 1);
				}

				remove(this.existUsernames, this.$store.state.authUser.username);

				this.username = this.$store.state.authUser.username;
      })
		},
		
    submit () {
			if (this.$refs.form.validate()) {
				var t = this;
				const username = this.username;
				const user = this.$store.state.authUser;

				user.username = username;

				axios.post('/api/update_user', qs.stringify(user))
					.then(function (response) {})
					.catch(function (error) {
						console.log(error);
				});

				this.$router.push('/');
			}
		}

  }
}
</script>

<style scoped>
.username{
	margin-top: 50px;
}

@media only screen and (min-width: 600px)  {
  .username{
    margin-top: 20vh;
  }
}
</style>