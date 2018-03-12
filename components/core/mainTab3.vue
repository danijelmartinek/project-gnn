<template>
  <v-container class="pa-0" fluid>
    <v-layout row wrap>
      
      <v-flex xs12 sm12 md5 lg5 xl5 offset-lg1 offset-xl1>
        <v-card class="white--text elevation-18 top-3" color="red darken-2" height="699">
          <ul class="top-3" v-if="first3s && first3s.length">
            <li v-for="first3 of first3s">
                <p class="display-1 text-xs-center"><strong>{{first3.rank}} </strong><strong>{{first3.userFirstName}} </strong><strong>{{first3.userLastName}}</strong></p>
                <p class="display-2 text-xs-center">{{first3.monthDistance}}</p>
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
                :items="activities"
                :search="search"
                :rows-per-page-items="[7]"
                class="elevation-0"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-center title">{{ props.item.rank }}</td>
                  <td class="text-xs-center prop-font-size">{{ props.item.userFirstName }} {{ props.item.userLastName }}</td>
                  <td class="text-xs-center prop-font-size">{{ props.item.monthDistance }} m</td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Your search for "{{ search }}" found no results.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-card-text>
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
        { text: 'Ime i prezime', value: 'firstAndLastName', align: 'center', class: 'subheading' },
        { text: 'Duljina', value: 'dayDistance', align: 'center', class: 'subheading' },
      ],
      activities: [],
      first3s: []
    }
  },
  mounted: function () {
    setTimeout(function () {
      this.getData();
    }.bind(this), 600); 
  },
  // Fetches posts when the component is created.
  methods: {
    getData(){
      axios.get(`http://localhost:3000/api/activities/monthlydata`)
      .then(response => {
      // JSON responses are automatically parsed.
      var i = 1;
      var top3 = [];
      response.data.sort(function(a, b){
          return b.monthDistance-a.monthDistance;
      })
      response.data.forEach(user => {
        user.rank = i;
        i++
      });

      for (i = 0; i < 3; i++) { 
        top3[i] = response.data[i];
      }

      for (i = 0; i < 3; i++) { 
        response.data.shift();
      }

      this.activities = response.data;
      this.first3s = top3;

    })
    .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  })}

    // async / await version (created() becomes async created())
    //
    // try {
    //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
    //   this.posts = response.data
    // } catch (e) {
    //   this.errors.push(e)
    // }
  }
}
</script>


<style scoped>

.uppercase{
  text-transform: uppercase;
}

.top-3{
  z-index: 100;
  margin-top: 20px;
}

.leaderboard_table{
  z-index: 0;
  margin-top: 50px;
}
@media all and (max-width: 960px) {
  .leaderboard_table{
    z-index: 0;
    margin-top: -50px;
  }
 }

.prop-font-size{
  font-size: 1.5em !important;
}

 @media all and (max-width: 1210px) {
  .prop-font-size{
    font-size: 1.2em !important;
  }
 }


 .top-3 li{
  list-style: none;
  height: 233px;
  width: 95%;
  margin-left: 0;
  background-color: blue;
  border: 2px solid black;
 }
 .top-3 li p{
   margin-top: 1em;
 }

 .data-table{
   margin-top: 2em;
 }

</style>
