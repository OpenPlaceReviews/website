<template>
    <div class="blocks_items">
        <div class="blocks_items_header">
            <div>Block ID</div>
            <div>Time</div>
            <div>Hash</div>
            <div>Signed by</div>
            <div>Operations count</div>
            <div>Previous block hash</div>
        </div>
        <div v-for="block_data in blocks" class="block_item">
            <div title="block id"><a v-bind:href="'/data/blocks/' + block_data.block_id">{{ block_data.block_id }}</a></div>
            <div>{{ block_data.date | date_to_locale_string }}</div>
            <div v-bind:title="block_data.hash">{{ block_data.hash | slice_hash }}</div>
            <div>{{ block_data.signed_by }}</div>
            <div>{{ block_data.ops.length }}</div>
            <div v-bind:title="block_data.previous_block_hash">{{ block_data.previous_block_hash | slice_hash }}</div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'OprBlocks',
  data: () => ({
    blocks:[]
  }),
  props: ['url'],
  created() {
      axios.get(this.url)
          .then(response => {
              if(!response.data.error){
                  this.blocks = response.data.blockchain
              }
          })
  }
}
</script>