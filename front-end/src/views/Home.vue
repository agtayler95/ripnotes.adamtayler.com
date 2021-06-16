<template>
  <div class="home">
    <Campaign v-if="user && currentGame" />
    <ChooseGame v-else-if="user" />
    <Login v-else/>
  </div>
</template>

<script>
// @ is an alias to /src
import Campaign from '@/components/Campaign.vue';
import Login from '@/components/Login.vue';
import ChooseGame from '@/components/ChooseGame.vue';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    Campaign,
    Login,
    ChooseGame
  },
  data() {
    return {
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    currentGame() {
      return this.$root.$data.currentGame;
    }
  }
}
</script>
