<template>
    <div>
        <opr-operations :operations="queue_data.ops"></opr-operations>
    </div>
</template>

<script>
import axios from 'axios';
import OprOperations from './OPROperations.vue'

export default {
  name: 'OprQueue',
    components: {OprOperations},
    data: () => ({
    queue_data:[]
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