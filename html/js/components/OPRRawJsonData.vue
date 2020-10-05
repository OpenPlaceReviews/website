<template>
    <div class="raw_json_block_item">
        <div class="raw_json_block">
            <div class="raw_json" v-on:click="show_json_data">RAW json</div>
            <div class="signed_by">Signed by: <span>{{ json_data.signed_by }}</span></div>
        </div>
        <highlight-code lang="json">
            {{ json_data }}
        </highlight-code>
    </div>
</template>

<script>

export default {
  name: 'OprRawJsonData',
  data: () => ({
    featuresOpen: false
  }),
  props: ['block_url', 'block_id', 'signed_by', 'json_data'],
  methods: {
    show_json_data: function (event) {
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