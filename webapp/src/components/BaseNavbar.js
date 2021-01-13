import React from 'react'
import PropTypes from 'prop-types'

export function BaseNavbar (props) {
  return (
    <nav className='navbar' role='navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='https://getdivvy.com'>
          <img alt='divvy logo' src='https://getdivvy.com/wp-content/uploads/2019/05/Divvy-Logo-19.png' />
        </a>
      </div>

      <div className='navbar-menu' >
        <div className='navbar-start'>
          <a className='navbar-item' href='/'>Home</a>
          <a className='navbar-item' href='/another'>another route</a>
        </div>
      </div>
      <div className='navbar-end'>
        <div className='navbar-item'>
          <div className='field is-grouped'>
            <p className='control'>
              <button className='bd-tw-button button button is-primary' onClick={props.showModal} >
                <span>Create Transaction</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}

BaseNavbar.propTypes = {
  showModal: PropTypes.func
}

export default BaseNavbar
