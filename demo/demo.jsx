import React from 'react';
import Component from '../src/index';

var config = {
  user: 'LingyuCoder'
};

React.render(
  <Component {...config}/>,
  document.getElementById('demo')
);
