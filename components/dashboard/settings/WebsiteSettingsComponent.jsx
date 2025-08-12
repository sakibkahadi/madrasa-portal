"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigLeft } from "lucide-react";

const WebsiteSettingsComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    webAddress: "",
    email: "",
    phone: "",
    logo: null,
    favicon: null,
    address: "",
    mapLocation: "",
  });

  const router = useRouter(); // Initialize useRouter to navigate

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [field]: file });
  };

  const handleRemoveFile = (field) => {
    setFormData({ ...formData, [field]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="p-5">
      <div className="flex gap-x-4">
        <div>
          <p
            className="cursor-pointer text-accent flex items-center gap-x-2 bg-gray-200 rounded-full"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBigLeft size={40} />
          </p>
        </div>
        <div className="text-[24px] font-[700] ">Site Settings</div>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700 mb-2">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* <div>
            <label htmlFor="webAddress" className="block font-medium text-gray-700 mb-2">
              Web Address
            </label>
            <Input
              id="webAddress"
              name="webAddress"
              value={formData.webAddress}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div> */}
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium text-gray-700 mb-2">
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="logo" className="block font-medium text-gray-700 mb-2">
              Upload Logo
            </label>
            <Input
              id="logo"
              name="logo"
              type="file"
              onChange={(e) => handleFileChange(e, 'logo')}
              className="border border-gray-300 rounded-md p-2"
            />
            {formData.logo && (
              <div className="flex items-center mt-2">
                <img src={URL.createObjectURL(formData.logo)} alt="Logo Preview" className="h-16 w-16 object-cover mr-2" />
                <Button onClick={() => handleRemoveFile('logo')} className="bg-red-500 text-white hover:bg-red-700">
                  Remove
                </Button>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="favicon" className="block font-medium text-gray-700 mb-2">
              Upload Favicon
            </label>
            <Input
              id="favicon"
              name="favicon"
              type="file"
              onChange={(e) => handleFileChange(e, 'favicon')}
              className="border border-gray-300 rounded-md p-2"
            />
            {formData.favicon && (
              <div className="flex items-center mt-2">
                <img src={URL.createObjectURL(formData.favicon)} alt="Favicon Preview" className="h-16 w-16 object-cover mr-2" />
                <Button onClick={() => handleRemoveFile('favicon')} className="text-red-500">
                  Remove
                </Button>
              </div>
            )}
          </div>
          {/* Other input fields remain unchanged */}
          <div>
            <label htmlFor="address" className="block font-medium text-gray-700 mb-2">
              Address
            </label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="mapLocation" className="block font-medium text-gray-700 mb-2">
              Map Location
            </label>
            <Textarea
              id="mapLocation"
              name="mapLocation"
              value={formData.mapLocation}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="mt-4 text-right flex space-x-4">
          {/* Update Button */}
          <Button type="submit" className="bg-[#08381a] hover:bg-[rgb(8, 56, 26 , 0.9)]">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WebsiteSettingsComponent;
