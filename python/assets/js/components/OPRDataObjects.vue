<template>
    <!--<div class="data_container" >-->
        <!--<div v-for="obj in objects_data.objects" class="item_data">-->
            <!--<opr-data-object :obj="obj"></opr-data-object>-->
            <!--<div class="type_operation sys_signup"></div>-->
            <!--<div class="content">-->
                <!--<div class="content_header">{{ obj.id }}</div>-->
                <!--<div>{{ obj.comment || 'undefined' }}</div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
    <div class="data_container" >
        <div v-for="obj in objects_data.objects" class="operation_item">
            <opr-data-object :obj="obj" :type_obj="type_obj"></opr-data-object>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import OprDataObject from './OPRDataObject.vue'
import format from './formats.js'


export default {
  name: 'OprDataObjects',
    data: () => ({
    objects_data:[]
  }),
  components: {OprDataObject},
  props: ['url', 'type_obj'],
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
      this.$parent.$refs.header.innerText = format.getTypePluralName(this.type_obj);
  }
}
</script>