<template>
    <div class="data_container" >
        <div v-for="op in operations" class="item_data">
            <div class="type_operation" v-bind:class="op.type | replace_all('.', '_')"></div>
            <div class="content">
                <div class="content_header">{{ op | get_title }}</div>
                <div>{{ op | get_description }}</div>
            </div>
            <div class="info">
                <div class="first_info_block">
                    <!--<div class="date">2019-01-24, 14:44</div>-->
                    <div class="delimeter">•</div>
                    <div class="hash" v-bind:title="op.hash">{{ op.hash | slice_hash(65, 77)}}</div>
                </div>
                <div class="second_info_block">
                    <div class="who_confirmed">{{ op.type }}</div>
                    <div class="delimeter">•</div>
                    <div class="user"><a href="#">{{ op.signed_by }}</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OprOperations',
    props: ['operations'],
    filters: {
        get_title: function (obj) {
            var title = 'Lorem text';
            switch (obj.type){
                case 'sys.login':
                    title = 'User login';
                    break;
                case 'sys.signup':
                    title = 'New user registration';
                    break;
                case 'sys.operation':
                    title = 'Operation';
                    break;
                case 'sys.grant':
                    title = 'Grant';
                    break;
                case 'sys.role':
                    title = 'Role';
                    break;
                case 'sys.validate':
                    title = 'Validation'
                    break;
            }
            return title;
        },
        get_description: function (obj) {
            var description = 'Lorem text';
            switch (obj.type){
                case 'sys.login':
                    description = 'User login as ' + obj.new[0].id[1] + ' throwgh ' + obj.new[0].id[0];
                    break;
                case 'sys.signup':
                    description = 'New user registration as ' + obj.new[0].id;
                    break;
                case 'sys.operation':
                    description = obj.new[0].comment;
                    break;
                case 'sys.grant':
                    description = 'Roles ' + obj.new[0].roles.join(', ') + ' for ' + obj.new[0].id.join(':');
                    break;
                case 'sys.role':
                    description = obj.new[0].comment;
                    break;
                case 'sys.validate':
                    description = obj.new[0].comment;
                    break;
            }
            return description;
        }
    }
}
</script>