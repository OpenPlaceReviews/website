<template>
    <div class="data_container" >
        <div v-for="obj in objects_data.objects" class="item_data">
            <div class="type_operation sys_signup"></div>
            <div class="content">
                <div class="content_header">Signup user</div>
                <div>New user registration as <b>{{ obj.id }}</b></div>
            </div>
            <div class="info">
                <div class="first_info_block">
                    <!--<div class="date">2019-01-24, 14:44</div>-->
                    <div class="delimeter">•</div>
                    <div class="hash" v-bind:title="obj.pubkey">{{ obj.pubkey | slice_hash(121, 133)}}</div>
                </div>
                <div class="second_info_block">
                    <div class="who_confirmed">{{ obj.type }}</div>
                    <div class="delimeter">•</div>
                    <div class="user"><a href="#">{{ obj.signed_by }}</a></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import OprOperations from './OPROperations.vue'

export default {
  name: 'OprEntitiesSignups',
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