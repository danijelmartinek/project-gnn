<template>
  <v-container class="pa-0 container" fluid>
    <v-layout row wrap v-if="activities !== null">
      
      <v-flex xs12 sm12 md5 lg5 xl5 offset-lg1 offset-xl1>
        <v-card class="white--text elevation-18 top-3" color="red darken-2">
          <ul class="top-3" v-if="first3s && first3s.length">
            <li v-for="first3 of first3s">
              <div>
                <span>
                <div :class="['badge badge-color-' + first3.rank]">
                  <div class="circle"><i class="position">{{first3.rank}}.</i></div>
                </div>
                <div>
                  <p>
                    <strong>{{first3.userFirstName}} </strong><strong>{{first3.userLastName}}</strong>
                  </p>
                  <p>{{first3.monthDistance}} m</p>
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
                :items="activities"
                :search="search"
                :rows-per-page-items="[7]"
                class="elevation-0"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-center title">{{ props.item.rank }}.</td>
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
    <v-layout v-else>
      <h1>Nema zapisa</h1>
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
      activities: null,
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
      if(response.data[0] !== 'noData'){
        var i = 1;
        var top3 = [];
        response.data.sort(function(a, b){
            return b.monthDistance-a.monthDistance;
        })
        response.data.forEach(user => {
          user.rank = i;
          i++
        });

        var a = 1;
        if(response.data.length > 3){
          a = 3;
        }else{
          a = response.data.length;
        }
        for (i = 0; i < a; i++) { 
          top3[i] = response.data[i];
        }

        for (i = 0; i < a; i++) { 
          response.data.shift();
        }

        this.activities = response.data;
        this.first3s = top3;
      }else{
        this.activities = null;
      }

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
      })
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
</style>
