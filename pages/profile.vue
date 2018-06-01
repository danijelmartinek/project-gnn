<template>
  <v-container class="pa-0" fluid>
    <v-layout row wrap>
      <v-flex class="profile_body" xs12 sm12 md12 lg12 xl12>
          <div class="cover_image"><div class="cover_image_gradient"></div></div>
      </v-flex>
      <v-flex class="profile_card" md4 lg3 xl2 offset-sm1 offset-md1 offset-lg1 offset-xl2>
        <userCard />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userCard from '~/components/pages/myProfile/userCard.vue'

export default {
  middleware: ['auth', 'username'],
  components: {
    userCard
  }
}
</script>

<style scoped>

.cover_image {
  position: absolute;
  left: 0;
  top: -100px;
  width: 100%;
  height: 500px;
  margin-bottom: 1em;
  background-image: url(~assets/img/biking2.png);
  background-repeat: no-repeat;
  background-size: cover;
}

.cover_image_gradient {
  width: 100%;
  height: 100%;

  background-color: rgba(254, 254, 254, 0.7);
  /* IE9, iOS 3.2+ */
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxsaW5lYXJHcmFkaWVudCBpZD0idnNnZyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIwJSIgeTE9IjEwMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNmYWZhZmEiIHN0b3Atb3BhY2l0eT0iMSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwLjgiIG9mZnNldD0iMC41Ii8+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwLjIiIG9mZnNldD0iMSIvPjwvbGluZWFyR3JhZGllbnQ+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCN2c2dnKSIgLz48L3N2Zz4=);
  background-image: -webkit-gradient(linear, 0% 100%, 100% 0%,color-stop(0, rgb(250, 250, 250)),color-stop(0.5, rgba(255, 255, 255, 0.8)),color-stop(1, rgba(255, 255, 255, 0.2)));
  /* Android 2.3 */
  background-image: -webkit-linear-gradient(bottom left,rgb(250, 250, 250) 0%,rgba(255, 255, 255, 0.8) 50%,rgba(255, 255, 255, 0.2) 100%);
  /* IE10+ */
  background-image: linear-gradient(to top right,rgb(250, 250, 250) 0%,rgba(255, 255, 255, 0.8) 50%,rgba(255, 255, 255, 0.2) 100%);
  background-image: -ms-linear-gradient(bottom left,rgb(250, 250, 250) 0%,rgba(255, 255, 255, 0.8) 50%,rgba(255, 255, 255, 0.2) 100%);
}
/* IE8- CSS hack */
@media \0screen\,screen\9 {
    .gradient {
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#33ffffff",endColorstr="#fffafafa",GradientType=0);
    }
}

.profile_card{
  margin-top: 150px;
}
</style>