<template>
  <div id="app">
    <div v-if="user" userid="nav">
      <router-link v-if="currentGame" to="/">Home | </router-link>
      <router-link v-if="currentGame" to="/character">Character Sheet | </router-link>
      <router-link v-if="currentGame" to="/map">Map | </router-link>
      <a v-if="user.tagname" style="cursor: pointer" class="clickable" @click="logout">{{user.tagname}} (Logout)</a>
      <a v-else class="clickable" style="cursor: pointer" @click="logout">{{user.firstname}} {{user.lastname}} (Logout)</a>
    </div>
    <router-view/>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  computed: {
    user() {
      return this.$root.$data.user;
    },
    currentGame() {
      return this.$root.$data.currentGame;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
        this.$root.$data.currentGame = null;
        this.$router.push({ path: '/' });
      } catch (error) {
        this.$root.$data.user = null;
        this.$root.$data.currentGame = null;
        this.$router.push({ path: '/' });
      }
    },
  }
}
</script>

<style>
/* Color scheme: https://paletton.com/#uid=7040u0knHs+edG7jrvYscpiuCk2 */
/* red: #e74c3c
 * blue: #277E8E
 */
body {
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  margin: 0px 200px;
}


#footer {
  position: relative;
  top: 150px;
  width: 100%;
  height: 2.5rem;            /* Footer height */
}


#header {
  /* Semi-circle */
  margin: 0 1em 1em 0;
  height: 100px;
  width: 200px;
  border-bottom-left-radius: 200px;
  border-bottom-right-radius: 200px;
  position: fixed;
  z-index: 10000;
  left: 50%;
  transform: translate(-50%, 0);
  /* Color and alignment */
  background: #e74c3c;
  text-align: center;
  box-shadow: 0 0 0 1em #FFF;
}

nav {
  display: flex;
  justify-content: center;
}

h1 {
  color: #000;
  font-size: 18px;
}

h2 {
  font-size: 24px;
}

#header .fas {
  font-size: 25px;
  color: #fff;
  width: 50px;
}

.pure-button-primary {
  background-color: #277E8E;
}
</style>
