"use client";

import React from "react";
import { Footer } from "../shared/Footer";
import { Card, CardContent } from "../ui/card";
import { CheckCircle2, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "../shared/Header";
import ContactForm from "./ContactForm";

const ContactUsPage = () => {
  return (
    <div className=" min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        <section className="flex flex-col items-start mb-8 sm:mb-12 lg:mb-16">
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
        </section>
        <section className="mb-12 sm:mb-16 lg:mb-24">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 text-gray-100">
            <Card className="border-2 gradient-border">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="mb-4 sm:mb-6">
                  <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6 text-gray-50">
                  Our Complete Guarantee
                </h2>
                <h3 className="text-sm sm:text-base lg:text-lg font-medium mb-3 sm:mb-4 text-gray-300">
                  Evaluation + Success Assurance
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-300">
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
                  Contact Form
                </h2>
                <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8">
                  Fill out the form below and we’ll get back to you soon.
                </p>
                <ContactForm />
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
