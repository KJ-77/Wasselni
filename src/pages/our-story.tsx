
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Rocket, Users } from "lucide-react";

const OurStory = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="text-center py-20 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary dark:text-primary-foreground">
            Our Story
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            From a simple idea to a thriving community, this is the story of Wasselni.
          </p>
        </div>
      </div>

      {/* The Beginning */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
              <Rocket className="mr-3 text-primary" />
              The Spark of an Idea
            </h2>
            <p className="mb-4 text-lg leading-relaxed">
              Wasselni was born out of a common frustration: the daily commute. High transportation costs, traffic congestion, and the environmental impact of single-occupancy vehicles led our founders to imagine a better way. 
            </p>
            <p className="text-lg leading-relaxed">
              They envisioned a platform where people could easily share rides, save money, reduce their carbon footprint, and connect with their community. The goal was to transform the daily commute from a solitary chore into a shared, more enjoyable experience.
            </p>
          </div>
          <div>
            <img 
              src="/src/assets/logo/wasselni_logo.png" 
              alt="Wasselni garage" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center justify-center">
            <Building className="mr-3 text-primary" />
            Our Mission
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            To create a smarter, more connected, and sustainable transportation network for everyone. We believe that by sharing rides, we can build stronger communities, reduce traffic, and protect our planet.
          </p>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100 flex items-center justify-center">
          <Users className="mr-3 text-primary" />
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          <Card className="text-center bg-transparent shadow-none border-0">
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>RN</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">Rami Nasr</h3>
              <p className="text-primary">Co-Founder & CEO</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Product lead and designer focused on user experience and community growth.</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-transparent shadow-none border-0">
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>KJ</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">Kahlil Al Jamil</h3>
              <p className="text-primary">Co-Founder & CEO</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Engineering and architecture lead, responsible for platform reliability and integrations.</p>
            </CardContent>
          </Card>
         
        </div>
      </div>
      
      {/* Developer Credits */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <Card className="bg-transparent shadow-none border-0">
          <CardContent className="text-center text-sm text-gray-700 dark:text-gray-300">
            <p className="font-medium">Built and maintained by</p>
            <p className="mt-2">Rami Nasr — Product & Design · Kahlil Al Jamil — Engineering</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OurStory;
