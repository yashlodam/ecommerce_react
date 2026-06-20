import Radio from '@mui/material/Radio';
import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';

function AddressCard() {
  const handleChange = () => {};

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">

      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Radio
            checked={true}
            onChange={handleChange}
            value=""
            name="radio-button"
          />

          <div>
            <h2 className="font-semibold text-gray-900 text-lg">
              Zosh
            </h2>

           
          </div>
        </div>
      </div>

      <div className="mt-4 pl-12 space-y-3">

        <p className="text-gray-600 leading-relaxed">
          Ambavadi Chowk, Bangalore,
          Bangalore, Karnataka - 530068
        </p>

        <div className="flex items-center gap-2 text-gray-700">
          <PhoneIcon sx={{ fontSize: 18 }} />
          <p>
            <span className="font-medium">Mobile:</span> 9665774324
          </p>
        </div>

      </div>

    </div>
  );
}

export default AddressCard;