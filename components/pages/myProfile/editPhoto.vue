<template>
	<span>
		<v-card-title>
			<span class="headline">ODABERI</span>
			<v-spacer></v-spacer>
			<v-btn icon @click="photoDialogClose()"><v-icon>close</v-icon></v-btn>
		</v-card-title>
		<div class="divider"></div>
		<v-card-text>
			<v-layout row wrap>
				<v-flex xs12>
					<croppa class="c1" 
							v-model="myPhoto"
							:width="200"
							:height="200"
							placeholder="Odaberite fotografiju"
							:placeholder-font-size="15"
							:disabled="false"
							:auto-sizing="true"
							:prevent-white-space="true"
							:show-remove-button="false"
							:show-loading="true"
							@file-choose="choosePhoto()"
							:zoom-speed="5">
					</croppa >
				</v-flex>
				<v-flex xs12 class="text-xs-center">
					<v-btn color="info" :disabled="photoUploadDisable" @click="generateImage()">UČITAJ</v-btn>
				</v-flex>
			</v-layout>
		</v-card-text>
	</span>
</template>

<script>
/*eslint-disable*/

import axios from 'axios'
import qs from 'qs'

import FormDataPost from './uploadAvatar.js'

export default {
	name: 'editProfile',
  data () {
    return {
			myPhoto: null,
			imgUrl: '',
			photoUploadDisable: true,
			metaData: {}
    }
	},
	
	methods: {
		
		choosePhoto: function() {

			this.photoUploadDisable = false;
		},

		attemptUpload() {
			
			if (this.imgUrl){
				var t = this;

				var userId = this.$store.state.authUser._id;
				var oldPath = this.$store.state.authUser.profilePic;

				this.myPhoto.generateBlob(function(blob){
					FormDataPost('/user/upload_avatar', blob, userId, oldPath)
					.then(response=>{
						if (response.data.success){
							console.log("Image uploaded successfully");

							t.$store.state.authUser.profilePic = response.data.newPath;

							t.photoUploadDisable = true;
							t.myPhoto.refresh();
						}
					})
					.catch(err=>{
						console.error(err);
					});
				},
					'image/jpeg',
					0.8
				);
				
			}
		},

  	generateImage: function() {

			var t = this;

			setTimeout(function () {

				let blobImage = t.myPhoto.generateDataUrl()

				if(blobImage){
					t.imgUrl = blobImage;

					t.attemptUpload();
					
					t.$emit('updateUserPhoto', t.imgUrl);
					t.myPhoto.remove();
				}
			}.bind(this), 10);


		},

		photoDialogClose: function() {

			this.$emit('closePhotoDialog');

			this.photoUploadDisable = true;
			this.myPhoto.refresh();
		}
		
	}
	
}
</script>

<style scoped>
.croppa-container {
	padding-left: 0;
	padding-right: 0;
	margin-left: auto;
	margin-right: auto;
	display: block;

  background-color: white;
	width: 200px;
	height: 200px;
	margin-bottom: 1em;
}

@media only screen and (min-width: 350px)  {
  .croppa-container {
		width: 250px;
		height: 250px;
	}
}

@media only screen and (min-width: 450px)  {
  .croppa-container {
		width: 350px;
		height: 350px;
	}
}

@media only screen and (min-width: 800px)  {
  .croppa-container {
		width: 400px;
		height: 400px;
	}

}
</style>