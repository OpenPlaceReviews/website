<template>
    <li class="font_weight_normal item_block">
        <a v-bind:href="blocks_page_url + block_hash" class="first_level_menu">
            <div class="icon_block"></div>
            <span class="unselect">Block #{{ block.block_id }}</span>
        </a>
    </li>
</template>

<script>
export default {
  name: 'OprRightMenuItemBlock',
    data: () => ({
  }),
  props: ['block', 'blocks_page_url', 'block_hash'],
}
</script>