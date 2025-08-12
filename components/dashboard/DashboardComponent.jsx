"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { School, DollarSign, Wallet, User } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import useDemo from "@/hooks/QueryHooks/useDemo";
import { signIn, useSession } from "next-auth/react";

const statsCards = [
  {
    name: "totalStudents",
    value: "2,345",
    icon: School,
    color: "bg-purple-500/80",
  },
  {
    name: "totalCollection",
    value: "৳ 34,590",
    icon: DollarSign,
    color: "bg-blue-500/80",
  },
  {
    name: "totalExpenditure",
    value: "৳ 125",
    icon: Wallet,
    color: "bg-green-500/80",
  },
  {
    name: "totalTeachers",
    value: "24",
    icon: User,
    color: "bg-yellow-500/80",
  },
];

export default function DashboardComponent() {
  const { t } = useLanguage();
  // const { user } = useAuth();
  const [currentTimeStr, setCurrentTimeStr] = useState("");
  const [greeting, setGreeting] = useState("");
    const { data: session, status } = useSession();
const{data} = useDemo()

  // State for prayer times
  const [prayerTimes, setPrayerTimes] = useState({});
 useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) signIn(); // Redirect to login if no session
  }, [session, status]);
  useEffect(() => {
    // Set current time
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));

      // Set greeting based on time of day
      const hours = now.getHours();
      if (hours < 12) {
        setGreeting("Good morning");
      } else if (hours < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Fetch prayer times
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch("https://api.aladhan.com/v1/timings?latitude=23.7483066&longitude=90.4323979&method=1");
        const data = await response.json();
        setPrayerTimes(data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, []);

  // Function to format time to 12-hour format
  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  if (status === "loading") {
    return <div>Loading...</div>; // Or a spinner
  }
console.log(data,'testing')
  if (!session) {
    return null; // Or you can return a fallback UI here
  }
  return (
    <div className="min-h-screen py-0">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Welcome section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {greeting}, {session?.name || "Admin"}
          </h2>
          <p className="text-text-muted">
            It&apos;s {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })} | {currentTimeStr}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((card, index) => (
            <StatsCard
              key={index}
              title={t(card.name)}
              value={card.value}
              icon={card.icon}
              color={card.color}
            />
          ))}
        </div>

        {/* Prayer Times Section */}
        {/* <div className="mt-8">
          <h2 className="text-2xl font-bold">Prayer Times</h2>
          <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {prayerTimes && Object.entries(prayerTimes).map(([prayer, time]) => (
              <Card key={prayer} className={`card-background bg-opacity-80 shadow-md`}>
                <CardContent className="p-4">
                  <CardHeader>
                    <CardTitle>{prayer}</CardTitle>
                  </CardHeader>
                  <CardDescription className="pl-5 text-white">{formatTime(time)}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

const StatsCard = ({ title, value, icon, color }) => {
  const Icon = icon;

  return (
    <Card className={`${color} backdrop-blur-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white">{title}</p>
            <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
          </div>
          <div className="rounded-lg bg-white/20 p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
