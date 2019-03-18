<template>
    <div class="data_container" >
        <div v-for="obj in objects_data.objects" class="item_data">
            <div class="type_operation sys_signup"></div>
            <div class="content">
                <div class="content_header">Grant</div>
                <div>Roles <b>{{ obj.roles | join_list(', ') }}</b> add for user
                    <b>{{ obj.id | join_list(':') }}</b> </div>
            </div>

        </div>
    </div>

</template>

<script>
import axios from 'axios';
import OprOperations from './OPROperations.vue'

export default {
  name: 'OprEntitiesLogins',
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