"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/providers/LanguageProvider";
import { useRouter } from "next/navigation";
import { Settings, Bell, Lock, FileText, Briefcase, Book, Grid, MonitorCog } from "lucide-react";
import { useState } from "react";

const settingsCards = [
  { name: "session", banglaName: "সেশন", icon: Bell, gradient: "bg-gradient-to-r from-blue-500 to-cyan-500", slug: "session" },
  { name: "department", banglaName: "বিভাগ", icon: MonitorCog, gradient: "bg-gradient-to-r from-pink-500 to-fuchsia-500", slug: "department" },
  { name: "subject", banglaName: "বিষয়", icon: Book, gradient: "bg-gradient-to-r from-green-500 to-emerald-500", slug: "subject" },
  { name: "examination", banglaName: "পরীক্ষা", icon: FileText, gradient: "bg-gradient-to-r from-yellow-500 to-amber-500", slug: "examination" },
  { name: "class", banglaName: "ক্লাস", icon: Briefcase, gradient: "bg-gradient-to-r from-red-500 to-rose-500", slug: "class" },
  { name: "grade", banglaName: "গ্রেড সিস্টেম", icon: Grid, gradient: "bg-gradient-to-r from-cyan-500 to-sky-500", slug: "grade" },
  // { name: "websiteSettings", banglaName: "বিষয়", icon: Book, gradient: "bg-gradient-to-r from-green-500 to-emerald-500", slug: "website-settings" },
];

export default function SettingsComponent() {
  const { t } = useLanguage();
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCardClick = (slug) => {
    router.push(`settings/${slug}`);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    // Reset fields after submission
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-6 w-full">
      <Tabs defaultValue="academic-settings">
        <TabsList className="flex flex-col sm:flex-row sm:mb-4 sm:mt-0 gap-4">
          <TabsTrigger value="academic-settings" className="text-[20px] sm:h-[40px]">{t('academicSettings')}</TabsTrigger>
          <TabsTrigger value="website" className="text-[20px] sm:h-[40px]">{t('websiteSettings')}</TabsTrigger>
          <TabsTrigger value="profileSettings" className="text-[20px] sm:h-[40px]">{t('profileSettings')}</TabsTrigger>
        </TabsList>

        <TabsContent value="academic-settings">
          {/* Responsive grid layout for academic settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 sm:mt-0">
            {settingsCards.map((card, index) => (
              <Card
                key={index}
                className={`${card.gradient} backdrop-blur-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}
                onClick={() => handleCardClick(card.slug)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-[15px]">{t(card.name)}</CardTitle>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  {/* <p className="text-white">{t(card.banglaName)}</p> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="website">
          <div className="grid grid-cols-4 gap-4">
            <Card
              className={`bg-gradient-to-r from-purple-500 to-indigo-500 backdrop-blur-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}
              onClick={() => handleCardClick("website-settings")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-[15px]">{t('websiteSettings')}</CardTitle>
                  <Settings className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                {/* <p className="text-white">{t('academicSettingsBangla')}</p> */}
              </CardContent>
            </Card>
            <Card
              className={`bg-gradient-to-r from-purple-500 to-black/20 backdrop-blur-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}
              onClick={() => handleCardClick("page-settings")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-[15px]">{t('pageSettings')}</CardTitle>
                  <Settings className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                {/* <p className="text-white">{t('academicSettingsBangla')}</p> */}
              </CardContent>
            </Card>

            {/* Domain Setting */}
            <Card
              className={`bg-gradient-to-r from-purple-500 to-black/20 backdrop-blur-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}
              onClick={() => handleCardClick("domain-settings")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-[15px]">{t('domainSettings')}</CardTitle>
                  <Settings className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                {/* <p className="text-white">{t('academicSettingsBangla')}</p> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profileSettings" className="w-1/2">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="old-password" className="block text-sm font-medium text-gray-700">Old Password</label>
              <input
                type="password"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button type="submit" className="mt-4 bg-[#08381a] hover:bg-[rgb(8, 56, 26 , 0.9)] text-white py-2 px-4 rounded">Submit</button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
