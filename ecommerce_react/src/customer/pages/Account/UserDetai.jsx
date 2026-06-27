import React from "react";
import {
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { useAppSelector } from "../../../State/Store";

function UserDetai() {

  const {user} = useAppSelector(store=>store.auth);

  const firstName = user?.fullName?.split(" ")[0] || "";
const lastName = user?.fullName?.split(" ").slice(1).join(" ") || "";

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Profile
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your personal information and account preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Top Banner */}
        <div className="h-32 bg-gradient-to-r from-teal-600 to-cyan-500" />

        {/* Avatar Section */}
        <div className="px-8 pb-8">
          <div className="-mt-14 flex flex-col md:flex-row md:items-end gap-5">
            <Avatar
  sx={{
    width: 110,
    height: 110,
    fontSize: 40,
    border: "4px solid white",
    bgcolor: "#14b8a6",
    fontWeight: "bold",
  }}
>
  {user?.fullName?.charAt(0).toUpperCase() || "U"}
</Avatar>

          <div className="flex-1">
  <h2 className="text-2xl font-bold text-gray-900">
    {user?.fullName || "User"}
  </h2>

  <p className="text-gray-500">
    {user?.email}
  </p>
</div>

            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                bgcolor: "#0f766e",
              }}
            >
              Update Profile
            </Button>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <TextField
  fullWidth
  label="First Name"
  value={firstName}
  InputProps={{ readOnly: true }}
/>

<TextField
  fullWidth
  label="Last Name"
  value={lastName}
  InputProps={{ readOnly: true }}
/>

            <TextField
  fullWidth
  label="Email Address"
  value={user?.email || ""}
  InputProps={{ readOnly: true }}
/>
            <TextField
  fullWidth
  label="Phone Number"
  value={user?.mobile || ""}
  InputProps={{ readOnly: true }}
/>
            <TextField
              fullWidth
              label="Username"
              defaultValue="yashlodam"
            />

            <TextField
              fullWidth
              label="Gender"
              defaultValue="Male"
            />
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default UserDetai;