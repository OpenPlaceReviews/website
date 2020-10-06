<template>
    <div class="item_data">
        <div class="operation_info">
            <div class="type_operation">
                <img :src="'/images/'+icon+'.png'" width="20" height="20">
            </div>
            <div class="content">
                <div class="content_header">{{ op_title}}</div>
                <div class="description">
                    {{ op_description }}<br v-if="op_description.length > 0">
                    Object type: <b>{{ ob_name }}</b><br>
                    New objects: <b>{{ op.new ? op.new.length : 0 }}</b><br>
                    Date: <b>{{ op.eval.timestamp | date_to_utc_custom }}</b><br>
                    <span v-if="op.old && op.old.length > 0">Deleted objects: <b>{{ op.old ? op.old.length : 0 }}</b></span>
                </div>
            </div>
            <div class="info">
                <div class="first_info_block">
                    <a
                        :href="op.hash | only_hash_number"
                        class="hash"
                        v-bind:title="op.hash | only_hash_number"
                    >{{ op.hash | slice_hash }}</a>
                </div>
            </div>
        </div>
        <div class="raw_json_block_item">
            <div class="raw_json_block">
                <div class="raw_json" v-on:click="toggle_show_data">RAW json</div>
                <div class="signed_by">Signed by: <span>{{ op.signed_by }}</span></div>
            </div>
            <highlight-code lang="json">
                {{ op }}
            </highlight-code>
        </div>
    </div>
</template>

<script>
import formats from '../mixins/formats';

export default {
    name: 'OprOperation',
    props: ['op'],
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
    mixins: [formats],
    data() {
        return {
            op_name: '',
            icon: '',
            op_description: '',
            op_title: '',
            ob_name: ''
        }
    },
    created() {
        this.op_name = this.getOperationName(this.op);
        this.icon = this.getIconOperation(this.op);
        this.op_title = this.getOperationTitle(this.op);
        this.op_description = this.op.details && this.op.details.length > 0 ? this.getOperationDescription(this.op) : '';
        this.ob_name = this.getObjectName(this.op);
    }
}
</script>
