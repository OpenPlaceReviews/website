<template>
  <div id="app">
    <h1>Blocks</h1>
    <opr-blocks url="http://127.0.0.1:6463/api/blocks"></opr-blocks>
  </div>
</template>

<script>

import OprBlocks from '../../components/OPRBlocks.vue'

export default {
  name: 'Blocks',
  components: {OprBlocks}
}
</script>
