<template>
    <div>
        <div v-if="queue_data.ops.length">
            <opr-operations :operations="queue_data.ops"></opr-operations>
        </div>
        <div v-else>
            Queue is empty
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OprTransaction',
  data: () => ({
    tr_data:[]
  }),
  comments: [OprOperations],
  props: ['url'],
  created() {
      axios.get(this.url)
          .then(response => {
              if(!response.data.error){
                  this.queue_data = response.data
              }
          })
  }
}
</script>