import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({activeTab, label, changeTab, index}) => {
  let className = 'tab';
  if (activeTab === index) {
    className += ' active';
  }

  const onClick = (e) => {
    e.preventDefault();

    if (activeTab === index) return;
    changeTab(index);
  };

  return (
    <li className={className}>
      <a href="#" onClick={onClick}>{label}</a>
    </li>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
};

export default Tab;
