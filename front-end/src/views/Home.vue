<template>
  <div class="home">
    <Campaign v-if="user" />
    <Login v-else/>
  </div>
</template>

<script>
// @ is an alias to /src
import Campaign from '@/components/Campaign.vue';
import Login from '@/components/Login.vue';
//import axios from 'axios';
export default {
  name: 'Home',
  components: {
    Campaign,
    Login,
  },
  async created() {
    try {
      //let response = await axios.get('/api/users');
      //this.$root.$data.user = response.data.user;
      this.$root.$data.user = false;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
