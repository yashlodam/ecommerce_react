import React from "react";
import { Button } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useNavigate } from "react-router-dom";
import UserAddressCard from "./UserAddressCard";

function Address() {
  const navigate = useNavigate();

  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "Yash Lodam",
      phone: "+91 9876543210",
      address: "Flat No. 101, MG Road",
      city: "Nashik",
      state: "Maharashtra",
      pincode: "422001",
      default: true,
    },
    {
      id: 2,
      type: "Office",
      name: "Yash Lodam",
      phone: "+91 9876543210",
      address: "IT Park, Nashik Road",
      city: "Nashik",
      state: "Maharashtra",
      pincode: "422002",
      default: false,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Addresses
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your delivery addresses.
          </p>
        </div>

        <Button
          onClick={() => navigate("/account/add-address")}
          variant="contained"
          startIcon={<AddLocationAltIcon />}
          sx={{
            textTransform: "none",
            bgcolor: "#0f766e",
          }}
        >
          Add New Address
        </Button>
      </div>

      {/* Address Cards */}
      <div className="space-y-5">
        {addresses.map((address) => (
          <UserAddressCard
            key={address.id}
            address={address}
          />
        ))}
      </div>
    </div>
  );
}

export default Address;