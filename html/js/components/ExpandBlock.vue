<template>
  <div class="expand-block">
    <div v-show-slide="featuresOpen" class="expand-block-data">
      <div v-html="expand_data"></div>
    </div>
    <div class="expand-btn" @click="toggleFeatures">{{ featuresOpen ? 'Collapse' : 'Read' }}</div>
  </div>
</template>

<script>

export default {
  name: 'ExpandBlock',
  data () {
    return {
      featuresOpen: false
    }
  },
  methods: {
    toggleFeatures () {
      this.featuresOpen = !this.featuresOpen
    }
  },
  props: ['expand_data'],
}
</script>

<style lang="scss">
  .features {
    padding: 0;
    margin: 0;
    height: auto;
    list-style: none;
    li {
      margin-top: 10px;
    }
  }
  .toggle-features {
    border: 0;
    border-radius: 40px;
    cursor: pointer;
    display: inline-block;
    font-family: sans-serif;
    font-size: 16px;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;
    background-color: #00a3ff;
    color: #fff;
    margin-top: 15px;
    &:hover {
      background-color: darken(#00a3ff, 10%);
    }
  }
</style>