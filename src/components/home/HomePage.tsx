"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Globe,
  Shield,
  Award,
  Clock,
  Target,
  Briefcase,
  DollarSign,
  HeartHandshake,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { PricingCard } from "./PricingCard";
import { Testimonials } from "./Testimonials";
import { useRouter } from "next/navigation";
import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";

// The component is now self-contained and doesn't need props for navigation.
export default function HomePage() {
  const router = useRouter();

  const handleStartApplication = () => {
    // Use router.push for programmatic navigation
    router.push("/application");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      <main>
        <section className="pt-8 sm:pt-16 md:pt-24 pb-12 sm:pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
                Your Global Credentials,{" "}
                <span className="gradient-text">Recognized Everywhere</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto px-4">
                We help internationally trained professionals get their degrees,
                diplomas, and certificates evaluated for career advancement in
                the United States.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-blue-600 px-4">
                Here&#39;s what makes us unique:{" "}
                <strong>We don&#39;t just evaluate—we elevate.</strong>
              </p>

              <div className="max-w-4xl mx-auto  mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-left min-w-0">
                    <p className="font-medium text-blue-800 mb-1 text-sm sm:text-base">
                      Complete Evaluation Services
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                      We offer <strong>document-by-document evaluations</strong>{" "}
                      for employment opportunities and{" "}
                      <strong>course-by-course evaluations</strong> for
                      professional licensing and career advancement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col items-center justify-center space-y-2 sm:space-y-3 md:space-y-4 px-2 sm:px-4 md:px-6">
                <Link href="/application" passHref>
                  <div
                    className={cn(
                      "text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-6 py-4 sm:py-6 md:py-6",
                      "rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl",
                      "gradient-bg hover:opacity-90 hover-lift cursor-pointer",
                      "transition-all duration-300 shadow-lg",
                      "flex flex-col items-center justify-center gap-2 sm:gap-3",
                      "w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl",
                      "text-center"
                    )}
                  >
                    <span className="font-semibold leading-tight block text-white">
                      Transform Your International Credentials Into U.S. Career
                      Opportunities.
                    </span>
                    <span className="text-base opacity-90 hidden sm:block leading-relaxed text-gray-200">
                      Professional credential evaluation + Career pathway
                      roadmap in 5 business days or less
                    </span>
                  </div>
                </Link>
                <p className="text-xs sm:text-base text-gray-600 sm:hidden text-center px-2 leading-relaxed">
                  Professional credential evaluation + Career pathway roadmap in
                  5 business days or less
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-12 sm:py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 px-2">
                Strategic Credential Evaluation That Goes Beyond the Basics
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
                We believe credential evaluation should be the beginning of your
                American journey, not the end. Our thorough approach combines
                detailed credential evaluation with professional job search
                guidance—giving you the evaluated credentials and the career
                roadmap.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-12 sm:mb-16">
              {[
                {
                  icon: (
                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  ),
                  title: "5-Day Express Processing",
                  description: "Quick turnaround without compromising quality",
                },
                {
                  icon: (
                    <Target className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                  ),
                  title: "Multiple Evaluation Types",
                  description:
                    "Document-by-document and course-by-course options",
                },
                {
                  icon: (
                    <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  ),
                  title: "Education Transition Support",
                  description: "Professional guidance for all credential types",
                },
                {
                  icon: (
                    <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                  ),
                  title: "Transparent Pricing",
                  description: "No hidden fees or surprises",
                },
                {
                  icon: (
                    <HeartHandshake className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  ),
                  title: "Personal Success Coach",
                  description: "Dedicated support for your journey",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 sm:p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300"
                >
                  <div className="mb-3 sm:mb-4 inline-block p-2 sm:p-3 rounded-full bg-white shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold mb-2 text-xs sm:text-sm md:text-base leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Credential Evaluation",
                  description:
                    "Our certified evaluators carefully assess your academic documents to determine their U.S. equivalency for employment, and professional licensing purposes.",
                  icon: (
                    <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
                  ),
                  features: [
                    "Document authentication",
                    "Document-by-document evaluation",
                    "Course-by-course evaluation",
                    "GPA calculation",
                    "Degree equivalency",
                  ],
                },
                {
                  title: "Professional Career Mapping",
                  description:
                    "We analyze your background against current market trends and professional requirements to identify career opportunities in your field.",
                  icon: (
                    <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600" />
                  ),
                  features: [
                    "Professional opportunity guidance",
                    "Industry market analysis",
                    "Skills gap assessment",
                    "Career growth mapping",
                    "Personalized professional roadmap",
                  ],
                },
                {
                  title: "Success Guidance",
                  description:
                    "Receive detailed guidance to successfully launch your professional career in the U.S.",
                  icon: (
                    <Award className="h-8 w-8 sm:h-10 sm:w-10 text-amber-600" />
                  ),
                  features: [
                    "Professional transition planning",
                    "Career advancement planning",
                    "LinkedIn optimization",
                    "Interview preparation",
                    "Professional networking strategies",
                  ],
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover-lift card-shadow">
                    <CardContent className="p-4 sm:p-6 md:p-8">
                      <div className="mb-4 sm:mb-6">{service.icon}</div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-2 sm:space-y-3">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-start">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm sm:text-base">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="py-12 sm:py-16 md:py-24 px-4 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
                Simple, Transparent Pricing
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Choose the package that best fits your goals. Each option
                includes our thorough evaluation and education transition
                support.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <PricingCard
                title="Essential Document Evaluation"
                price={199}
                description="Perfect for employment and professional opportunities"
                color="blue"
                features={[
                  { text: "Document-by-document evaluation" },
                  { text: "U.S. career roadmap" },
                  { text: "LinkedIn profile optimization guide" },
                  { text: "Insights into U.S. workplace culture" },
                  { text: "Standard 7-10 business day delivery" },
                  { text: "30-minute career success consultation" },
                  { text: "Digital copy of evaluation" },
                  { text: "Job search resources toolkit" },
                ]}
              />
              <PricingCard
                title="Professional Plus (Course-By-Course)"
                price={249}
                description="Detailed credential analysis for professional licensing and career advancement"
                color="indigo"
                features={[
                  { text: "Course-by-course evaluation" },
                  { text: "Detailed academic analysis" },
                  { text: "Guidance to align with U.S. job market" },
                  { text: "5-7 business day delivery" },
                  { text: "Digital + hard copy reports" },
                  { text: "Career pathway overview" },
                  { text: "Professional licensing roadmap" },
                  { text: "Premium success resources toolkit" },
                ]}
              />
              <PricingCard
                title="Career Success Package"
                price={349}
                description="Complete course evaluation with extensive career support"
                color="amber"
                popular={true}
                features={[
                  { text: "Complete course-by-course evaluation" },
                  { text: "Career pathway roadmap" },
                  { text: "Industry-specific guidance" },
                  { text: "Job search strategy consultation" },
                  { text: "Resume optimization tips" },
                  { text: "Recommendations for in-demand certifications" },
                  { text: "3-5 business day delivery" },
                  { text: "3 professional network introductions" },
                  { text: "6-month email support access" },
                ]}
              />
              <PricingCard
                title="Premium Career Transition"
                price={499}
                description="Everything plus personalized coaching and premium support"
                color="purple"
                features={[
                  { text: "Everything in Career Success Package" },
                  { text: "1-on-1 career consultation (30 mins)" },
                  { text: "Personalized education transition plan" },
                  { text: "Industry networking guidance" },
                  { text: "Follow-up support (60 days)" },
                  {
                    text: "Help with interview prep, and job search strategies",
                  },
                  { text: "Rush delivery (1-2 business days)" },
                  { text: "Skills gap analysis & certificate recommendations" },
                  { text: "VIP document handling" },
                ]}
              />
            </div>
          </div>
        </section>

        <div className="flex justify-center mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-5 flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl">
            <span className="text-blue-900 font-medium text-base sm:text-lg text-center">
              Not sure what package is best for you?{" "}
            </span>
            <a
              href="/contact-us#contact-form"
              className="gradient-bg text-white font-semibold px-5 py-2 rounded-lg shadow hover:opacity-90 transition-all text-center sm:ml-4 mt-2 sm:mt-0"
            >
              Contact us here and we&apos;re happy to help.
            </a>
          </div>
        </div>

        <div id="testimonials" className="px-4">
          <Testimonials />
        </div>

        <section className="py-12 sm:py-16 md:py-32 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 md:p-12 text-white">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                      Ready to Advance Your Professional Career?
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      <p className="text-base sm:text-lg md:text-xl opacity-90">
                        Join hundreds of internationally trained professionals
                        who have successfully advanced their careers in the
                        United States.
                      </p>
                      <ul className="space-y-3 sm:space-y-4">
                        {[
                          "5-day evaluation turnaround",
                          "Multiple evaluation types available",
                          "Complete success support",
                          "Dedicated success coach",
                        ].map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center text-sm sm:text-base"
                          >
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-blue-200 flex-shrink-0" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 md:p-12 bg-white">
                    <div className="max-w-md">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
                        Begin Your Journey
                      </h4>
                      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                        Take the first step toward your American success. Our
                        team is ready to help you navigate this transition.
                      </p>
                      <div className="space-y-4 sm:space-y-6">
                        <Button
                          asChild
                          onClick={handleStartApplication}
                          className={cn(
                            "w-full py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-medium",
                            "gradient-bg hover:opacity-90",
                            "transition-all duration-300",
                            "rounded-lg shadow-lg",
                            "transform hover:scale-[1.02] active:scale-[0.98]",
                            "min-h-[44px] sm:min-h-[48px] md:min-h-[56px]"
                          )}
                        >
                          <p className="cursor-pointer">
                            Start Your Application
                          </p>
                        </Button>
                        <p className="text-xs sm:text-sm text-center text-gray-500">
                          Typical application time: 10-15 minutes
                        </p>
                        <p className="text-xs text-center text-gray-400 leading-relaxed">
                          By proceeding, you agree to our terms of service and
                          privacy policy
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
