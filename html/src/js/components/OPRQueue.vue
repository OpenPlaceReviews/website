<template>
    <div>
        <div v-if="queue_data.hasOwnProperty('ops') && queue_data.ops.length > 0" class="block_main_info">
            <ul>
                <li>Operations in queue: <span>{{ queue_data.ops.length }}</span></li>
                <li>Oldest operation: <span>{{ newest_date | date_to_utc_custom }} </span></li>
                <li>Newest operation: <span>{{ oldest_date | date_to_utc_custom }}</span></li>
                <li>Operations description: <span>{{ queue_desc }}</span></li>
            </ul>
        </div>
        <div v-if="queue_data.hasOwnProperty('ops') && queue_data.ops.length > 0">
            <opr-operations :operations="queue_data.ops"></opr-operations>
        </div>
        <div v-else>
            Queue is empty
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import OprOperations from './OPROperations.vue'
import formats from '../mixins/formats'

export default {
    name: 'OprQueue',
    components: {OprOperations},
    data: () => ({
        queue_data: [],
        oldest_date: 1,
        newest_date: 1,
        oldest_desc: '',
        newest_desc: '',
        queue_desc: ''
    }),
    props: ['url'],
    mixins: [formats],
    created() {
        axios.get(this.url)
            .then(response => {
                if(!response.data.error){
                    this.queue_data = response.data;
                    if (this.queue_data.ops.length > 0) {
                        this.newest_date = this.queue_data.ops.length > 0 ? this.queue_data.ops[0].eval.timestamp : 0;
                        this.oldest_date = this.queue_data.ops.length > 0 ? this.queue_data.ops[this.queue_data.ops.length - 1].eval.timestamp : 0;
                        var types_oprs = {};
                        for (var i = 0; i < this.queue_data.ops.length; i++ ){
                            if (types_oprs.hasOwnProperty(this.queue_data.ops[i].type)){
                                types_oprs[this.queue_data.ops[i].type].count += 1;
                            }
                            else{
                                types_oprs[this.queue_data.ops[i].type] = {
                                    'count': 1,
                                    'name': this.getObjectName(this.queue_data.ops[i]),
                                    'plural_name': this.getTypePluralName(this.queue_data.ops[i].type)
                                }
                            }
                        }
                        var queue_desc_list = [];
                        for (var i = 0; i < Object.keys(types_oprs).length; i++){
                            var desc_name = types_oprs[Object.keys(types_oprs)[i]].count > 1 ? types_oprs[Object.keys(types_oprs)[i]].plural_name : types_oprs[Object.keys(types_oprs)[i]].name;
                            desc_name = desc_name + ' ' + types_oprs[Object.keys(types_oprs)[i]].count;
                            queue_desc_list.push(desc_name)
                        }
                        this.queue_desc = queue_desc_list.sort().join(', ')
                    }
                }
            })
  }
}
</script>