<template>
    <div class="data_container" >
        <div v-for="obj in objects_data.objects" class="item_data">
            <div class="type_operation sys_validate"></div>
            <div class="content">
                <div class="content_header">Validation {{ obj.id }}</div>
                <div>{{ obj.comment }}</div>
            </div>
            <div class="info">
                <div class="first_info_block">
                    <!--<div class="date">2019-01-24, 14:44</div>-->
                    <div class="delimeter">•</div>
                    <div class="hash">{{ obj.role}}</div>
                </div>
                <div class="second_info_block">
                    <div class="who_confirmed">{{ obj.type }}</div>
                    <div class="delimeter">•</div>
                    <div class="user"><a href="#">{{ obj.owner_role }}</a></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import OprOperations from './OPROperations.vue'

export default {
  name: 'OprEntitiesValidations',
    data: () => ({
    objects_data:[]
  }),
  props: ['url'],
  created() {
      axios.get(this.url)
          .then(response => {
              if(!response.data.error){
                  this.objects_data = response.data
              }
          })
  }
}
</script>