import Vue from 'vue'
import SelectSearch from './components/SelectSearch.vue'
import ExpandBlock from './components/ExpandBlock.vue'
import VShowSlide from 'v-show-slide'
import * as Vue2Leaflet from 'vue2-leaflet'
import OprBlocks from './components/OPRBlocks.vue'
import OprBlock from './components/OPRBlock.vue'
import OprOperations from './components/OPROperations.vue'
import OprQueue from './components/OPRQueue.vue'
import OprDataObjects from './components/OPRDataObjects.vue'
import VueHighlightJS from 'vue-highlight.js';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/default.css';
import OprRightMenuObjects from './components/right_menu/OPRRightMenuObjects.vue';
import OprTransaction from './components/OPRTransaction.vue';


var { LMap, LTileLayer, LMarker } = Vue2Leaflet;

import filters from './filters';
for(let name in filters) {
    Vue.filter(name, filters[name]);
}

Vue.use(VShowSlide);
Vue.use(VueHighlightJS, {
	// Register only languages that you want
	languages: {
		json
	}
});

var vm = new Vue({
  el: '#opr-app',
  components: {
    SelectSearch,
    ExpandBlock,
    LMap,
    LTileLayer,
    LMarker,
    OprBlocks,
    OprBlock,
    OprOperations,
    OprQueue,
    OprRightMenuObjects,
    OprDataObjects,
    OprTransaction
  },
  methods:{
    show_form: function (e, form_class) {
        e.target.parentElement.classList.add("method-auth-nickname-active-form");
        var forms_hidden = document.getElementsByClassName(form_class);
        while (forms_hidden.length > 0) {
            forms_hidden[0].classList.remove(form_class);
        }
    },
    click_menu: function (e) {
        e.target.parentElement.parentElement.classList.toggle('selected');
    }
  }
});