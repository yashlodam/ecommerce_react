import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function AddressForm({ handleClose }) {
  return (
    <form action="">
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
            '&:hover': {
              backgroundColor: '#fee2e2',
              color: '#dc2626',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>

      {/* Contact Details */}
      <div className="space-y-5">

        <h3 className="font-medium text-gray-700">
          Contact Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
           required
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
          required
            type="tel"
            placeholder="Mobile Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Address Section */}
        <h3 className="font-medium text-gray-700">
          Address
        </h3>

        <input
        required
          type="text"
          placeholder="Pincode"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
        required
          type="text"
          placeholder="House No., Building Name, Street"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
        required
          type="text"
          placeholder="Locality / Area / Town"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
          required
            type="text"
            placeholder="City"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
          required
            type="text"
            placeholder="State"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleClose}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 cursor-pointer py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
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