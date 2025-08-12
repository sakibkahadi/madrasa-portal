"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/providers/LanguageProvider";
import { useRouter } from "next/navigation";
import { Book, FileText, TicketCheck, UserPlus } from "lucide-react";

const teachersCards = [
  { 
    name: "teachersList", 
    banglaName: "শিক্ষক", 
    icon: UserPlus, 
    gradient: "bg-gradient-to-r from-blue-500 to-green-500", 
    slug: "teachers-list" 
  },
  // Add more cards here if needed
   { name: "teachersAttendance", banglaName: "শিক্ষার্থীদের ", icon: FileText, gradient: "bg-gradient-to-r from-yellow-500 to-amber-500", slug: "teachers-attendance" },
    { name: "teachersLeave", banglaName: "শিক্ষার্থীদের ", icon: Book, gradient: "bg-gradient-to-r from-purple-500 to-amber-500", slug: "teachers-leave" },
    { name: "salary", banglaName: "শিক্ষার্থীদের ", icon: TicketCheck, gradient: "bg-gradient-to-r from-green-500 to-amber-500", slug: "teachers-salary" },
];

export default function TeachersComponent() {
  const { t } = useLanguage();
  const router = useRouter();

  const handleCardClick = (slug) => {
    router.push(`teachers/${slug}`);
  };

  return (
    <div className="space-y-6 w-full">
      <Tabs>
        <TabsContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 sm:mt-0">
            {teachersCards.map((card, index) => (
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
      </Tabs>
    </div>
  );
}
