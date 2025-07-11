import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  //  AvatarImage
} from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "The Center for Education Transitions made my professional transition to the US seamless. Their course-by-course evaluation was accepted for my professional licensing, and their career guidance was invaluable.",
    author: "Sophia Chen",
    role: "Healthcare Professional",
    country: "Taiwan",
    avatar: "SC",
  },
  {
    text: "After struggling with credential recognition for months, I found CET. Within weeks, I had my evaluation and was able to apply for my nursing license and advance my career.",
    author: "Miguel Rodriguez",
    role: "Nursing Professional",
    country: "Mexico",
    avatar: "MR",
  },
  {
    text: "The Executive package was perfect for my needs. The coaching sessions helped me understand U.S. business culture and position myself effectively for career advancement.",
    author: "Anya Petrova",
    role: "Marketing Director",
    country: "Russia",
    avatar: "AP",
  },
];

export function Testimonials() {
  return (
    <section className="py-12 bg-blue-50 rounded-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <Quote className="text-blue-800 w-48 h-48 absolute -top-10 -left-10" />
        <Quote className="text-blue-800 w-48 h-48 absolute bottom-0 right-0 transform rotate-180" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-serif text-center mb-12 text-gray-900">
          What Our Clients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <Quote className="h-8 w-8 text-blue-400 mb-2" />
                  <p className="text-gray-700 italic">
                    &#34;{testimonial.text}&#34;
                  </p>

                  <div className="flex items-center pt-4">
                    <Avatar className="h-12 w-12 border-2 border-blue-100">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role} • {testimonial.country}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
