import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 6,
          textAlign: "center",
          p: 3,
        }}
      >
        <CardContent>
          <CheckCircleRoundedIcon
            sx={{
              fontSize: 90,
              color: "success.main",
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Order Placed Successfully!
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Thank you for shopping with us.
            <br />
            Your order has been confirmed.
          </Typography>

          <Box
            sx={{
              bgcolor: "#F8FAFC",
              borderRadius: 3,
              p: 3,
              textAlign: "left",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              mb={2}
            >
              <ShoppingBagRoundedIcon color="primary" />
              <Typography fontWeight={600}>
                Payment Method
              </Typography>
            </Box>

            <Typography color="text.secondary" mb={3}>
              Cash on Delivery (COD)
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              gap={2}
            >
              <LocalShippingRoundedIcon color="primary" />
              <Typography fontWeight={600}>
                Estimated Delivery
              </Typography>
            </Box>

            <Typography color="text.secondary">
              3 - 5 Business Days
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: 16,
            }}
            onClick={() => navigate("/account/orders")}
          >
            View My Orders
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
            }}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default OrderSuccess;