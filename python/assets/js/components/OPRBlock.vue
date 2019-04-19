<template>
    <div>
        <div class="block_main_info">
            <ul>
                <li>Block id: <span>#{{ block_data.block_id }}</span></li>
                <li>Block Hash: <span>{{ block_data.hash | only_hash_number }}</span></li>
                <li>Operations count: <span>{{ op_count }}</span></li>
                <li>Signed by: <span>{{ block_data.signed_by }}</span></li>
                <li>Datatime: <span>{{ block_data.date }}</span></li>
            </ul>
        </div>
        <!--<div class="block_main_info">-->
            <!--<ul>-->
                <!--<li>Operations in queue: <span>1111</span></li>-->
                <!--<li>Oldest operation: <span>1 hour ago (....) 'sys.login' by nickname</span></li>-->
                <!--<li>Newest operation: <span>5 second ago (...) 'sys.login' by nikcname</span></li>-->
                <!--<li>Operations description: <span>5 logins, 2 grant permissions, 10 place edits</span></li>-->
            <!--</ul>-->
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
                  this.op_count = response.data.ops.length
                  this.$parent.$refs.header.innerText = 'Transactions – Block #' + this.block_data.block_id;
              }
          })
  }
}
</script>