<template>
  <div>
    <div v-if="!$store.state.authUser">
      <h1 style="padding: 100px;">Molimo ulogirajte se</h1>
    </div>
    <div v-else-if="!$store.state.authUser.groupId">
      <h1 style="padding: 100px;">Nemate dodjeljenu grupu</h1>
    </div>
    <div v-else>
      <v-toolbar color="white" light tabs>
        <v-tabs
          fixed-tabs
          v-model="currentItem"
          color="transparent"
          slider-color="yellow"
          slot="extension"
        >
          <v-tab :href="'#day-view'">
          Dnevno
          </v-tab>
          <v-tab :href="'#week-view'">
            Tjedno
          </v-tab>
          <v-tab :href="'#month-view'">
            Mjesečno
          </v-tab>
          <v-tab :href="'#year-view'">
            Godišnje
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="currentItem" :touchless="true">
        <v-tab-item id="day-view">
          <v-card flat>
            <v-card-text>

              <mainTab1></mainTab1>

            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item id="week-view">
          <v-card flat>
            <v-card-text>
              
              <mainTab2></mainTab2>

            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item id="month-view">
          <v-card flat>
            <v-card-text>

              <mainTab3></mainTab3>

            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item id="year-view">
          <v-card flat>
            <v-card-text>

              <mainTab4></mainTab4>

            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import mainTab1 from '~/components/pages/main/mainTab1.vue'
import mainTab2 from '~/components/pages/main/mainTab2.vue'
import mainTab3 from '~/components/pages/main/mainTab3.vue'
import mainTab4 from '~/components/pages/main/mainTab4.vue'

export default {
  components: {
    mainTab1,
    mainTab2,
    mainTab3,
    mainTab4
  },
  data: () => ({
    currentItem: 'day-view'
  })
}
</script>

<style>

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
    margin-left: 0%;
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