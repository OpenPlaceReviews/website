function two_digit(val) {
   return (val < 10 ? '0' : '') + val;
}
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
    date_to_utc_string: function(datetime){
        datetime = new Date(datetime);
        return datetime.toUTCString();
    },
    date_to_utc_custom: function (datetime) {

        var datetime = new Date(datetime);
        var mm = two_digit(datetime.getUTCMonth());
        var dd = two_digit(datetime.getUTCDay());
        var hh = two_digit(datetime.getUTCHours());
        var MM = two_digit(datetime.getUTCMinutes());
        var ss = two_digit(datetime.getUTCSeconds());

      var str_date = datetime.getUTCFullYear() + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss + ' UTC';
      return str_date;
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
