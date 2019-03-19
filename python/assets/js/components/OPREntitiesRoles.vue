<template>
    <div class="data_container" >
        <div v-for="obj in objects_data.objects" class="item_data">
            <div class="type_operation sys_signup"></div>
            <div class="content">
                <div class="content_header">Role {{ obj.id | join_list(', ')}}</div>
                <div>{{ obj.comment }}</div>
            </div>
            <div class="info">
                <div class="first_info_block">
                    <div class="date">Owner role</div>
                    <div class="delimeter">•</div>
                    <div class="hash">{{ obj.owner_role }}</div>
                </div>
                <div class="second_info_block">
                    <div class="who_confirmed">Super roles</div>
                    <div class="delimeter">•</div>
                    <div class="user">{{ obj.super_roles | join_list(', ') | default_value('none')}}</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'OprEntitiesRoles',
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