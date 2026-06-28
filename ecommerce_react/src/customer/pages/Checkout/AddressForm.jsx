import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function AddressForm({ handleClose }) {
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Address Object:", address);

    // Example:
    // dispatch(createOrder({ address, jwt, paymentGateway }));

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-xl p-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Address
          </h2>

          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              "&:hover": {
                backgroundColor: "#fee2e2",
                color: "#dc2626",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Contact Details */}
        <div className="space-y-5">
          <h3 className="font-medium text-gray-700">Contact Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              required
              type="tel"
              name="mobile"
              value={address.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <h3 className="font-medium text-gray-700">Address</h3>

          <input
            required
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            required
            type="text"
            name="address"
            value={address.address}
            onChange={handleChange}
            placeholder="House No., Building Name, Street"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            required
            type="text"
            name="locality"
            value={address.locality}
            onChange={handleChange}
            placeholder="Locality / Area / Town"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              required
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Save Address
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddressForm;