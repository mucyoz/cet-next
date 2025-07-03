import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  // Clock,
  // DollarSign,
  CheckCircle,
  ArrowRight,
  FileCheck,
  Globe,
  Shield,
  // AlertTriangle,
  Briefcase,
  // GraduationCap,
  // Users,
  Target,
  BookOpen,
} from "lucide-react";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();
  const handleStartApplication = () => {
    // Use router.push for programmatic navigation
    router.push("/application");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        <section className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4 lg:space-y-6"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 px-2">
              Complete Education Transition Solutions
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              The thorough credential evaluation service that combines your
              international credentials with an actionable American career
              success strategy. Get your evaluation PLUS a Career pathway
              roadmap in 5 business days or less.
            </p>

            {/* Service Options Notice */}
            <div className="max-w-4xl mx-auto mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg mx-4">
              <div className="flex items-start">
                <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-left min-w-0">
                  <p className="font-medium text-blue-800 mb-1 text-sm sm:text-base">
                    Complete Evaluation Services
                  </p>
                  <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                    We offer <strong>document-by-document evaluations</strong>{" "}
                    for employment, immigration, and community college
                    admission, and <strong>course-by-course evaluations</strong>{" "}
                    for university admissions, professional licensing, and
                    transfer credit. All evaluations include detailed education
                    transition support.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-24">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 px-2">
              Our New 4-Tier Pricing Structure
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Choose from four carefully designed packages that combine
              credential evaluation with education transition support. Each tier
              builds upon the previous one to provide exactly what you need for
              your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {[
              {
                tier: "Tier 1",
                title: "Essential Document Evaluation",
                price: "$149",
                time: "7-10 business days",
                description:
                  "Perfect for employment, immigration, and community college admission",
                color: "blue",
                features: [
                  "Document-by-document evaluation",
                  "U.S. career roadmap",
                  "LinkedIn profile optimization guide",
                  "Insights into U.S. workplace culture and hiring practices",
                  "30-minute career success consultation",
                  "Digital copy of evaluation",
                  "Job search resources toolkit",
                ],
              },
              {
                tier: "Tier 2",
                title: "Professional Plus (Course-By-Course)",
                price: "$229",
                time: "5-7 business days",
                description:
                  "Detailed academic analysis for university admissions and licensing",
                color: "indigo",
                features: [
                  "Course-by-course evaluation",
                  "Detailed academic analysis",
                  "Guidance to align your skills & experience with U.S. job market demands",
                  "Digital + hard copy reports",
                  "Career pathway overview",
                  "Professional licensing roadmap",
                  "Premium success resources toolkit",
                ],
              },
              {
                tier: "Tier 3",
                title: "Career Success Package",
                price: "$349",
                time: "3-5 business days",
                description:
                  "Complete course evaluation with extensive career support",
                color: "amber",
                popular: true,
                features: [
                  "Complete course-by-course evaluation",
                  "Career pathway roadmap",
                  "Industry-specific guidance",
                  "Job search strategy consultation",
                  "Resume optimization tips",
                  "Recommendations for in-demand certifications",
                  "3 professional network introductions",
                  "6-month email support access",
                ],
              },
              {
                tier: "Tier 4",
                title: "Premium Career Transition",
                price: "$499",
                time: "1-2 business days",
                description:
                  "Everything plus personalized coaching and premium support",
                color: "purple",
                features: [
                  "Everything in Career Success Package",
                  "1-on-1 career consultation (30 minutes)",
                  "Personalized education transition plan",
                  "Industry networking guidance",
                  "Follow-up support (60 days)",
                  "Help with interview prep, and job search strategies",
                  "Skills gap analysis & certificate recommendations",
                  "VIP document handling",
                ],
              },
            ].map((pkg, i) => {
              const colorClasses = {
                blue: "border-blue-200 bg-blue-50",
                indigo: "border-indigo-200 bg-indigo-50",
                amber: "border-amber-200 bg-amber-50",
                purple: "border-purple-200 bg-purple-50",
              };

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 sm:-top-3 right-2 sm:right-4 bg-amber-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full z-10">
                      MOST POPULAR
                    </div>
                  )}
                  <Card
                    className={`h-full border-2 ${
                      colorClasses[pkg.color as keyof typeof colorClasses]
                    } hover:shadow-lg transition-all duration-300`}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center mb-4 sm:mb-6">
                        <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
                          {pkg.tier}
                        </div>
                        <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2 leading-tight">
                          {pkg.title}
                        </h3>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                          {pkg.price}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                          {pkg.time}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      <ul className="space-y-1.5 sm:space-y-2">
                        {pkg.features.map((feature, j) => (
                          <li
                            key={j}
                            className="flex items-start text-xs sm:text-sm"
                          >
                            <CheckCircle
                              className={`h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5 text-${pkg.color}-500`}
                            />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-24">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 px-2">
              Why Our Thorough Approach Benefits You
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              At the Center for Education Transitions, we believe credential
              evaluation should be the beginning of your American journey, not
              the end. Our detailed approach combines thorough credential
              evaluation with professional job search guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-green-800 mb-3 sm:mb-4 flex items-center">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 flex-shrink-0" />
                  ✅ Perfect For All Your Needs:
                </h3>
                <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                  {[
                    "Employment verification and job applications",
                    "Immigration documentation (USCIS requirements)",
                    "University and college admissions (all levels)",
                    "Professional licensing and certification",
                    "Transfer credit evaluation",
                    "Workforce development programs",
                    "Career and academic advancement",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-600 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-green-800 text-xs sm:text-sm lg:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 flex-shrink-0" />
                  🎯 Two Evaluation Types Available:
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">
                      Document-by-Document Evaluation
                    </h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-blue-700">
                      <li>• Best for employment and immigration</li>
                      <li>• Community college admission</li>
                      <li>• General credential verification</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">
                      Course-by-Course Evaluation
                    </h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-blue-700">
                      <li>• University admissions (all levels)</li>
                      <li>• Professional licensing</li>
                      <li>• Transfer credit evaluation</li>
                      <li>• Detailed academic analysis</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-12 px-2">
            What You Receive (Full-Service Support Beyond Evaluation)
          </h2>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                step: "1",
                title: "Credential Evaluation",
                description:
                  "Our certified evaluators carefully assess your academic documents to determine their U.S. equivalency for all purposes.",
                icon: (
                  <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600" />
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
                step: "2",
                title: "Opportunity Mapping",
                description:
                  "We analyze your background against current academic and market trends to identify opportunities in your field.",
                icon: (
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-indigo-600" />
                ),
                features: [
                  "University admission guidance",
                  "Industry market analysis",
                  "Skills gap assessment",
                  "Growth opportunity mapping",
                  "Personalized roadmap",
                ],
              },
              {
                step: "3",
                title: "Success Guidance",
                description:
                  "Receive extensive guidance to successfully activate your academic or professional goals in the U.S.",
                icon: (
                  <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600" />
                ),
                features: [
                  "Academic transition planning",
                  "Career transition planning",
                  "LinkedIn optimization",
                  "Interview preparation",
                  "Networking strategies",
                ],
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="absolute -top-2 sm:-top-3 lg:-top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                      {step.step}
                    </div>
                    <div className="mt-3 sm:mt-4 mb-3 sm:mb-4 flex justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      {step.features.map((feature, j) => (
                        <li
                          key={j}
                          className="flex items-center justify-center"
                        >
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0" />
                          <span className="text-gray-600 leading-relaxed">
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
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-12 px-2">
            Expertise Across All Fields
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: (
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600" />
                ),
                title: "Healthcare",
                description:
                  "Academic evaluation, employment verification, and licensing guidance for all healthcare fields.",
                examples: [
                  "Nursing",
                  "Medical Technology",
                  "Healthcare Administration",
                  "Allied Health",
                  "Medicine",
                  "Pharmacy",
                ],
              },
              {
                icon: (
                  <Globe className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-indigo-600" />
                ),
                title: "Engineering",
                description:
                  "Academic and professional evaluation, relevant certifications, and industry networking.",
                examples: [
                  "Civil Engineering",
                  "Software Engineering",
                  "Mechanical Engineering",
                  "Electrical Engineering",
                  "Chemical Engineering",
                  "Aerospace",
                ],
              },
              {
                icon: (
                  <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600" />
                ),
                title: "Business & Finance",
                description:
                  "Academic and corporate evaluation, professional development, and advancement strategies.",
                examples: [
                  "Finance",
                  "Marketing",
                  "Management",
                  "Accounting",
                  "Economics",
                  "International Business",
                ],
              },
              {
                icon: (
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-indigo-600" />
                ),
                title: "Education & Liberal Arts",
                description:
                  "Academic evaluation, teaching certification guidance, and career pathway development.",
                examples: [
                  "Education",
                  "Psychology",
                  "Literature",
                  "History",
                  "Social Sciences",
                  "Communications",
                ],
              },
            ].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="mb-3 sm:mb-4">{industry.icon}</div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4">
                      {industry.title}
                    </h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base leading-relaxed">
                      {industry.description}
                    </p>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Common fields:
                      </p>
                      <ul className="text-xs sm:text-sm text-gray-600">
                        {industry.examples.map((example, j) => (
                          <li key={j} className="flex items-center">
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <Card className="border-2 gradient-border">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 px-2">
                Ready to Transform Your International Credentials Into American
                Success?
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base px-2">
                The thorough credential evaluation service that combines your
                international credentials with an actionable American career
                success strategy.
              </p>
              <Button
                onClick={handleStartApplication}
                className="gradient-bg hover:opacity-90 text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 w-full sm:w-auto min-h-[44px] sm:min-h-[48px]"
              >
                Start Your Evaluation
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
