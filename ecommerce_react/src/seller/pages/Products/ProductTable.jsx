import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerProduct } from "../../../State/seller/sellerProductSlice";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductTable() {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector(
    (store) => store.sellerProduct
  );

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      dispatch(fetchSellerProduct(jwt));
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">MRP</StyledTableCell>
            <StyledTableCell align="right">Selling Price</StyledTableCell>
            <StyledTableCell align="right">Color</StyledTableCell>
            <StyledTableCell align="right">Stock</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell>
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    width={70}
                    height={70}
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                  />
                </StyledTableCell>

                <StyledTableCell align="right">
                  {product.title}
                </StyledTableCell>

                <StyledTableCell align="right">
                  ₹{product.mrpPrice}
                </StyledTableCell>

                <StyledTableCell align="right">
                  ₹{product.sellingPrice}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {product.color}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {product.quantity}
                </StyledTableCell>

                <StyledTableCell align="right">
                  Update
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={7} align="center">
                No Products Found
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}