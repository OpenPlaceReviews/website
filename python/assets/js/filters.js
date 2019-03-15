export default {
    slice_hash: function(str, first=60, last=72) {
      return str.slice(60, 72)
    },
    date_to_locale_string: function (datetime) {
      datetime = new Date(datetime)
      return datetime.toLocaleString()
    },
    replace_all: function (str, search, replace) {
        return str.split(search).join(replace);
    }
}
