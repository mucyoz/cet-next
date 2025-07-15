"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Header } from "../shared/Header";
import { ContactForm } from "./ContactForm";
import { Footer } from "../shared/Footer";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        {/* <section className="flex flex-col items-start mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center w-full">
            <span className="hidden sm:inline-block h-8 w-1.5 rounded-full bg-blue-600 mr-3"></span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 px-2 text-blue-600 relative">
              Contact Us
              <span className="block text-sm sm:text-base md:text-lg lg:text-2xl text-gray-600 mt-2 font-normal">
                Contact us and we will reach out to you soon
              </span>
              <span className="absolute left-0 -bottom-2 w-12 h-1.5 rounded-full bg-blue-200 sm:w-16 lg:w-24"></span>
            </h1>
          </div>
        </section> */}

        <section className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4 lg:space-y-6"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 px-2">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              Contact us and we will reach out to you soon
            </p>
          </motion.div>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-24">
          <div className="grid md:grid-cols-5 gap-0 max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Left Side - Connect Section with Blue Theme */}
            <div className="md:col-span-2 gradient-border bg-gradient-to-br from-blue-600 to-blue-700 p-8 lg:p-12 text-white flex flex-col justify-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Connect with Our Team
              </h2>

              <p className="text-lg lg:text-xl mb-8 text-blue-100 leading-relaxed">
                Our experts regularly serve as trusted advisors for credential
                evaluation needs. Whether you&#39;ve got a specific requirement
                or just want to learn more about our comprehensive evaluation
                services, reach out to our team.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-blue-100">
                  <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0 text-green-400" />
                  <span>Expert guidance on evaluation requirements</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0 text-green-400" />
                  <span>Personalized service recommendations</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0 text-green-400" />
                  <span>Quick response and support</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:col-span-3 p-8 lg:p-12 bg-gray-50">
              <div className="mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Send us a Note
                </h3>
                <p className="text-gray-600 text-lg">
                  We will route your note to the right person, and get back to
                  you shortly.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
