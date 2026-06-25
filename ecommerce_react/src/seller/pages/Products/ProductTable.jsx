import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { store, useAppDispatch, useAppSelector } from '../../../State/Store';
import { useEffect } from 'react';
import { fetchSellerProduct } from '../../../State/seller/sellerProductSlice';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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



export default function ProductTable() {

  const dispatch = useAppDispatch();
  const {sellerProduct} = useAppSelector(store=>store)

  useEffect(()=>{
    dispatch(fetchSellerProduct(localStorage.getItem("jwt")))
  },[])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Images</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">MRP</StyledTableCell>
            <StyledTableCell align="right">Selling Price</StyledTableCell>
             <StyledTableCell align="right">Color</StyledTableCell>
              <StyledTableCell align="right">Update Stock</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerProduct.products?.map((items) => (
            <StyledTableRow key={items.id}>
              <StyledTableCell component="th" scope="row">
                <div className='flex gap-1 flex-wrap'>
                  {items.images.map((image)=> <img className='w-20 rounded-md' alt='' src={image}/>)}
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">{items.title}</StyledTableCell>
              <StyledTableCell align="right">{items.mrpPrice}</StyledTableCell>
              <StyledTableCell align="right">{items.sellingPrice}</StyledTableCell>
              <StyledTableCell align="right">{items.color}</StyledTableCell>
              <StyledTableCell align="right">
                {
                  <Button size='small'>
                    in_stock
                  </Button>
                }
              </StyledTableCell>
              <StyledTableCell align="right">{
                <IconButton color='primary' size='small'>
                  <Button size='small'>
                    <EditIcon/>
                  </Button>
                </IconButton>
                  }</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}