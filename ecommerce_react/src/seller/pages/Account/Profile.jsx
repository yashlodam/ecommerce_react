import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

function Profile() {
  const seller = {
    sellerName: "Raam Virani",
    email: "RaamVirani@gmail.com",
    mobile: "9876567843",

    businessName: "Virani Clothing",
    gstin: "GSTIN3447633",
    accountStatus: "PENDING",

    accountHolderName: "Raam Virani",
    accountNumber: "67893447633",
    ifscCode: "YES834",

    address: "Mumbai new shivam building",
    city: "Mumbai",
    state: "Maharastra",
    mobileNumber: "8976542931",
  };

  const SectionCard = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow-sm border mb-6">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>

        <IconButton
          sx={{
            backgroundColor: "#009688",
            color: "white",
            "&:hover": {
              backgroundColor: "#00796b",
            },
          }}
        >
          <EditIcon />
        </IconButton>
      </div>

      <div className="border-t">{children}</div>
    </div>
  );

  const Row = ({ label, value }) => (
    <div className="grid grid-cols-3 border-b last:border-b-0">
      <div className="p-4 text-gray-600 font-medium bg-gray-50">
        {label}
      </div>

      <div className="col-span-2 p-4 font-semibold text-gray-800">
        {value}
      </div>
    </div>
  );

  return (
    <div className="p-5 lg:p-10 bg-gray-100 min-h-screen">
      {/* Personal Details */}
      <SectionCard title="Personal Details">
        <div className="p-6 flex justify-center lg:justify-start">
          <img
            src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300"
            alt="seller"
            className="w-28 h-28 rounded-full object-cover border"
          />
        </div>

        <Row label="Seller Name" value={seller.sellerName} />
        <Row label="Seller Email" value={seller.email} />
        <Row label="Seller Mobile" value={seller.mobile} />
      </SectionCard>

      {/* Business Details */}
      <SectionCard title="Business Details">
        <Row
          label="Business Name/Brand Name"
          value={seller.businessName}
        />
        <Row label="GSTIN" value={seller.gstin} />
        <Row label="Account Status" value={seller.accountStatus} />
      </SectionCard>

      {/* Bank Details */}
      <SectionCard title="Bank Details">
        <Row
          label="Account Holder Name"
          value={seller.accountHolderName}
        />
        <Row label="Account Number" value={seller.accountNumber} />
        <Row label="IFSC CODE" value={seller.ifscCode} />
      </SectionCard>

      {/* Pickup Address */}
      <SectionCard title="Pickup Address">
        <Row label="Address" value={seller.address} />
        <Row label="City" value={seller.city} />
        <Row label="State" value={seller.state} />
        <Row label="Mobile" value={seller.mobileNumber} />
      </SectionCard>
    </div>
  );
}

export default Profile;