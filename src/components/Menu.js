import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleNav, closeNav } from '../actions/appActions';

import './Menu.css';

const getNavClass = (state) => {
  return state ? 'sidenav open' : 'sidenav';
};

const getIconClass = (state) => {
  return state ? 'mySidenav-icon change' : 'mySidenav-icon';
};

function Menu(props) {
  const { open, onToggleNav, onCloseNav } = props;
  return (
    <div>
      <div id="mySidenav" className={getNavClass(open)}>
        <Link onClick={onCloseNav} to="/">
          Home
        </Link>
        <Link onClick={onCloseNav} to="/map/">
          Map
        </Link>
        <Link onClick={onCloseNav} to="/data/">
          Data
        </Link>
      </div>
      <div
        className={getIconClass(open)}
        onClick={onToggleNav}
        onKeyDown={onToggleNav}
        role="button"
        tabIndex="0"
      >
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    open: state.app.open
  };
};

export default connect(
  mapStateToProps,
  {
    onToggleNav: toggleNav,
    onCloseNav: closeNav
  }
)(Menu);

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggleNav: PropTypes.func.isRequired,
  onCloseNav: PropTypes.func.isRequired
};
