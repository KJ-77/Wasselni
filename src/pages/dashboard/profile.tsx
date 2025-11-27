import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
// import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfileDashboard() {
  const [tab, setTab] = useState("about");
  const [user, setUser] = useState<ApiUser | null>(null);
  // const { id } = useParams<{ id: string }>();

  interface ApiUser {
    id: string;
    name: string;
    email: string;
    full_name: string;
    // Add other user fields as necessary
  }

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(
        `https://rl4ynabhzk.execute-api.me-central-1.amazonaws.com/users/3`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiUser = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  console.log("Fetched user:", user);

  return (
    <div className="max-w-5xl mx-auto mt-12 min-h-screen px-4">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        {/* Tabs Header */}
        <div className="border-b border-gray-200 mb-8 flex justify-center pt-8">
          <TabsList className="flex gap-6 bg-transparent shadow-none">
            <TabsTrigger
              value="about"
              className={`relative px-6 py-3 text-lg font-medium transition ${
                tab === "about"
                  ? "text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              About you
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className={`relative px-6 py-3 text-lg font-medium transition ${
                tab === "account"
                  ? "text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              Account
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {tab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <TabsContent value="about">
                <Card className="shadow-md">
                  <CardHeader>
    <CardTitle>
      <div className="flex items-center justify-start w-full h-20 space-x-4">
        {/* Avatar/Profile Picture */}
        

        {/* Button with user info inside */}
        <Button
          variant="outline"
          className="flex items-center justify-between w-full h-20 px-6"
        >
            <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/avatars/rami.jpg" alt="Profile Picture" />
            <AvatarFallback>Rami</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold">{user?.full_name}</span>
            <Badge variant="secondary" className="mt-1">
              New
            </Badge>
          </div>
        </div>
        </Button>
      </div>
    </CardTitle>
                    
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Add profile picture
                    </Button>

                    <div>
                      <div className="flex items-center justify-center mb-4 border-b border-gray-200"> 
                         <h3 className="font-semibold mb-2">Verify your profile</h3>
                      </div>
                     
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start">
                          Verify ID
                        </Button>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">rami55education@gmail.com</p>
                          <Badge variant="outline">Verified</Badge>
                        </div>
                        <Button variant="ghost" className="w-full justify-start">
                          Confirm phone number
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-center mb-4 border-b border-gray-200"> 
                      <h3 className="font-semibold mb-2">About you</h3>
                      </div>
                      <Button variant="ghost" className="w-full justify-start">
                        Add a mini bio
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Edit travel preferences
                      </Button>
                    </div>

                    <div>
                      <div className="flex items-center justify-center mb-4  border-b border-gray-200"> 
                      <h3 className="font-semibold mb-2">Vehicles</h3>
                      </div>
                      <Button variant="ghost" className="w-full justify-start">
                        Add vehicle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          )}

          {tab === "account" && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <TabsContent value="account">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <p className="text-gray-500 text-sm">
                      Manage your preferences and privacy
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Ratings",
                      "Saved passengers",
                      "Communication preferences",
                      "Password",
                      "Postal address",
                      "Payout methods",
                      "Transfers",
                      "Payment methods",
                      "Payments & refunds",
                      "Data protection",
                    ].map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        {item}
                      </Button>
                    ))}

                    <div className="pt-4 border-t border-gray-200">
                      <Button variant="destructive" className="w-full">
                        Log out
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full text-red-500 hover:text-red-600"
                      >
                        Close my account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
