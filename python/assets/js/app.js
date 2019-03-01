import Vue from 'vue'
import SelectSearch from './components/SelectSearch.vue'
import ExpandBlock from './components/ExpandBlock.vue'
import VShowSlide from 'v-show-slide'

Vue.use(VShowSlide)

new Vue({
  el: '#opr-app',
  components: {
    SelectSearch,
    ExpandBlock
  },
  methods:{
    show_form: function (e, form_class) {
        e.target.parentElement.classList.add("method-auth-nickname-active-form");
        var forms_hidden = document.getElementsByClassName(form_class);
        while (forms_hidden.length > 0) {
            forms_hidden[0].classList.remove(form_class);
        }
    }
  }
});