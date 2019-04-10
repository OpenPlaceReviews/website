<template>
    <div>
        <div v-for="block_data in blocks" class="blocks_items">
            <div class="block_item">
                <div class="block-icon">
                </div>
                <div class="main_info">
                    <div title="block id" class="title_block"><a v-bind:id="'url_block_' + block_data.block_id" v-bind:href="'/data/blocks/' + block_data.block_id + '/' + block_data.hash">Block #{{ block_data.block_id }}</a></div>
                    <div class="opr_count">Operations count: <span>{{ block_data.eval.operations_size }}</span></div>
                    <div class="date">Date: <span>{{ block_data.date }}</span></div>
                </div>
                <div class="second_info">
                    <div class="second_info_container">
                        <div v-bind:title="block_data.hash" class="hash">{{ block_data.hash | slice_hash }}</div>
                    </div>
                </div>
            </div>
            <opr-raw-json-data
                    v-bind:block_url="'/data/blocks/' + block_data.block_id + '/' + block_data.hash"
                    v-bind:id="'block_data_'+block_data.block_id"
                    v-bind:signed_by="block_data.signed_by"
            ></opr-raw-json-data>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import OprRawJsonData from './OPRRawJsonData.vue'

export default {
  name: 'OprBlocks',
    components: {OprRawJsonData},
    data: () => ({
    blocks:[]
  }),
  props: ['url'],
  created() {
      axios.get(this.url)
          .then(response => {
              if(!response.data.error){
                  this.blocks = response.data
              }
          })
  }
}
</script>