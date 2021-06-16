<template>
<div>
  <section class="image-gallery">
    <div class="image" v-for="game in games" v-bind:key="game._id">
      <a v-if="accepted" style="cursor: pointer" class="clickable" @click="choosegame(game)">
        <img v-if="game.thumbnail" :src="game.thumbnail" />
        <img v-else src="/images/PlaceHolder.png" /></a>
      <a v-else style="cursor: pointer" class="clickable" @click="showResponder">
          <img v-if="game.thumbnail" :src="game.thumbnail" />
          <img v-else src="/images/PlaceHolder.png" /></a>
      <InvitationResponse :show="show" :game="game._id" @close="close" @decline="decline" @accept="accept" @uploadFinished="responseSent" />
      <div class="gameInfo">
        <p class="gameName">{{game.title}}</p>
      </div>
      <p class="gameDate">{{formatDate(game.created)}}</p>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';
import InvitationResponse from '@/components/InvitationResponse.vue';
export default {
  name: 'GameGallery',
  components: {
    InvitationResponse
  },
  props: {
    games: Array,
    accepted: Boolean
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    choosegame(game) {
      this.$root.$data.currentGame = game;
    },
    close() {
      this.show = false;
    },
    decline() {
      this.$emit('reloadInvited');
      this.show = false;
    },
    accept() {
      this.$emit('reloadAccepted');
      this.$emit('reloadInvited');
      this.show = false;
    },
    showResponder() {
      this.show = true;
    },
    async responseSent() {
      this.show = false;
    },
  }
}
</script>

<style scoped>
.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
