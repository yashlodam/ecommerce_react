import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { store, useAppDispatch, useAppSelector } from "../../../State/Store"
import { useEffect } from 'react';
import { fetchSellerOrders } from '../../../State/seller/sellerOrderSlice';

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

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function OrderTable() {

  const dispatch = useAppDispatch();
  const {sellerOrder} = useAppSelector(store=>store)

  useEffect(()=>{
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""))
  },[])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell align="right">Shipping Address</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrder.orders?.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell >
                <div className='flex gap-1 flex-wrap'>
                  {
                    item.orderItems.map((orderItem)=> <div className='flex gap-5 '>
                      <img className='w-20 rounded-md' src={orderItem.product.images[0]} alt="" />
                      <div className='flex flex-col justify-between py-2'>
                        <h1>Title: {orderItem.product.title}</h1>
                        <h1>Selling Price: {orderItem.product.sellingPrice}</h1>
                        <h1>Color: {orderItem.product.color}</h1>
                      </div>
                    </div>)
                  }
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <div className='flex flex-col gap-y-2'>
                  <h1>{item.shippingAddress.name}</h1>
                  <h1>{item.shippingAddress.address},{item.shippingAddress.pinCode}</h1>
                  <h1>{item.shippingAddress.state} - {item.shippingAddress.pinCode}</h1>
                  <h1><strong>Mobile:</strong>{item.shippingAddress.mobile}</h1>
                </div>
              </StyledTableCell>
              {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}