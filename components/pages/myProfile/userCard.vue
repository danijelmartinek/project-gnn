<template>
    <v-card class="elevation-15 profile-card" :style="cardMarginLeft" :width="photoSquare">
        <v-card-media class="photo" :src="userImage" :height="photoSquare">
					<div class="photo_overlay">
						<div class="photo_icon" @click="photoDialog = true"><v-icon>photo_camera</v-icon></div>
						<div v-if="this.$store.state.authUser.profilePic" class="delete_icon" style="float: right;" @click="photoDeleteDialog = true"><v-icon>delete</v-icon></div>
					</div>
				</v-card-media>
				
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-4">{{ this.$store.state.authUser.username }}</h3>
								<h3 class="subheading"><b>{{ this.$store.state.authUser.firstName }} {{ this.$store.state.authUser.lastName }}</b></h3>
                <span class="grey--text">{{ this.$store.state.authUser.city }}, {{ this.$store.state.authUser.state }}</span><br>
                <span>{{ this.$store.state.authUser.email }}</span><br><br>
                <span class="subheading grey--text"><b>Organizacija</b></span><br>
                <span v-if="userGroup.groupName">
                    {{ userGroup.groupName }}
                </span>
								<span class="grey--text" v-else>
                    Nemate dodjeljenu organizaciju
                </span>
                <br /><br />
                <span class="subheading grey--text"><b>Bio</b></span><br>
                <span>
                <i>
                    {{ this.$store.state.authUser.userBio }}
                </i>
                </span>
            </div>
        </v-card-title>

				  <v-card-actions>
						<v-spacer></v-spacer>
						<v-dialog v-model="photoDialog" absolute max-width="600">
								<v-card>
									<editPhoto v-on:updateUserPhoto="updateUserPhoto($event)" @closePhotoDialog="photoDialog = false"/>
								</v-card>
						</v-dialog>
				</v-card-actions>

        <editProfile v-on:updateUserGroup="updateUserGroup($event)" />

				<v-dialog v-model="photoDeleteDialog" max-width="500px">
					<v-card>
						<v-card-text>
							<v-container grid-list-md>
								<v-layout wrap>
									<span class="title">Jeste li sigurni da želite izbrisati profilnu sliku?</span>
								</v-layout>
							</v-container>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" flat @click.native="photoDeleteDialog = false">Nazad</v-btn>
							<v-btn color="blue darken-1" flat @click.native="confirmPhotoDelete()">Izbriši</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				
    </v-card>
</template>

<script>
/*eslint-disable*/

import axios from 'axios'
import qs from 'qs'

import editProfile from '~/components/pages/myProfile/editProfile.vue'
import editPhoto from '~/components/pages/myProfile/editPhoto.vue'

export default {
  name: 'userCard',
  components: {
		editProfile,
		editPhoto
  },
  data () {
    return {
			userImage: null,
			windowWidth: 0,
			photoSquare: "200px",
			cardMarginLeft: 0,
			photoDialog: false,
			photoDeleteDialog: false,
			userGroup: '',
    }
	},

	created () {
		this.initialize();

		var userImagePath = this.$store.state.authUser.profilePic;

		if(userImagePath){
			if(userImagePath.includes('img/users')){
				this.userImage = userImagePath;
			}
			else{
				this.userImage = userImagePath;
			}
		}
		else{
			this.userImage = require('~/static/img/users/default.jpg');
		}
	},
	
	mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);

      //Init
      this.getWindowWidth()
    })

  },
	
	methods: {
		getWindowWidth(event) {
				this.windowWidth = document.documentElement.clientWidth;
				
				if(this.windowWidth > 400){
					this.photoSquare = 350;
				}
				else if(this.windowWidth > 200){
					this.photoSquare = 300;
				}
				else{
					this.photoSquare = 200;
				}

				if(this.windowWidth < 600){
					var marginLeft = (this.windowWidth - this.photoSquare) / 2;
					this.cardMarginLeft = "margin-left: " + marginLeft + "px;";
				}
    },

		initialize () {
      axios.get(`/api/activity/groups`)
      .then(response => {
				var t = this;

				response.data.forEach(function(group){
					if(group._id == t.$store.state.authUser.groupId){
						t.userGroup = group;
					}
				})
      })
		},

		updateUserGroup(data){
			if(this.userGroup.groupName){
				this.userGroup.groupName = data.text;
			}
			else{
				this.userGroup = {
					groupName: data.text
				}
			}
		},

		updateUserPhoto(data){
			if(data){
				this.userImage = data;
			}
			else{
				this.userImage = require('~/assets/img/users/default.jpg');
			}
			this.photoDialog = false;
		},

		confirmPhotoDelete(){
			var t = this;

			var userData = {
				userId: t.$store.state.authUser._id,
				oldPath: t.$store.state.authUser.profilePic
			}

			axios.post('/user/delete_avatar', qs.stringify(userData))
				.then(function (response) {
					if (response.data.success){
						console.log("Image deleted successfully");

						t.$store.state.authUser.profilePic = response.data.newPath;
					}
				})
				.catch(function (error) {
					console.log(error);
			});

			t.userImage = require('~/static/img/users/default.jpg');
			t.photoDeleteDialog = false;
		}

  }
}
</script>

<style scoped>

.profile-card{
margin-top: 0px;
}

.photo_overlay {
    position: absolute;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    cursor: default;
}

.photo:hover .photo_overlay{
	display: block;
}

.photo_icon{
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
}

.delete_icon{
    position: absolute;
    right: 0;
		bottom: 0;
    color: white;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
}

.photo_icon i{
	color: white;
	font-size: 7em;
	cursor: pointer;
}

.delete_icon i{
	color: white;
	font-size: 2em;
	cursor: pointer;
}
</style>