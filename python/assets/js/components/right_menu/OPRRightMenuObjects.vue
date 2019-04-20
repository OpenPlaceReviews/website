<template>
    <div class="menu">
        <ul class="menu_items">
            <li class="menu_header">Filter</li>
            <li class="bottom_border">
                <a v-bind:href="queue_page_url" class="first_level_menu">
                    <div class="icon_queue"></div>
                    <span class="unselect">Queue</span>
                    <div class="menu_opr_count">{{ queue.ops.length }}</div>
                </a>
            </li>
            <li class="selected_">
                <a v-bind:href="blocks_page_url" class="first_level_menu">
                    <div class="icon_blocks"></div>
                    <span class="unselect">All Blocks</span>
                    <div class="menu_opr_count">{{ blocks.length }}</div>
                </a>
            </li>
                <opr-right-menu-item-block
                        v-for="block in showed_blocks"
                        v-bind:block="block"
                        v-bind:blocks_page_url="blocks_page_url"
                        v-bind:block_hash="block.hash | only_hash_number"
                        :key="block.block_id"
                ></opr-right-menu-item-block>
            <li v-if="blocks.length > showed_blocks.length" class="font_weight_normal">
                <a href="#" id="show_more" class="first_level_menu" v-on:click.prevent="show_more">
                    <div class=""></div>
                    <span class="unselect" >Show more</span>
                </a>
            </li>
        </ul>
        <ul class="menu_items">
            <li class="menu_header top_border">
                <div>Objects</div>
                <div class="menu_opr_count">{{ objects.length }}</div>
            </li>
            <li v-for="opr_object in objects" class="font_weight_normal {% if url_entities_validations in request.path %}selected{% endif %}">
                <a class="first_level_menu" v-bind:href="'/data/objects/' + opr_object.id">
                    <img :src="opr_object|get_icon" width="20" height="20">
                    <span class="unselect" href="#">{{ opr_object | get_name_object }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import OprRightMenuItemBlock from './OPRMenuItemBlock.vue'
import format from '../formats'

export default {
  name: 'OprRightMenuObjects',
    components: {OprRightMenuItemBlock},
    data: () => ({
    objects: [],
    blocks: [],
    showed_blocks: [],
    show_more_size: 5,
    queue: {'ops':[]
    }
  }),
  props: ['url_objects', 'url_blocks', 'url_queue', 'queue_page_url', 'blocks_page_url'],
  created() {
      axios.get(this.url_objects).then(response => {
          if(!response.data.error){
              this.objects = response.data.objects;
          }
      });
      axios.get(this.url_blocks).then(response => {
          if(!response.data.error){
              this.blocks = response.data;
              this.showed_blocks = this.blocks.slice(0, this.show_more_size);
          }
      });
      axios.get(this.url_queue).then(response => {
          if(!response.data.error){
              this.queue = response.data;
          }
      });
  },
  methods:{
      show_more: function (event) {
          if (event) event.preventDefault();
          var showed_block_count = this.showed_blocks.length;
          var blocks_count = this.blocks.length;
          var new_blocks = this.blocks.slice(showed_block_count, showed_block_count+this.show_more_size);
          if (blocks_count > showed_block_count){
              for (var i = 0; i < new_blocks.length; i++){
                  this.showed_blocks.push(new_blocks[i])
              }
          }
      }
  },
  updated() {
      var links_menu = document.querySelectorAll('.first_level_menu');
      links_menu = Array.from(links_menu).reverse();
      for (var i=0; i < links_menu.length; i++){
          links_menu[i].parentElement.classList.remove('selected');
          if (location.href.includes(links_menu[i].getAttribute('href'))){
              links_menu[i].parentElement.classList.remove('selected')
              links_menu[i].parentElement.classList.add('selected');
              break;
          }
      }

  },
  filters: {
      slice_sys: function (value) {
          return value.split('.').reverse()[0]
      },
      get_icon: function (obj) {
          obj.type = obj.id[0];
          return '/static/images/' + format.getIconIter(obj) + '.png';
      },
      get_name_object(obj) {
          obj.type = obj.id[0];
          return format.getObjectName(obj);
      }
  }
}
</script>