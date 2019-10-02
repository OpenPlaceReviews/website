<template>
    <div>{{ blocks }}
        <!--<div v-for="block_data in blocks" class="blocks_items">-->
            <!--<div class="block_item">-->
                <!--<div class="block-icon">-->
                <!--</div>-->
                <!--<div class="main_info">-->
                    <!--<div title="block id" class="title_block"><a v-bind:id="'url_block_' + block_data.block_id" v-bind:href="'/data/blocks/' + block_data.hash|only_hash_number">Block #{{ block_data.block_id }}</a></div>-->
                    <!--<div class="opr_count">Operations count: <span>{{ block_data.eval.operations_size }}</span></div>-->
                    <!--<div class="date">Date: <span>{{ block_data.date | date_to_utc_custom }}</span></div>-->
                <!--</div>-->
                <!--<div class="second_info">-->
                    <!--<div class="second_info_container">-->
                        <!--<a :href="'/data/blocks/' + block_data.hash | only_hash_number" v-bind:title="block_data.hash | only_hash_number" class="hash">{{ block_data.hash | slice_hash }}</a>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<opr-raw-json-data-->
                    <!--v-bind:block_url="'/data/blocks/' + block_data.hash | only_hash_number"-->
                    <!--v-bind:id="'block_data_' + block_data.block_id"-->
                    <!--v-bind:json_data="block_data"-->
            <!--&gt;</opr-raw-json-data>-->
        <!--</div>-->
    </div>
</template>

<script>

import axios from 'axios';
// import OprRawJsonData from './OPRRawJsonData.vue'

export default {
  name: 'OprBlocks',
    // components: {OprRawJsonData},
    data: () => ({
    blocks:[]
  }),
  props: ['url'],
  created() {
      axios.get(this.url, { crossDomain: true }).then(response => {
              if(!response.data.error){
                  this.blocks = response.data
              }
          })
  }
}
</script>