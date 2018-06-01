<template>
  <div class="container">
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card class="username">
          <v-layout row wrap class="app-description">
            <v-flex xs12 md10 offset-md1>
							<v-card-title class="display-1">
								Molimo odaberite grupu
							</v-card-title>
							<v-card-text>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis est, pretium ac elit eget, tincidunt consequat purus. Suspendisse ut porta diam. Nullam eu feugiat felis, eu rhoncus erat. Donec sollicitudin et ligula vitae condimentum. Donec at odio nec libero tempor auctor in eu arcu. Cras vestibulum leo in dolor dapibus scelerisque. Nunc mollis, purus a maximus auctor, nisi sapien fermentum tellus, sed sodales lectus velit sit amet ante. Praesent imperdiet sapien sed ornare hendrerit. Fusce malesuada orci feugiat, mattis nisi sed, tempus arcu. Morbi pellentesque est pulvinar est finibus, a placerat sem eleifend. Suspendisse potenti. Sed faucibus lacus risus, ut rutrum urna mattis non. Ut malesuada lorem et justo blandit, vitae elementum dolor fermentum.
							</v-card-text>
							<v-card-actions v-if="$store.state.authUser">
								<v-layout row wrap align-center>
									<v-flex style="margin-top: 1em;" xs12 sm5 md5 xl7>
										<v-select
											:items="groups"
											v-model="e1"
											label="Select"
											single-line
										></v-select>
									</v-flex>
									<v-flex style="margin-top: 1em;" xs12 sm7 md7 xl5 class="text-xs-center text-md-right">
										<v-btn
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
			e1: null,
      groups: []
    }
	},

	created () {
    this.initialize()
  },
	
	methods: {

		initialize () {
      axios.get(`/api/activity/groups`)
      .then(response => {
				var t = this;

				response.data.forEach(function(group){
					t.groups.push({text: group.groupName, id: group._id});
				})
      })
		},
		
    submit () {
			var t = this;
			const groupId = this.e1.id;
			const user = this.$store.state.authUser;

			user.groupId = groupId;

			axios.post('/api/update_user', qs.stringify(user))
				.then(function (response) {})
				.catch(function (error) {
					console.log(error);
			});

			window.location ="/rank";
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