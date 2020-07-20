<template>
  <v-app>

    <!-- Top app bar -->
    <v-app-bar 
      app 
      color="#3aafa9"
      height="80" 
      dark 
      elevation="0" 
      fixed clipped-left
      >

      <!-- Side bar hide/view button -->
       <v-app-bar-nav-icon class="menu" @click.stop="sidebarMenu=!sidebarMenu"></v-app-bar-nav-icon>

       <!-- Top bar text and buttons -->
      <span style="font-family: 'Open Sans'; font-weight: 800" >REMOTE CHEERING</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-account</v-icon>
    </v-app-bar>

    <!-- Side bar Menu -->
    <v-navigation-drawer
        v-model="sidebarMenu" 
        app
        floating
        :permanent="sidebarMenu"
        :mini-variant="mini"
        :mini-variant-width=70
        clipped
        color="#2b7a78"
      >

      <!-- List of buttons/options -->
        <v-list
          dense
          nav
          two-line
          :height=50
          class="py-0"
          dark
        >

        <!-- Button to expand and contract side bar -->
          <v-list-item :class="'px-0'">
            <v-list-item-avatar class="nav-icons">
              <v-icon small @click.stop="mini=!mini">mdi-arrow-expand-horizontal</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider></v-divider>

          <!-- Navigation Buttons -->
          <v-list-item
            class="nav-buttons"
            v-for="item in items"
            :key="item.title"
            link
            :to="item.path"
          > 

          <!-- Adding Navigation Button icons -->
            <v-list-item-icon>
              <v-icon color= "#17252a" class="nav-icons">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <!-- Adding Navigation Button text -->
            <v-list-item-content>
              <p class="nav-text">{{ item.title }}</p>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- To keep sidebar from overlapping the page content -->
      <v-main>
      </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'Sidebar',
    data () {
      return {

        //initial states
        sidebarMenu: true,
        mini: true,

        //nav options data
        items: [
          { title: 'ABOUT', icon: 'mdi-information', path: '/' },
          { title: 'RECORD', icon: 'mdi-account-voice', path: '/record' },
          { title: 'HISTORY', icon: 'mdi-history', path: '/history' },
        ],
      }
    },
  }
</script>

<style>
  
  /*Top app bar padding*/
  .menu{
    padding: 0 35px;
  }
  
  /*Nav buttons*/
  .nav-buttons {

    border-radius: 4px;

  }

  /*Nav text styling*/
  .nav-text{
    margin-top: 15px;
    font-size: 15px;
    font-family: 'Open Sans';
    font-weight: 800;
    color: #17252a;
  }

  .nav-text:hover {
    font-size: 16px;
  }

  /*Nav icons*/
  .nav-icons{
    margin-top: 10px;
  }

</style>

