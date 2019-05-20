<template>
  <div class="expand-block">
      <div class="mission_container">
        <div class="mission_block">
          <h1 id="mission">Mission</h1>
          <p>
              Big commercial companies collect millions of user reviews worldwide via all
              possible ways and make huge money on it. Sometimes they manipulate them in
              advertisers interest. None of them wants these data to be open and available
              for everyone. The amount of data they collect leads to global privacy issues.
              They create a monopoly on something that should belong to users.
          </p>

          <p>
              We’ve seen this already with…<br>
              … world knowledge monopoly: thus Wikipedia.org was born.<br>
              … world map data monopoly: thus OpenStreetMap.org was born.
          </p>
        <div v-show-slide="featuresOpen" class="missing_hidden">
          <p>
              With all these open projects the world became more open, transparent and better.
              Now it is time for users reviews. The world is waiting for OpenPlaceReviews.org to be born.
          </p>
          <p>
              We believe that any information provided by users could not be collected in any
              hidden form and should be available for further distribution.
          </p>
          <p>
              We are inspired by truly open crowdsource projects like OpenStreetMap and
              Wikipedia and as a first step we want to build a platform to leave reviews for
              restaurants, hotels, attractions, etc.  We are developers of popular mobile maps
              application and we know how to do it.
          </p>
          <p>
              Join our community and share your feedback. Let’s make the world a better place to live!
          <p>
              ------<br>
              Here’s our mission and what we stand for:<br>
              Openness that leads to transparency and trustworthy<br>
              Collaborativeness that leads to quality
          </p>
        </div>
        <div @click="toggleFeatures" class="collapsed_btn">{{ featuresOpen ? 'Collapse' : 'Read more' }}</div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'ExpandMissingBlock',
  data () {
    return {
      featuresOpen: false
    }
  },
  methods: {
    toggleFeatures () {
      this.featuresOpen = !this.featuresOpen
    }
  }
  // props: ['expand_data'],
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
  /*.toggle-features {*/
    /*border: 0;*/
    /*border-radius: 40px;*/
    /*cursor: pointer;*/
    /*display: inline-block;*/
    /*font-family: sans-serif;*/
    /*font-size: 16px;*/
    /*padding: 15px 30px;*/
    /*text-align: center;*/
    /*text-decoration: none;*/
    /*transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;*/
    /*background-color: #00a3ff;*/
    /*color: #fff;*/
    /*margin-top: 15px;*/
    /*&:hover {*/
      /*background-color: darken(#00a3ff, 10%);*/
    /*}*/
  /*}*/
</style>