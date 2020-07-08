<template>
  <v-app>
    <v-app-bar 
      app 
      color="#3aafa9"
      height="80" 
      dark 
      elevation="0" 
      fixed clipped-left
      >
       <v-app-bar-nav-icon class="menu" @click.stop="sidebarMenu=!sidebarMenu"></v-app-bar-nav-icon>
      <span style="font-family: 'Open Sans'; font-weight: 800" >REMOTE CHEERING</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-account</v-icon>
    </v-app-bar>
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
        <v-list
          dense
          nav
          two-line
          :height=50
          class="py-0"
          dark
        >
          <v-list-item :class="'px-0'">
            <v-list-item-avatar class="nav-icons">
              <v-icon small @click.stop="mini=!mini">mdi-arrow-expand-horizontal</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            class="nav-buttons"
            v-for="item in items"
            :key="item.title"
            link
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon color= "#17252a" class="nav-icons">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <p class="nav-text">{{ item.title }}</p>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
      </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'Sidebar',
    data () {
      return {
        sidebarMenu: true,
        mini: true,
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

  .menu{
    padding: 0 35px;
  }
  
  .nav-buttons {

    border-radius: 4px;

  }

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

  .nav-icons{
    margin-top: 10px;
  }

</style>

