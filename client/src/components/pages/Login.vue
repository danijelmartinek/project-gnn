<template>
  <div class="login">
    <v-layout row justify-center style="position: relative;">
      <v-dialog v-model="dialog" absolute width="500">
        <v-btn flat dark slot="activator">PRIJAVI SE</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">PRIJAVA</span>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <!-- <span class="body-2">Upišite vaše STRAVA podatke:</span>
            <v-text-field label="Email"></v-text-field>
            <v-text-field label="Lozinka" type="password"></v-text-field> -->
            <v-btn flat dark large href="https://www.strava.com/oauth/authorize?client_id=20070&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Ftoken&scope=view_private&approval_prompt=force"><img src="../../assets/btn_strava_connectwith_orange.svg"></v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      dialog: false
    }
  }
}
</script>
