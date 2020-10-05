<template>
    <form @submit.prevent="submitForm" id="join_us_form">
        <div class="hidden" v-html="csrf_token"></div>
        <input type="email" name="email" placeholder="Enter your email adress" required>
        <button type="submit">Join</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SubscribeForm',
  data () {
    return {
      featuresOpen: false
    }
  },
  methods: {
    submitForm() {
      let myForm = document.getElementById('join_us_form');
      let formData = new FormData(myForm);
      axios.post(
          this.action_url,
          formData
      ).then(response => {
          if (response.data.errors){
              for(var key in response.data.errors){
                this.$toast.error({
                  title: this.$options.filters.capitalize_first_letter(key),
                  message: response.data.errors[key][0]
                })
              }

          }
          else{
              this.$toast.success({
                title: 'Join Us',
                message: response.data.msg
              });

          }

      })
    }
  },
  props: ['action_url', 'csrf_token']
}
</script>
