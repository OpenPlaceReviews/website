<template>
    <div class="data_container" >
        <div v-for="obj in objects_data.objects" class="operation_item">
            <opr-data-object :obj="obj" :type_obj="type_obj"></opr-data-object>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import OprDataObject from './OPRDataObject.vue'
import formats from '../mixins/formats'


export default {
  name: 'OprDataObjects',
    data: () => ({
    objects_data:[]
  }),
  components: {OprDataObject},
  props: ['url', 'type_obj'],
  mixins: [formats],
  created() {
      axios.get(this.url)
          .then(response => {
              if(!response.data.error){
                  this.objects_data = response.data
              }
          })
  },
  mounted() {
      var obj = {'type': this.type_obj};
      this.$parent.$refs.header.innerText = this.getPluralName(this.type_obj);
  }
}
</script>