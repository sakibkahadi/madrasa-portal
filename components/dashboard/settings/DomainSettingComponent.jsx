"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigLeft } from "lucide-react";
import { protocol, rootDomain } from "@/lib/utils";

const DomainSettingComponent = () => {
    const [tenant, setTenant] = useState({})
  const [formData, setFormData] = useState({
    name: "",
   
    email: "",
    phone: "",
    
  });

  const router = useRouter(); // Initialize useRouter to navigate

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    localStorage.setItem("domain", JSON.stringify(formData));
  };
const data = JSON.parse(localStorage.getItem("domain"));
useEffect(()=>{
  setTenant(JSON.parse(localStorage.getItem("domain")) || {});
  
},[])
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
        <div className="text-[24px] font-[700] ">Domain Settings</div>
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
        
        </div>

        <div className="mt-4 text-right flex space-x-4">
          {/* Update Button */}
          <Button type="submit" className="bg-[#08381a] hover:bg-[rgb(8, 56, 26 , 0.9)]">
            Update
          </Button>
          <p>{tenant?.name}</p>
   
              <Button
                className="bg-[#08381a] hover:bg-[rgb(8, 56, 26 , 0.9)]"
                onClick={() => {
                  router.push(`${protocol}://sakib.${rootDomain}`)
                }}
              >
           view link
              </Button>
            
   
          
        </div>
      </form>
    </div>
  );
};

export default DomainSettingComponent;
