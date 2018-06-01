<template>
  <v-container class="pa-0 container" fluid>
    <v-layout row wrap v-if="users != null">
      
      <v-flex xs12 sm12 md5 lg5 xl5 offset-lg1 offset-xl1>
        <v-card class="white--text elevation-18 top-3" color="red darken-2">
          <ul class="top-3" v-if="first3s && first3s.length">
            <li v-for="(first3, index) of first3s">
              <div>
                <span>
                <div :class="['badge badge-color-' + (index + 1)]" class="text-xs-center">
                  <div class="circle"><i class="position">{{index + 1}}.</i></div>
                </div>
                <div class="text-xs-center">
                  <p>
                    <strong>{{first3.userData.username}}</strong>
                  </p>
                  <p v-if="$store.state.userGroup">{{first3.activityCount}} {{ ($store.state.userGroup.locations[0]) ? "dolazaka" : "aktivnosti" }}</p>
                </div>
                </span>
              </div>
            </li>
          </ul>
        </v-card>
      </v-flex>

      <v-flex xs12 sm12 md7 lg5 xl5>
        <v-card class="elevation-10 leaderboard_table" color="white" height="640">
          <v-card-text>
            <v-card class="elevation-0 data-table">
              <v-card-title>
                <h5 class="uppercase">Poredak</h5>
                <v-spacer></v-spacer>
                <v-text-field
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  v-model="search"
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="users"
                :search="search"
                :rows-per-page-items="[7]"
                class="elevation-0"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-center title">{{ props.item.rank }}.</td>
                  <td class="text-xs-center prop-font-size">{{props.item.userData.username}}</td>
                  <td class="text-xs-center prop-font-size">{{ props.item.activityCount }}</td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Tražili ste "{{ search }}" - nema rezultata.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 md8 offset-md2>
        <v-card class="username">
          <v-layout row wrap class="app-description">
            <v-flex xs12 class="text-xs-center pa-3">
							<span class="display-1">
								Nema zapisa
							</span>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  data() {
    return {
      search: '',
      loading: true,
      headers: [
        { text: 'Rank', value: 'rank', align: 'center', class: 'subheading' },
        { text: 'Korisničko ime', value: 'userData.username', align: 'center', class: 'subheading' },
        { text:  'Broj dolazaka', value: 'activityCount', align: 'center', class: 'subheading' },
      ],
      users: null,
      first3s: [],
    }
  },
  mounted: function () {
    
    setTimeout(function () {
      this.getData();

      this.headers[2].text = ((this.$store.state.userGroup.locations[0]) ? "Broj dolazaka" : "Broj aktivnosti");
    }.bind(this), 100); 
  },
  // Fetches posts when the component is created.
  methods: {
    getData(){
      axios.get(`/api/activities/monthly/` + this.groupId)
      .then(response => {
        if(response.data != "empty"){

          this.users = response.data.users;

          this.users.sort(function(a, b) {
              return parseFloat(b.activityCount) - parseFloat(a.activityCount);
          });

          if(this.users.length >= 3){
            for(var i = 0; i < 3; i++){
            
              this.first3s.push(this.users[i]);
            }

            for(var i = 0; i < 3; i++){
            
              this.users.shift();
            }

            var rankIndex = 4

            this.users.forEach(function(user) {
              user.rank = rankIndex;
              
              rankIndex = rankIndex + 1
            })


          }else{
            this.first3s = this.users;

            this.users = [];
          }
        }else{
          this.users = null;
        }
      })
    }
  },
  computed: {
    groupId () {
      return this.$store.state.authUser.groupId;
    }
  }
}
</script>

<style scoped>
.badge {
  position: relative;
  margin: 2em;
  width: 2.2em;
  height: 2.8em;
  border-radius: 5px;
  display: inline-block;
  top: 0;
  transition: all 0.2s ease;
}

@media only screen and (min-width: 320px)  {
  
  .badge {
    position: relative;
    margin: 2em;
    width: 4.4em;
    height: 5.6em;
    border-radius: 10px;
    display: inline-block;
    top: 0;
    right: 2em;
    transition: all 0.2s ease;
  }

}




.uppercase{
  text-transform: uppercase;
}

.leaderboard_table{
  z-index: 0;
  margin-top: 0px;
}

.prop-font-size{
  font-size: 1.5em !important;
}

 @media all and (max-width: 1210px) {
  .prop-font-size{
    font-size: 1.2em !important;
  }
 }

 .data-table{
   margin-top: 2em;
 }

.no_data{
  height: 100vh;
}



/* Ranking badges */

  .top-3{
    margin-top: 1.5em;
    height: 500px;
    list-style-type: none;
  }
  
  .top-3 li{
    height: 33.33%;
    margin-left: 5%;
  }
  
  .top-3 li > div{
    display: flex;
  }
  
  .top-3 li > div > span > div > p{
    margin-left: 1em;
    margin-top: -1.5em;
  }
  
  .top-3 li > div > span > div > p:nth-of-type(1){
    margin-right: 1em;
    font-size: 1em;
  }
  
  .badge {
    position: relative;
    margin: 2em;
    width: 2em;
    height: 3.1em;
    border-radius: 5px;
    display: inline-block;
    top: 0;
    transition: all 0.2s ease;
  }
  .badge:before,
  .badge:after {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background: inherit;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .badge i.position {
      font-size: 1.3em;
      padding: 0.4em;
      font-style: normal;
      font-weight: bold;
    }
  .badge:before {
    transform: rotate(60deg);
  }
  .badge:after {
    transform: rotate(-60deg);
  }
  .badge:hover {
    top: -4px;
  }
  .circle {
    width: 27.5px;
    height: 27.5px;
    position: absolute;
    background: #fff;
    z-index: 10;
    border-radius: 50%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  
  .badge-color-1 {
    background: linear-gradient(to bottom right, #e6ce6a 0%, #b7892b 100%);
    color: #b7892b;
  }
  .badge-color-2 {
    background: linear-gradient(to bottom right, #E0E0E0 0%, #BDBDBD 100%);
    color: #9e9e9e;
  }
  .badge-color-3 {
    background: linear-gradient(to bottom right, #ffc107 0%, #f57c00 100%);
    color: #f68401;
  }

@media only screen and (min-width: 220px)  {
  .top-3{
    height: 500px;
  }

 .top-3 li{
    margin-left: 25%;
  }

  .top-3 li > div > span > div > p{
    margin-left: 0;
    margin-top: -0.8em;
  }

  .top-3 li > div > span > div > p:nth-of-type(1){
    font-size: 1.1em;
  }

  .top-3 li > div > span > div > p:nth-of-type(2){
    font-size: 1.5em;
  }
}
@media only screen and (min-width: 320px)  {
  .top-3{
    height: 700px;
  }

 .top-3 li{
    margin-left: 40%;
  }

  .top-3 li > div > span > div > p{
    margin-top: -0.8em;
  }

  .top-3 li > div > span > div > p:nth-of-type(1){
    margin-left: -1.3em;
    font-size: 1.5em;
  }

  .top-3 li > div > span > div > p:nth-of-type(2){
    margin-left: -1em;
    font-size: 2em;
  }
  
  .badge {
    position: relative;
    margin: 2em;
    width: 4em;
    height: 6.2em;
    border-radius: 10px;
    display: inline-block;
    top: 0;
    right: 2em;
    transition: all 0.2s ease;
  }

  .badge i.position {
    font-size: 2.6em;
    padding: 0.4em;
    font-style: normal;
    font-weight: bold;
  }

  .circle {
    width: 55px;
    height: 55px;
    position: absolute;
    background: #fff;
    z-index: 10;
    border-radius: 50%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
@media only screen and (min-width: 450px)  {

  .top-3{
    height: 600px;
  }
  
 .top-3 li{
    margin-left: 15%;
  }
  
  .top-3 li > div{
    display: flex;
    margin-left: 10%;
  }
  
  .top-3 li > div > span > div{
    float: left;
  }
  
  .top-3 li > div > span > div > p:nth-of-type(1){
    margin-top: 1.5em;
    margin-left: 0;
  }

  .top-3 li > div > span > div > p:nth-of-type(2){
    margin-left: 0;
  }

  .badge {
    right: 1em;
  }

}
@media only screen and (min-width: 700px)  {
  .top-3{
    height: 500px;
  }

  .top-3 li > div{
    margin-left: 25%;
  }
}
@media only screen and (min-width: 800px)  {
  .top-3 li > div{
    margin-left: 30%;
  }
}
@media only screen and (min-width: 960px)  {
  .top-3{
    height: 500px;
    margin-top: 5em;
  }

  .top-3 li > div{
    margin-left: 7%;
  }

  .top-3 li > div > span > div > p:nth-of-type(1){
    font-size: 1.5em;
  }

  .top-3 li > div > span > div > p:nth-of-type(2){
    font-size: 2em;
  }
}
@media only screen and (min-width: 1264px)  {

  .top-3 li > div{
    margin-top: 1em;
    margin-left: 20%;
  }

  .top-3 li > div > span > div > p:nth-of-type(1){
    font-size: 1.8em;
  }

  .top-3 li > div > span > div > p:nth-of-type(2){
    font-size: 2.2em;
  }
}
@media only screen and (min-width: 1600px)  {
  .top-3 li > div{
    margin-left: 30%;
  }
}

/* Ranking badges end */

@media only screen and (min-width: 960px)  {

  .container{
    margin-top: 3em;
  }
}
</style>


