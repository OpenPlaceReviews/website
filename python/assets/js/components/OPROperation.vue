<template>

        <div class="item_data">
            <div class="operation_info">
                <div class="type_operation sys_signup"></div>
                <div class="content">
                    <div class="content_header" v-text="$eval(op_name)"></div>
                    <div class="description">Information from User details section (spoken language, .... )
                        New objects 1 *** Object type: User login</div>
                </div>
                <div class="info">
                    <div class="first_info_block">
                        <div class="hash" v-bind:title="op.hash | only_hash_number">{{ op.hash | slice_hash }}</div>
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
    </div>
</template>

<script>
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
        },
        '$eval'(expr) {
            var op = this.op;
            return eval(expr);
          }

    },
    data() {
        return {
            op_name: ''
        }
    },
    created() {
        this.op_name = this.op.new[0].description && this.op.new[0].description['operation-format'] ? eval(this.op.new[0].description['operation-format']) : this.op.type;
        this.op_name = typeof this.op_name == 'string' ? this.op_name : this.op_name.join('\n');
        var op = this.op;
        this.op_name = "if(op.new && op.new.length > 0 && (!op.old || op.old.length == 0)) 'Welcome new user ' + op.new[0].id + '!'"
        // if(op.new && op.new.length > 0 && (!op.old || op.old.length == 0)) return 'Welcome new user ' + op.new[0].id + '!';
        // if(op.old && op.old.length > 0 && (!op.new || op.new.length == 0)) return 'User ' + op.old[0].id + ' was deleted!';
        // return 'User ' + op.new[0].id + ' updated details';
        // console.log(this.op_name);
    }
}
</script>