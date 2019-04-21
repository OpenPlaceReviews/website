<template>
    <div class="data_container" >
        <div v-for="op in operations" class="operation_item">
            <opr-operation :op="op"></opr-operation>
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