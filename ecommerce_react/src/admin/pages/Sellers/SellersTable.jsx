import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { store, useAppSelector } from '../../../State/Store';
import { Menu,Fade } from '@mui/material';

const accountS = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Account is awaiting verification."
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Account is active and can access all features."
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "Account is temporarily suspended due to policy violations or review."
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description: "Account has been deactivated by the user or administrator."
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Account has been permanently banned from the platform."
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Account has been permanently closed and can no longer be used."
  }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



function SellersTable() {

  const [accountStatus, setAccountStatus] = useState("ACTIVE")

  const { sellers, loading, error } = useAppSelector((store) => store.adminFetch);

  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, orderId) => {
    setAnchorEl((prev) => ({
      ...prev,
      [orderId]: event.currentTarget,
    }));
  };


  const handleChange = (e) => {
    setAccountStatus(e.target.value)
  }

  const handleClose = (orderId) => {
    setAnchorEl((prev) => ({
      ...prev,
      [orderId]: null,
    }));
  };

  const handleStatusChange = (orderId, status) => {
    dispatch(
      updateOrderStatus({
        jwt: localStorage.getItem("jwt"),
        orderId,
        orderStatus: status,
      })
    );

    handleClose(orderId);
  };



  return (
    <>
      <div className='pb-5 w-60'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountStatus}
            label="Account Status"
            onChange={handleChange}
          >
            {accountS.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">GSTIN</StyledTableCell>
              <StyledTableCell align="right">Bussiness Name</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {item.sellerName}
                </StyledTableCell>
                <StyledTableCell >{item.email}</StyledTableCell>
                <StyledTableCell align="right">{item.mobile}</StyledTableCell>
                <StyledTableCell align="right">{item.GSTIN}</StyledTableCell>
                <StyledTableCell align="right">{item.businesssDetails?.businessName}</StyledTableCell>
                <StyledTableCell align="right">{item.accountStatus}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={(e) =>
                      handleClick(e, item.id)
                    }
                  >
                    Status
                  </Button>

                  <Menu
                    anchorEl={anchorEl[item.id]}
                    open={Boolean(anchorEl[item.id])}
                    onClose={() => handleClose(item.id)}
                    TransitionComponent={Fade}
                  >
                    <MenuItem
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          "PENDING_VERIFICATION"
                        )
                      }
                    >
                      Pending Verification
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          "ACTIVE"
                        )
                      }
                    >
                      Active
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          "CONFIRMED"
                        )
                      }
                    >
                      Confirmed
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          "SHIPPED"
                        )
                      }
                    >
                      Shipped
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          "DELIVERED"
                        )
                      }
                    >
                      Delivered
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          "CANCELLED"
                        )
                      }
                      sx={{
                        color: "red",
                      }}
                    >
                      Cancelled
                    </MenuItem>
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SellersTable