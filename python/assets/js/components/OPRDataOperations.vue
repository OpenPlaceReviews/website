<template>
    <div class="data_container" >
        <div v-for="obj in objects_data.objects" class="item_data">
            <div class="type_operation sys_signup"></div>
            <div class="content">
                <div class="content_header">{{ obj.id }}</div>
                <div>{{ obj.comment || 'undefined' }}</div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import OprOperations from './OPROperations.vue'

export default {
  name: 'OprDataOperations',
    data: () => ({
    objects_data:[]
  }),
  props: ['url', 'type_op'],
  created() {
      axios.get(this.url)
          .then(response => {
              if(!response.data.error){
                  this.objects_data = response.data
              }
          })
  },
  mounted() {
     this.$parent.$refs.header.innerText = this.type_op;
  }
}
</script>