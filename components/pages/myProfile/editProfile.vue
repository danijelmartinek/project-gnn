<template>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="dialog = true"><v-icon>edit</v-icon></v-btn></div>
        <v-dialog v-model="dialog" absolute max-width="600">
            <v-card>
            <v-card-title>
                <span class="headline">UREDI PROFIL</span>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="dialog = false"><v-icon>close</v-icon></v-btn>
            </v-card-title>
            <div class="divider"></div>
            <v-card-text>
                <v-card-media :src="this.$store.state.authUser.profilePic" class="edit_profile_pic" height="200"></v-card-media>
                <input class="edit_profile_pic" type="file" name="img">
            </v-card-text>
            </v-card>
        </v-dialog>
    </v-card-actions>
</template>

<script>
export default {
  name: 'editProfile',
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>
.edit_profile_pic{
    max-width: 300px;
    display: block;
    margin: 0 auto;
    margin-top: 5px;
}
</style>