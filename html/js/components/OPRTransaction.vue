<template>
    <div class="data_content">
        <div class="block_main_info">
            <ul>
                <li>Hash: <span>{{ tr_data.hash | only_hash_number}}</span></li>
                <li>Signed by: <span> {{ tr_data.signed_by }} </span></li>
                <li>Date: <span>{{ tr_data.eval.timestamp | date_to_utc_custom }}</span></li>
            </ul>
        </div>
        <div class="data_container">
            <div>
                <highlight-code lang="json">{{ tr_data }}</highlight-code>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OprTransaction',
  data: () => ({
    tr_data:[]
  }),
  props: ['url'],
  created() {
      axios.get(this.url)
          .then(response => {
              if(!response.data.error){
                  this.tr_data = response.data
              }
          })
  }
}
</script>