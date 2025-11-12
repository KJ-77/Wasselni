import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RatingsGiven from "./ratingsGiven";
import RatingsReceived from "./ratingsReceived";

const Ratings = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Ratings</h1>
      <Tabs defaultValue="ratings-given">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ratings-given">Ratings Given</TabsTrigger>
          <TabsTrigger value="ratings-received">Ratings Received</TabsTrigger>
        </TabsList>
        <TabsContent value="ratings-given">
          <RatingsGiven />
        </TabsContent>
        <TabsContent value="ratings-received">
          <RatingsReceived />
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default Ratings;