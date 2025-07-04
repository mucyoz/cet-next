import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Award,
  CheckCircle,
  FileCheck,
  // Globe,
  Users,
  // BookOpen,
  Search,
  Verified,
  Building,
  // GraduationCap,
  Mail,
  // Phone,
  ArrowRight,
} from "lucide-react";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";
import { useRouter } from "next/navigation";

export default function EmployersPage() {
  const router = useRouter();
  const handleStartApplication = () => {
    // Use router.push for programmatic navigation
    router.push("/application");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        {/* Header Section */}
        <section className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4 lg:space-y-6"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 px-2">
              For Organizations
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              Trusted credential evaluation services for HR professionals,
              staffing agencies, universities, and organizations hiring or
              admitting internationally trained professionals and students. Our
              evaluations meet industry standards and provide the reliability
              you need for confident decisions.
            </p>
          </motion.div>
        </section>

        {/* Trust & Credibility Statement */}
        <section className="mb-12 sm:mb-16 lg:mb-24">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 text-blue-600 mb-3 sm:mb-4 lg:mr-6 lg:mb-0 flex-shrink-0 lg:mt-1" />
                <div className="w-full min-w-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 text-blue-900">
                    Why Organizations Trust Our Evaluations
                  </h2>
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-blue-800">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                      When you receive a credential evaluation from the Center
                      for Education Transitions, you can be confident in its
                      accuracy and reliability. Our evaluations are conducted by
                      certified professionals using authoritative resources and
                      methodologies employed by leading credential evaluation
                      organizations worldwide.
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base leading-relaxed">
                      We understand that hiring and admission decisions require
                      precise, trustworthy information about candidates&#39;
                      educational backgrounds. Our comprehensive evaluation
                      process ensures you receive detailed, accurate assessments
                      that meet verification standards and support your
                      organization&#39;s decision-making confidence.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mt-3 sm:mt-4 lg:mt-6 xl:mt-8">
                      {[
                        {
                          icon: (
                            <Verified className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                          ),
                          text: "Industry-Standard Methodology",
                        },
                        {
                          icon: (
                            <Award className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                          ),
                          text: "Certified Evaluators",
                        },
                        {
                          icon: (
                            <Shield className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                          ),
                          text: "Accuracy Guarantee",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center bg-white p-2 sm:p-3 lg:p-4 rounded-lg"
                        >
                          <div className="text-blue-600 mr-2 sm:mr-3 flex-shrink-0">
                            {item.icon}
                          </div>
                          <span className="font-medium text-xs sm:text-sm lg:text-base leading-tight">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Our Evaluation Standards & Methodology */}
        <section className="mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-12 px-2">
            Our Evaluation Standards & Methodology
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Quality Assurance Framework */}
            <Card className="h-full">
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-indigo-600" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4">
                  Quality Assurance Framework
                </h3>
                <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                  {[
                    "Multi-level review process by certified evaluators",
                    "Cross-verification using multiple authoritative sources",
                    "Standardized evaluation criteria aligned with industry best practices",
                    "Regular quality audits and methodology updates",
                    "Compliance with employment and academic verification standards",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Research & Verification Process */}
            <Card className="h-full">
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <Search className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-blue-600" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4">
                  Research & Verification Process
                </h3>
                <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                  {[
                    "Institutional verification through official databases",
                    "Authentication of document legitimacy and format",
                    "Comparison against established educational frameworks",
                    "Grade point average calculations using verified scales",
                    "Detailed analysis of curriculum and credit systems",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documentation Standards */}
            <Card className="h-full">
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-green-600" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4">
                  Documentation Standards
                </h3>
                <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                  {[
                    "Clear, professional evaluation reports",
                    "Document-by-document and course-by-course analysis",
                    "Detailed explanations of educational systems",
                    "Standardized formatting for easy review",
                    "Digital security features for authenticity verification",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits for Organizations */}
        <section className="mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-12 px-2">
            Benefits for Organizations
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
                Why Choose Our Evaluation Services
              </h3>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {[
                  {
                    icon: (
                      <Building className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-blue-600" />
                    ),
                    title: "Streamlined Decision Process",
                    description:
                      "Clear, comprehensive reports that simplify candidate assessment and reduce time-to-decision for international applicants.",
                  },
                  {
                    icon: (
                      <Shield className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-green-600" />
                    ),
                    title: "Risk Mitigation",
                    description:
                      "Verified credentials reduce risks and ensure compliance with verification requirements for hiring and admissions.",
                  },
                  {
                    icon: (
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-indigo-600" />
                    ),
                    title: "Access to Global Talent",
                    description:
                      "Confidently evaluate international candidates and expand your talent pool with reliable credential assessments.",
                  },
                  {
                    icon: (
                      <Award className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-amber-600" />
                    ),
                    title: "Industry Recognition",
                    description:
                      "Our evaluations are widely accepted across industries and meet standard verification requirements.",
                  },
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start">
                    <div className="mr-2 sm:mr-3 lg:mr-4 mt-1 flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base lg:text-lg">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
                What You Receive
              </h3>
              <Card className="bg-gray-50">
                <CardContent className="p-4 sm:p-6">
                  <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {[
                      "Document-by-document or course-by-course analysis",
                      "U.S. educational equivalency determinations",
                      "GPA calculations on 4.0 scale",
                      "Detailed institutional verification",
                      "Professional formatting for organizational files",
                      "Digital delivery with security features",
                      "Expert support for questions or clarifications",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-xs sm:text-sm lg:text-base leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How to Verify Our Evaluations */}
        <section className="mb-12 sm:mb-16 lg:mb-24">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 text-green-900">
                How to Verify Our Evaluations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="text-green-800">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4">
                    Verification Process
                  </h3>
                  <ol className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                    <li className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                        1
                      </span>
                      <span className="text-xs sm:text-sm lg:text-base leading-relaxed">
                        Each evaluation includes a unique verification code
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                        2
                      </span>
                      <span className="text-xs sm:text-sm lg:text-base leading-relaxed">
                        Contact our verification department with the code
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                        3
                      </span>
                      <span className="text-xs sm:text-sm lg:text-base leading-relaxed">
                        Receive immediate confirmation of authenticity
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                        4
                      </span>
                      <span className="text-xs sm:text-sm lg:text-base leading-relaxed">
                        Access additional details if needed for your records
                      </span>
                    </li>
                  </ol>
                </div>
                <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900">
                    Verification Contact
                  </h3>
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {/* <div className="flex items-center">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm lg:text-base">
                          Verification Hotline
                        </p>
                        <p className="text-green-600 text-xs sm:text-sm lg:text-base break-all">
                          1-800-VERIFY-1 (1-800-837-4391)
                        </p>
                      </div>
                    </div> */}
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm lg:text-base">
                          Email Verification
                        </p>
                        <p className="text-green-600 text-xs sm:text-sm lg:text-base break-all">
                          support@eductransitions.com
                        </p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3 lg:mt-4">
                      Available Monday-Friday, 9 AM - 6 PM EST
                      <br />
                      Average verification time: Under 30 minutes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Partner with Us CTA */}
        <section className="text-center">
          <Card className="border-2 border-blue-200 bg-white shadow-lg">
            <CardContent className="p-4 sm:p-6 lg:p-8 xl:p-12">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900 px-2">
                Partner with Trusted Credential Evaluation
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto px-2">
                Join hundreds of organizations who trust our evaluations for
                their international hiring and admission needs. Experience the
                confidence that comes with industry-standard credential
                assessment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                {[
                  { number: "8,000+", label: "Evaluations Completed" },
                  { number: "750+", label: "Organization Partners" },
                  { number: "99.8%", label: "Accuracy Rate" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-2 sm:p-3 lg:p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div className="flex justify-center">
                  <Button
                    onClick={handleStartApplication}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base lg:text-lg px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto max-w-sm min-h-[44px] sm:min-h-[48px]"
                  >
                    <span className="block sm:hidden">Request Evaluation</span>
                    <span className="hidden sm:block">
                      Request Evaluation for Your Candidate
                    </span>
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  </Button>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 px-2">
                  Questions about our services? Contact our organization
                  relations team at{" "}
                  <span className="text-blue-600 font-medium break-all">
                    support@educationtransitions.com
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
