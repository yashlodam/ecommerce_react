import Radio from "@mui/material/Radio";
import PhoneIcon from "@mui/icons-material/Phone";

function AddressCard({ item, selectedAddress, setSelectedAddress }) {
  return (
    <div
      onClick={() => setSelectedAddress(item)}
      className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <Radio
          checked={selectedAddress?.id === item.id}
          onChange={() => setSelectedAddress(item)}
        />

        <h2 className="font-semibold text-gray-900 text-lg">
          {item.name}
        </h2>
      </div>

      <div className="mt-4 pl-12 space-y-3">
        <p className="text-gray-600 leading-relaxed">
          {item.address}, {item.locality}
          <br />
          {item.city}, {item.state} - {item.pinCode}
        </p>

        <div className="flex items-center gap-2 text-gray-700">
          <PhoneIcon sx={{ fontSize: 18 }} />
          <p>
            <span className="font-medium">Mobile:</span> {item.mobile}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;