<template>
    <div class="raw_json_block_item">
        <div class="raw_json_block">
            <div class="raw_json" v-on:click="load_block_data(block_url, $event)">RAW json</div>
            <div class="signed_by">Signed by: <span>{{ signed_by }}</span></div>
        </div>
        <highlight-code lang="json">
            {{ json_data }}
        </highlight-code>
    </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'OprRawJsonData',
  data: () => ({
    json_data: '',
    featuresOpen: false
  }),
  props: ['block_url', 'block_id', 'signed_by'],
  methods: {
    load_block_data: function(block_url, event){
        this.featuresOpen = !this.featuresOpen;
        if(this.featuresOpen) {
            block_url += '?json=true';
            axios.get(block_url)
                .then(response => {
                        if (!response.data.error) {
                            this.json_data = JSON.stringify(response.data, null, "  ")
                            event.target.classList.toggle('selected')
                            event.target.parentElement.nextElementSibling.style.display = "block";
                        }
                    }
                )
        }
        else{
            event.target.parentElement.nextElementSibling.style.display = "none";
            event.target.classList.toggle('selected')
        }
    }
  }
}
</script>