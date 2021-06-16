<template>
<div class="main">
  <h2>Please Choose a Campaign</h2>
  <button type="submit" class="pure-button pure-button-primary" @click.prevent="addgame">New</button>
  <GameUploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  <h3>Created</h3><hr>
  <GameGallery :games="myGames" :accepted="true"/>
  <h3>Joined</h3><hr>
  <GameGallery :games="acceptedGames" :accepted="true"/>
  <h3>Invitations</h3><hr>
  <GameGallery :games="invitedGames" @reloadInvited="getInvitedGames" @reloadAccepted="getAcceptedGames" :accepted="false"/>
</div>
</template>

<script>
import GameGallery from '@/components/GameGallery.vue';
import axios from 'axios';
import GameUploader from '@/components/GameUploader.vue';
export default{
  name: 'ChooseGame',
  components: {
    GameGallery,
    GameUploader,
  },
  data() {
    return {
      show: false,
      myGames: [],
      acceptedGames: [],
      invitedGames: [],
      error: '',
    }
  },
  created() {
    this.getAcceptedGames();
    this.getInvitedGames();
    this.getGames();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async getGames() {
      try {
        this.response = await axios.get("/api/games/");
        this.myGames = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getAcceptedGames() {
      try {
        this.response = await axios.get("/api/games/accepted/");
        this.acceptedGames = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getInvitedGames() {
      try {
        this.response = await axios.get("/api/games/invited/");
        this.invitedGames = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
    },
    addgame() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getGames();
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;

}

.menu h2 {
  font-size: 14px;
}
</style>
