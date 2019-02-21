<!-- Vue component -->
<template>
  <div>
    <multiselect v-model="value" :options="options" :multiple="multiple" :custom-label="nameWith" placeholder="Select one" label="name" track-by="name"></multiselect>
    <input type="hidden" v-for="item in get_value()" :name="name_field" :value="item">
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'SelectSearch',
  components: {
    Multiselect
  },
  data () {
    return {
      value: [],
      name_field: 'test'
    }
  },
  methods: {
    nameWith ({ name, value }) {
      return `${value}`
    },
    get_value () {
      if (Array.isArray(this.value) == true){
        var name_list = []
        var arrayLength = this.value.length;
        for (var i = 0; i < arrayLength; i++){
            name_list.push(this.value[i].name)
        }
        return name_list
      }
      return [this.value.name]
    }
  },
  props: {
    options: {
      type: Array,
      default() {
        return [
          {name: 'eng', value: 'English'},
        ];
      },
    },
    multiple: {
      type: Boolean,
      default(){
        return false
      }
    },
    name_field: {
      type: String,
      defautl(){
        return 'search-select'
      }
    }
  }

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.multiselect__option--selected.multiselect__option--highlight {
    background: #2D69E0;
    color: #fff;
}
.multiselect__option--highlight {
    background: #F1F4FC;
    outline: none;
    color: #2D69E0;
}
.multiselect__option--highlight:after{
    background: #F1F4FC;
    outline: none;
    color: #2D69E0;
}
.multiselect__tag {
    position: relative;
    display: inline-block;
    padding: 4px 26px 4px 10px;
    border-radius: 5px;
    margin-right: 10px;
    line-height: 1;
    background: #2D69E0;
    color: #fff;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
}
.multiselect__tag-icon:after {
    content: "\D7";
    background: #2D69E0;
    font-size: 14px;
    color: #140579;
}
.multiselect__tag-icon:hover {
    background: #2D69E0;
}
</style>