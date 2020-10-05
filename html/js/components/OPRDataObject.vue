<template>
    <!--<div class="data_container" >-->
        <!--<div v-for="obj in objects_data.objects" class="item_data">-->
            <!--<div class="type_operation sys_signup"></div>-->
            <!--<div class="content">-->
                <!--<div class="content_header">{{ obj.id }}</div>-->
                <!--<div>{{ obj.comment || 'undefined' }}</div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
    <div class="item_data">
        <div class="operation_info">
            <div class="type_operation">
                <img :src="'/images/'+icon+'.png'" width="20" height="20">
            </div>
            <div class="content">
                <div class="content_header">{{ obj_title }}</div>
                <div class="description">
                    {{ obj_description }}
                </div>
            </div>
            <div class="info">
                <div class="first_info_block">
                </div>
            </div>
        </div>
        <div class="raw_json_block_item">
            <div class="raw_json_block">
                <div class="raw_json" v-on:click="toggle_show_data">RAW json</div>
            </div>
            <highlight-code lang="json">
                {{ obj }}
            </highlight-code>
        </div>
    </div>
</template>

<script>
import formats from '../mixins/formats'

export default {
  name: 'OprDataObject',
    data: () => ({
        obj_data:{},
        icon: '',
        obj_title: '',
        obj_description: ''
  }),
  props: ['obj', 'type_obj'],
  mixins: [formats],
  created() {
      this.obj_data = this.obj;
      this.obj_data.type = this.type_obj;
      this.icon = this.getIconObject(this.obj);
      this.obj_title = this.getObjectTitle(this.obj);
      this.obj_description = this.getObjectDescription(this.obj);
  },
  methods:{
    toggle_show_data: function (event) {
        event.target.classList.toggle('selected');
        if (event.target.classList.contains('selected')){
            event.target.parentElement.nextElementSibling.style.display = "block";
        }
        else{
            event.target.parentElement.nextElementSibling.style.display = "none";
        }
    }
  },
}
</script>
