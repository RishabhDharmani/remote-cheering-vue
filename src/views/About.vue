
<template>
  <v-carousel
    cycle
    hide-delimiter-background
    show-arrows-on-hover
    height="100vh"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
    >
    <v-img :src="item" height="100vh"/>
    </v-carousel-item>
  </v-carousel>
</template>



<script>
	var about1 = require('@/assets/about1.jpg')
    var about2 = require('@/assets/About2.jpg')
    var about3 = require('@/assets/about3.jpg')
  export default {
    data () {
      return {
        items: [
          about1,
          about2,
          about3,
        ],
      }
    },
  }
</script>