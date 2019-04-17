export default {
    slice_hash: function(str, first=0, last=12) {
      return str.split(':').reverse()[0].slice(first, last)
    },
    only_hash_number: function(str) {
        return str.split(':').reverse()[0]
    },
    date_to_locale_string: function (datetime) {
      datetime = new Date(datetime);
      return datetime.toLocaleString()
    },
    replace_all: function (str, search, replace) {
        return str.split(search).join(replace);
    },
    join_list:  function (list_str, symbol) {
        return list_str.join(symbol);
    },
    default_value: function (str, value) {
        if(!str) return value
        return str
    },
    capitalize_first_letter: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
}
