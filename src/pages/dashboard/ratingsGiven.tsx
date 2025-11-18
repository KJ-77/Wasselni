import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

const ratings = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
    },
    rating: 4,
    comment: "Great passenger, very friendly and respectful.",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
    rating: 5,
    comment: "Excellent driver, smooth ride and good conversation.",
  },
];

const RatingsGiven = () => {
  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <Card key={rating.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={rating.user.avatar} />
                <AvatarFallback>{rating.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{rating.user.name}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < rating.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{rating.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
export default RatingsGiven;
