<template>
    <div class="data_container" >
        <div v-for="obj in objects_data.objects" class="item_data">
            <div class="type_operation sys_signup"></div>
            <div class="content">
                <div class="content_header">{{ obj.id | join_list(', ') }}</div>
                <div>{{ obj.comment }}</div>
                <div><b>Fields</b></div>
                <div v-html="flatFields(obj.fields)"></div>
            </div>
            <div class="info">
                <div class="first_info_block">
                    <div class="date">Arity</div>
                    <div class="delimeter">•</div>
                    <div class="hash">{{ obj.arity }}</div>
                </div>
                <div class="second_info_block">
                    <div class="who_confirmed">Version</div>
                    <div class="delimeter">•</div>
                    <div class="user">{{ obj.version }}</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'OprEntitiesOperations',
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
  },
  methods: {
      flatFields (obj) {

          var list_values = Object.entries(obj);
          var str = '';
          for (var i=0; i < list_values.length; i++){
              var el = '<div>' + list_values[i].join(': ') + '</div>';
              str += el;
          }
          return str;
      }
  }
}
</script>