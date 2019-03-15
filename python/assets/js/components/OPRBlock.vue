<template>
    <div>
        <!--<div class="block_item">-->
            <!--<div>{{ block_data.date | date_to_locale_string }}</div>-->
            <!--<div v-bind:title="block_data.hash">{{ block_data.hash | slice_hash }}</div>-->
            <!--<div>{{ block_data.signed_by }}</div>-->
            <!--<div>{{ block_data.ops.length }}</div>-->
            <!--<div v-bind:title="block_data.previous_block_hash">{{ block_data.previous_block_hash | slice_hash }}</div>-->
        <!--</div>-->
        <opr-operations :operations="block_data.ops"></opr-operations>
    </div>
</template>

<script>
import axios from 'axios';
import OprOperations from './OPROperations.vue'

export default {
  name: 'OprBlock',
    components: {OprOperations},
    data: () => ({
    block_data:[]
  }),
  comments: [OprOperations],
  props: ['url'],
  created() {
      axios.get(this.url)
          .then(response => {
              if(!response.data.error){
                  this.block_data = response.data
              }
          })
  }
}
</script>