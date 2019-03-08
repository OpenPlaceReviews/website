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
      value: this.get_items()
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
    },
    get_items (){
      var items = []
      for (var i=0; i < this.options.length; i++){
        if (this.defaultValueSelect.indexOf(this.options[i].name) != -1){
          items.push(this.options[i])
        }
      }
      return items;
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
      default(){
        return 'search-select'
      }
    },
    defaultValueSelect: {
      type: Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.multiselect__option{
  color: #2D69E0;
}
.multiselect__input, .multiselect__single {
    position: relative;
    display: inline-block;
    min-height: 20px;
    line-height: 20px;
    border: none;
    border-radius: 5px;
    background: #fff;
    padding: 0 0 0 5px;
    width: 100%;
    transition: border .1s ease;
    box-sizing: border-box;
    margin-bottom: 8px;
    vertical-align: top;
    letter-spacing: 0.02em;
}
.multiselect__placeholder {
    color: #adadad;
    display: inline-block;
    margin-bottom: 0;
    padding-top: 2px;
    padding-left: 5px;
    font-size: 16px;
    line-height: 20px;
}
.multiselect__input, .multiselect__single{
  display: block;
  padding-top: 2px;
}
.multiselect__option--selected.multiselect__option--highlight {
    background: #2D69E0;
    color: #fff;
}
.multiselect__option--highlight {
    background: #F1F4FC;
    outline: none;
    color: #140579;
    font-weight: bold;
}
.multiselect__option--highlight:after{
    background: #F1F4FC;
    outline: none;
    color: #2D69E0;
    font-weight: bold;
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