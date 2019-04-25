<template>
    <div>
        <div class="block_main_info">
            <ul>
                <li>Block id: <span>#{{ block_data.block_id }}</span></li>
                <li>Block Hash: <span>{{ block_data.hash | only_hash_number }}</span></li>
                <li>Operations count: <span>{{ op_count }}</span></li>
                <li>Signed by: <span>{{ block_data.signed_by }}</span></li>
                <li :title="block_data.date | date_to_utc_string">Datatime: <span>{{ block_data.date | date_to_utc_custom }}</span></li>
            </ul>
        </div>
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
    block_data:[],
      op_count: 0
    }),
  comments: [OprOperations],
  props: ['url'],
  created() {
      axios.get(this.url)
          .then(response => {
              if(!response.data.error){
                  this.block_data = response.data;
                  this.op_count = response.data.ops.length;
                  this.$parent.$refs.header.innerText = 'Transactions – Block #' + this.block_data.block_id;
              }
          })
  },

}
</script>