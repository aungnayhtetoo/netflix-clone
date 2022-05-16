import { Button, Divider, Menu, MenuItem, Popper } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'

function AccountMenu() {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>()
  const { logout } = useAuth()
  const open = Boolean(anchorElement)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorElement(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        className="!capitalize !text-white !justify-end"
        onClick={handleClick}
      >
        <img
          // onClick={logout}
          src="https://rb.gy/g1pwyx"
          alt=""
          className="cursor-pointer rounded"
        />
      </Button>
      {/* <Popper
        open={open}
        anchorEl={anchorElement}
        role={undefined}
        placement="top-end"
        // popperOptions="top-end"
        transition
        disablePortal
      > */}
        <Menu
          id="basic-menu"
          anchorEl={anchorElement}
          open={open}
          onClose={handleClose}
          className="accountMenu"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link href="/account">Account</Link>{' '}
          </MenuItem>
          <Divider style={{ background: 'white' }} />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      {/* </Popper> */}
    </div>
  )
}

export default AccountMenu
