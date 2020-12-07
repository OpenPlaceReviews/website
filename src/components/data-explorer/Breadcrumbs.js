import React from 'react';
import {Breadcrumbs} from "@material-ui/core";
import {Link} from "react-router-dom";

export default ({crumbs}) => {
  return <Breadcrumbs>
    {(crumbs && crumbs.length) && crumbs.map((c) => <Link to={c.url}>{c.text}</Link>)}
  </Breadcrumbs>;
};
