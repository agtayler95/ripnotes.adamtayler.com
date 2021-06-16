<template>
<div class="main">
  <div class="actions">
    <h2>{{game.title}}</h2>
    <a style="cursor: pointer" class="clickable" @click="switchCampaign">Switch Campaign</a>
    <p></p>
    <a v-if="notCreator" style="cursor: pointer" class="clickable" @click="leaveCampaign">Leave Campaign</a>
    <p></p>
    <a v-if="isCreator" style="cursor: pointer" class="clickable" @click="deleteCampaign">Delete Campaign</a>
  </div>
  <div class="description">
    <img class="thumbnail" :src="game.thumbnail" />
    <p>{{game.description}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default{
  name: 'ChooseGame',
  data() {
    return {
      isCreator: false,
      notCreator: true,
      game: null
    }
  },
  created() {
    this.checkIfCreator();
    this.getGame();
  },
  methods: {
    switchCampaign(){
      this.$root.$data.currentGame = null;
    },
    async leaveCampaign(){
      let confirmed = window.confirm("Are you sure you want to leave the campaign? The creator would need to invite you again if you were to change your mind.");
      if (confirmed)
        await axios.put("api/games/playerResponse/" + this.game._id, {
          accepted: "declined"});
      this.$root.$data.currentGame = null;
    },
    checkIfCreator(){
      this.isCreator = (this.$root.$data.currentGame.creator === this.$root.$data.user._id);
      this.notCreator = !this.isCreator;
    },
    getGame(){
      this.game = this.$root.$data.currentGame
    },
    async deleteCampaign(){
      let confirmed = window.confirm("Are you sure you want delete this campaign? All data will be lost.");
      if (confirmed) {
        try {
          await axios.delete("/api/games/" + this.$root.$data.currentGame._id);
          this.$root.$data.currentGame = null;
        } catch (error) {
          this.error = error.response.data.message;
        }
      }
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

.description {
  margin: 70px;
}

.thumbnail {
  width: 100%;
}
</style>
