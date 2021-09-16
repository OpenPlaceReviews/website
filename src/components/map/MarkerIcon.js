import L from "leaflet";

import shadowIcon from '../../assets/images/map_icons/poi_shield_map.svg';
import shadowDeletedOsmIcon from '../../assets/images/map_icons/poi_yellow_shield_map.svg';
import shadowEditedOsmIcon from '../../assets/images/map_icons/poi_green_shield_map.svg';
import shadowDeletedIcon from '../../assets/images/map_icons/poi_deleted_shield_map.svg';
import defaultIcon from '../../assets/images/map_icons/default-marker.svg';
import apartment from '../../assets/images/map_icons/apartment.svg';
import bar from '../../assets/images/map_icons/bar.svg';
import biergarten from '../../assets/images/map_icons/biergarten.svg';
import cafe from '../../assets/images/map_icons/cafe.svg';
import fast_food from '../../assets/images/map_icons/fast_food.svg';
import food_court from '../../assets/images/map_icons/food_court.svg';
import guest_house from '../../assets/images/map_icons/guest_house.svg';
import hostel from '../../assets/images/map_icons/hostel.svg';
import hotel from '../../assets/images/map_icons/hotel.svg';
import ice_cream from '../../assets/images/map_icons/ice_cream.svg';
import motel from '../../assets/images/map_icons/motel.svg';
import pub from '../../assets/images/map_icons/pub.svg';
import restaurant from '../../assets/images/map_icons/restaurant.svg';

const icons = {
  apartment,
  bar,
  biergarten,
  cafe,
  fast_food,
  food_court,
  guest_house,
  hostel,
  hotel,
  ice_cream,
  motel,
  pub,
  restaurant,
}

export default (place_type, color, place_deleted, place_deleted_osm, deleted, alreadyReviewed) => {
  const iconUrl = icons[place_type] || defaultIcon;
  let iconShadow;
  if (place_deleted) {
    iconShadow = shadowDeletedIcon;
  } else if (place_deleted_osm || (!alreadyReviewed && deleted)) {
    iconShadow = shadowDeletedOsmIcon;
  } else if (color === "green") {
    iconShadow = shadowEditedOsmIcon;
  } else iconShadow = shadowIcon;

  return new L.Icon({
    iconUrl,
    shadowUrl: iconShadow,
    iconSize: [20, 20],
    shadowSize: [30, 30]
  })
}
