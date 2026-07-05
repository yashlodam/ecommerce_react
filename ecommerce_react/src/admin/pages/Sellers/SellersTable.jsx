import React, { useEffect, useState } from 'react'
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
import { store, useAppDispatch, useAppSelector } from '../../../State/Store';
import { Menu,Fade } from '@mui/material';
import { fetchAllSellers, updateSellerAccountStatus } from '../../../State/admin/adminFetchSlice';

const accountS = [
  {
    status: "ALL",
    title: "All Sellers",
  },
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
  },
  {
    status: "ACTIVE",
    title: "Active",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
  },
  {
    status: "BANNED",
    title: "Banned",
  },
  {
    status: "CLOSED",
    title: "Closed",
  },
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

  
      const dispatch = useAppDispatch();
  
      useEffect(()=>{
          dispatch(fetchAllSellers(localStorage.getItem("jwt") || ""));
      },[dispatch])

  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, id) => {
    setAnchorEl((prev) => ({
      ...prev,
      [id]: event.currentTarget,
    }));
  };


  const handleChange = (e) => {
    setAccountStatus(e.target.value)
  }

  const handleClose = (id) => {
    setAnchorEl((prev) => ({
      ...prev,
      [id]: null,
    }));
  };

  const handleStatusChange = (id, status) => {
    dispatch(
      updateSellerAccountStatus({
        jwt: localStorage.getItem("jwt"),
        id,
        status,
      })
    );

    handleClose(id);
  };

   const filteredSellers =
  accountStatus === "ALL"
    ? sellers
    : sellers.filter(
        (seller) => seller.accountStatus === accountStatus
      );


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
            {filteredSellers.map((item, index) => (
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
                          "SUSPENDED"
                        )
                      }
                    >
                      Suspended
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          "DEACTIVATED"
                        )
                      }
                    >
                      Deactivated
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          "BANNNED"
                        )
                      }
                    >
                      Banned
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                        handleStatusChange(
                          item.id,
                          "CLOSED"
                        )
                      }
                      sx={{
                        color: "red",
                      }}
                    >
                      Closed
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