<template>
  <div>
    <br />
    <br />
    <v-card>
      <v-layout row wrap>
      <v-toolbar color="white" class="elevation-1">
        <v-flex xs12>
          <v-toolbar-title class="title"><b>LOKACIJA</b><span class="pl-2 body-2">- odaberite lokaciju traženjem adrese i povlačenjem pina po karti.</span></v-toolbar-title>
        </v-flex>
      </v-toolbar>

        <v-flex xs12 sm8 class="gmap-bar pa-3 text-xs-left">	
          <gmap-autocomplete
            placeholder="Unesite lokaciju"
            class="gmap-bar-search"
            @place_changed="setPlace">
          </gmap-autocomplete>
          <v-btn color="primary" dark @click="addMarker">Traži</v-btn>
          <button @click="defaultMarker"><v-icon style="font-size: 2.5em; color: #E53935;">location_on</v-icon></button>
        </v-flex>
        <v-flex xs12 sm4 class="gmap-bar pa-3 text-xs-left text-md-right">
          <v-btn color="error" :disabled="locationDeleteButtonDisabled" @click="deleteMarker">Izbriši</v-btn>
          <v-btn color="primary" :disabled="locationAddButtonDisabled" @click="updateLocation">{{ locationAddButtonText }}</v-btn>
        </v-flex>
        <br/>
      </v-layout>

      <gmap-map
        :center="center"
        :zoom="14"
        class="gmap"
        style="width:100%;  height: 400px;"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
          @dragend="getMarkerPosition(index, $event.latLng)"
          :clickable="true"
          :draggable="true"
        ></gmap-marker>
      </gmap-map>
    </v-card>
  </div>
</template>

<script>
/*eslint-disable*/
import axios from 'axios'
import qs from 'qs'

export default {
  name: "mapPoint",
  data() {
    return {
      constDefaultLocation: { position: {lat: 46.0223684, lng: 16.54629209999996} },

      locationAddButtonText: "Dodaj",
      locationAddButtonDisabled: false,
      locationDeleteButtonDisabled: false,

      defaultLocation: null,
      center: null,
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  created() {
    const locations = JSON.parse(JSON.stringify(this.$store.state.userGroup.locations));

    if(locations[0]){
      locations[0].position.lat = parseFloat(locations[0].position.lat);
      locations[0].position.lng = parseFloat(locations[0].position.lng);

      this.defaultLocation = locations[0];
      this.center = this.defaultLocation.position;

       const marker = {
          lat: this.defaultLocation.position.lat,
          lng: this.defaultLocation.position.lng
        };

      this.markers = [];
      this.markers.push({ position: marker });

      this.locationAddButtonText = "Promijeni";
      this.locationAddButtonDisabled = true;

    }else{
      this.defaultLocation = this.constDefaultLocation;
      this.center = this.defaultLocation.position;

      this.locationAddButtonDisabled = true;
      this.locationDeleteButtonDisabled = true;
    }
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },

		getMarkerPosition (index, marker) { 
			const position = {
          lat: marker.lat(),
          lng: marker.lng()
				};
				
      this.markers[index].position = position;

      this.locationAddButtonDisabled = false;
      this.locationDeleteButtonDisabled = false;
		},

    addMarker() {

      if (this.currentPlace) {
        this.markers = [];

        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
				
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;

        if(marker.lat == this.defaultLocation.position.lat && marker.lng == this.defaultLocation.position.lng){
          this.locationAddButtonDisabled = true;
          this.locationDeleteButtonDisabled = false;
        }else{
          this.locationAddButtonDisabled = false;
          this.locationDeleteButtonDisabled = false;
        }
      }

    },

    deleteMarker: function() {
      this.markers = []

      this.locationDeleteButtonDisabled = true;
      this.locationAddButtonDisabled = false;
    },

    defaultMarker: function() {
      const marker = {
          lat: this.defaultLocation.position.lat,
          lng: this.defaultLocation.position.lng
        };

      this.markers = [];
      this.markers.push({ position: marker });

      this.center = this.defaultLocation.position;

      this.locationAddButtonDisabled = true;
      this.locationDeleteButtonDisabled = false;
    },

    updateLocation: function() {
      const updatedGroup = this.$store.state.userGroup;
      
      if(this.markers[0]){
        updatedGroup.locations[0] = this.markers[0];
      
        this.defaultLocation = this.markers[0];
        this.defaultMarker();

        this.locationAddButtonText = "Promijeni";
      }
      else{
        updatedGroup.locations[0] = null;

        this.defaultLocation = this.constDefaultLocation;

        this.locationAddButtonText = "Dodaj";
      }

      axios.post('/api/update_group', qs.stringify(updatedGroup))
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });

      this.locationAddButtonDisabled = true;
    },

    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>

<style scoped>
.gmap-bar-search{
	border-bottom: 1px solid rgb(94, 93, 93); 
	outline: none; 
	font-size: 1em;
  width: 90%;
}

@media only screen and (min-width: 600px) {
  .gmap-bar-search{
    font-size: 1.3em;
    width: 300px;
  }
}
</style>
