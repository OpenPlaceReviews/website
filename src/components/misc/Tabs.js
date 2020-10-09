import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

const Tabs = (props) => {
  const children = props.children;
  const [activeTab, changeTab] = useState(0);

  return (
    <div>
      <ul className="container_flex tabs">
        {children.map((child, index) => {
          const { "data-label": label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={index}
              index={index}
              label={label}
              changeTab={changeTab}
            />
          );
        })}
      </ul>

      <div className="tab_items">
        {
          children.map((child, index) => {
            let className = "tab_item";
            if (activeTab === index) {
              className += " active";
            }
            return <div className={className} key={index}>{child.props.children}</div>;
          })
        }
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Tabs;
