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