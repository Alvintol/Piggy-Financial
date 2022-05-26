import React from 'react';
import '../../sass/botNav.scss';

const BotNav = props => {

  const {
    changeTab,
    vacationMode
  } = props;

  const changesTab = (tab) => {
    changeTab(tab)
  }

  return (
    <nav className="gradient-custom-4 bot-nav navbar navbar-expand-lg navbar-light fixed-bottom">
      <div className="container-fluid">
        <div className="navbar-collapse row d-flex justify-content-around" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-5 mb-lg-0 d-flex justify-content-around">
            <li
              className="h-100 w-100 nav-item nav-button"
              onClick={() =>
                changesTab('PROFILE')}>
              <h2 className="nav-link" >Profile</h2>
            </li>
            {!vacationMode &&
              <li
                className="h-100 w-100 nav-item nav-button"
                onClick={() =>
                  changesTab('SAVINGS')}>
                <h2 className="nav-link" >Savings</h2>
              </li>
            }
            {vacationMode &&
              <li
                className="h-100 w-100 nav-item nav-button"
                onClick={() =>
                  changesTab('VACATION')}>
                <h2 className="nav-link" >Budget</h2>
              </li>
            }
            <li
              className="h-100 w-100 nav-item nav-button"
              onClick={() =>
                changesTab('EXPENSES')}>
              <h2 className="nav-link" >Expenses</h2>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default BotNav;