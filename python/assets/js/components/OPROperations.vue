<template>
    <div class="data_container" >
        <div v-for="op in operations" class="operation_item">
            <div class="item_data" v-if="op.type === 'sys.signup'">
                <div class="operation_info">
                    <div class="type_operation sys_signup"></div>
                    <div class="content">
                        <div class="content_header">Welcome new user <a href="#">{{ op.new[0].id[0] }}</a>!</div>
                        <div class="description">Information from User details section (spoken language, .... )
                            New objects 1 *** Object type: User login</div>
                    </div>
                    <div class="info">
                        <div class="first_info_block">
                            <div class="hash" v-bind:title="op.hash">{{ op.hash | slice_hash(65, 77)}}</div>
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
            <div class="item_data" v-else-if="op.type === 'sys.login'">
                <div class="operation_info">
                    <div class="type_operation sys_login"></div>
                    <div class="content">
                        <div class="content_header"><a href="#">{{ op.new[0].id[0] }}</a> has come in site</div>
                        <div class="description">Information from User details section (spoken language, .... )
                            New objects 1 *** Object type: User login</div>
                    </div>
                    <div class="info">
                        <div class="first_info_block">
                            <div class="hash" v-bind:title="op.hash">{{ op.hash | slice_hash(65, 77)}}</div>
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
            <div class="item_data" v-else-if="op.type === 'sys.operation'">
                <div class="operation_info">
                    <div class="type_operation sys_operation"></div>
                    <div class="content">
                        <div class="content_header">Object type <a href="#">{{ op.new[0].id[0] }}</a></div>
                        <div class="description">Information from User details section (spoken language, .... )
                            New objects 1 *** Object type: User login</div>
                    </div>
                    <div class="info">
                        <div class="first_info_block">
                            <div class="hash" v-bind:title="op.hash">{{ op.hash | slice_hash(65, 77)}}</div>
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
            <div class="item_data" v-else-if="op.type === 'sys.validate'">
                <div class="operation_info">
                    <div class="type_operation sys_validate"></div>
                    <div class="content">
                        <div class="content_header">Validation <a href="#">{{ op.new[0].id[0] }}</a></div>
                        <div class="description">Information from User details section (spoken language, .... )
                            New objects 1 *** Object type: User login</div>
                    </div>
                    <div class="info">
                        <div class="first_info_block">
                            <div class="hash" v-bind:title="op.hash">{{ op.hash | slice_hash(65, 77)}}</div>
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
            <div class="item_data" v-else-if="op.type === 'sys.grant'">
                <div class="operation_info">
                    <div class="type_operation sys_grant"></div>
                    <div class="content">
                        <div class="content_header">Permission <a href="#">{{ op.new[0].id[0] }}</a></div>
                        <div class="description">Information from User details section (spoken language, .... )
                            New objects 1 *** Object type: User login</div>
                    </div>
                    <div class="info">
                        <div class="first_info_block">
                            <div class="hash" v-bind:title="op.hash">{{ op.hash | slice_hash(65, 77)}}</div>
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
            <div class="item_data" v-else-if="op.type === 'sys.role'">
                <div class="operation_info">
                    <div class="type_operation sys_role"></div>
                    <div class="content">
                        <div class="content_header">Role <a href="#">{{ op.new[0].id[0] }}</a></div>
                        <div class="description">Information from User details section (spoken language, .... )
                            New objects 1 *** Object type: User login</div>
                    </div>
                    <div class="info">
                        <div class="first_info_block">
                            <div class="hash" v-bind:title="op.hash">{{ op.hash | slice_hash(65, 77)}}</div>
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

            <div class="item_data" v-else>
                <div class="operation_info">
                    <div class="type_operation sys_operation"></div>
                    <div class="content">
                        <div class="content_header">{{op.type}} - {{ op.new[0].id[0] }}</div>
                        <div class="description">Undefined transaction</div>
                    </div>
                    <div class="info">
                        <div class="first_info_block">
                            <div class="hash" v-bind:title="op.hash">{{ op.hash | slice_hash(65, 77)}}</div>
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
    </div>
</template>

<script>
export default {
    name: 'OprOperations',
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