import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import PropTypes from 'prop-types';

const AppSidebar = ({
  options = []
}) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/" style={{ overflowX: 'none' }}>
        <div className='row'>
          <div className='col-md-12'>
            <small>SISB ADMINISTRACIÓN</small>
            <h1>SANA BELLEZA</h1>
          </div>
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={options} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}
AppSidebar.propTypes = {
  options: PropTypes.array,
};
export default React.memo(AppSidebar)
