<template>
  <div class="character">
    <h1>This is the Character page</h1>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Character',
  data() {
    return {
      character: null,
      error: null
    }
  },
  created() {
    this.getCharacter();
  },
  methods: {
    async getCharacter() {
      try {
        await axios.get("api/characters/" + this.$root.$data.currentGame._id);
      } catch(error) {
          this.error = error.response.data.message;
        }
      }
    }
  }

</script>
