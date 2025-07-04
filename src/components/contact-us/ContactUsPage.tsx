"use client";

import React from "react";
import { Footer } from "../shared/Footer";
import { Card, CardContent } from "../ui/card";
import {
  CheckCircle2,
  Mail,
  MessageCircle,
  PhoneCall,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "../shared/Header";

const ContactUsPage = () => {
  return (
    <div className=" min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        <section className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 px-2">
            Contact Us
            <span className="block text-sm sm:text-base md:text-lg lg:text-2xl text-gray-600 mt-2">
              Contact us and we will reach out to you soon{" "}
            </span>
          </h1>
        </section>
        <section className="mb-12 sm:mb-16 lg:mb-24">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <Card className="border-2 gradient-border">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="mb-4 sm:mb-6">
                  <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
                  Our Complete Guarantee
                </h2>
                <h3 className="text-sm sm:text-base lg:text-lg font-medium mb-3 sm:mb-4">
                  Evaluation + Success Assurance
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "100% accuracy guarantee on all evaluations",
                    "Accepted by employers and universities nationwide",
                    "Immigration-compliant reporting",
                    "Success roadmap satisfaction guarantee",
                    "Free revision if evaluation is rejected due to our error",
                    "Secure document handling and storage",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm lg:text-base leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
                  Customer Support
                </h2>
                <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8">
                  Questions? We&#39;re Here to Help
                </p>

                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {/* <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-xs sm:text-sm lg:text-base">
                        Phone Support
                      </p>
                      <p className="text-blue-600 text-xs sm:text-sm lg:text-base break-all">
                        1-800-EVAL-123 (1-800-382-5123)
                      </p>
                    </div>
                  </div> */}

                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-xs sm:text-sm lg:text-base">
                        Email Support
                      </p>
                      <p className="text-blue-600 text-xs sm:text-sm lg:text-base break-all">
                        support@eductransitions.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 mt-1">
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-xs sm:text-sm lg:text-base">
                        Live Chat
                      </p>
                      <p className="text-xs sm:text-sm lg:text-base">
                        Available 9 AM - 6 PM EST, Monday-Friday
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Average Response Time: Under 1 hour
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
