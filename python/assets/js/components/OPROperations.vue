<template>
    <div class="data_container" >
        <div v-for="op in operations" class="operation_item">
            <opr-operation :op="op"></opr-operation>
            <!--<div class="item_data">-->
                <!--<div class="operation_info">-->
                    <!--<div class="type_operation sys_signup"></div>-->
                    <!--<div class="content">-->
                        <!--<div class="content_header">Welcome new user <a href="#">{{ op.new[0].id[0] }}</a>!</div>-->
                        <!--<div class="description">Information from User details section (spoken language, .... )-->
                            <!--New objects 1 *** Object type: User login</div>-->
                    <!--</div>-->
                    <!--<div class="info">-->
                        <!--<div class="first_info_block">-->
                            <!--<div class="hash" v-bind:title="op.hash | only_hash_number">{{ op.hash | slice_hash }}</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="raw_json_block_item">-->
                    <!--<div class="raw_json_block">-->
                        <!--<div class="raw_json" v-on:click="toggle_show_data">RAW json</div>-->
                        <!--<div class="signed_by">Signed by: <span>{{ op.signed_by }}</span></div>-->
                    <!--</div>-->
                    <!--<highlight-code lang="json">-->
                        <!--{{ op }}-->
                    <!--</highlight-code>-->
                <!--</div>-->
            <!--</div>-->

        </div>
    </div>
</template>

<script>
import OprOperation from "./OPROperation.vue";
export default {
    name: 'OprOperations',
    components: {OprOperation},
    props: ['operations'],
    data () {
        return {
            featuresOpen: false
        }
    },
    // filters: {
    //     get_title: function (obj) {
    //         var title = 'Lorem text';
    //         switch (obj.type){
    //             case 'sys.login':
    //                 title = 'User has come site';
    //                 break;
    //             case 'sys.signup':
    //                 title = 'Welcome new user';
    //                 break;
    //             case 'sys.operation':
    //                 title = 'Operation';
    //                 break;
    //             case 'sys.grant':
    //                 title = 'Grant';
    //                 break;
    //             case 'sys.role':
    //                 title = 'Role';
    //                 break;
    //             case 'sys.validate':
    //                 title = 'Validation'
    //                 break;
    //         }
    //         return title;
    //     },
    //     get_description: function (obj) {
    //         var description = 'Lorem text';
    //         switch (obj.type){
    //             case 'sys.login':
    //                 description = 'User login as ' + obj.new[0].id[1] + ' throwgh ' + obj.new[0].id[0];
    //                 break;
    //             case 'sys.signup':
    //                 description = 'New user registration as ' + obj.new[0].id;
    //                 break;
    //             case 'sys.operation':
    //                 description = obj.new[0].comment;
    //                 break;
    //             case 'sys.grant':
    //                 description = 'Roles ' + obj.new[0].roles.join(', ') + ' for ' + obj.new[0].id.join(':');
    //                 break;
    //             case 'sys.role':
    //                 description = obj.new[0].comment;
    //                 break;
    //             case 'sys.validate':
    //                 description = obj.new[0].comment;
    //                 break;
    //         }
    //         return description;
    //     }
    // },
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
    }

}
</script>