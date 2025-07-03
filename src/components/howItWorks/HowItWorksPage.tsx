import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Upload,
  FileCheck,
  Package,
  CheckCircle2,
  PhoneCall,
  Mail,
  MessageCircle,
  Shield,
  Award,
  AlertTriangle,
  // Target,
  // Briefcase,
  // BookOpen,
} from "lucide-react";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";
import { useRouter } from "next/navigation";

export default function HowItWorksPage() {
  const router = useRouter();
  const handleStartApplication = () => {
    // Use router.push for programmatic navigation
    router.push("/application");
  };
  return (
    <div className=" min-h-screen bg-gradient-to-b from-white to-gray-50">
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
              How Our Complete Process Works
              <span className="block text-sm sm:text-base md:text-lg lg:text-2xl text-gray-600 mt-2">
                Evaluation + Education Transition Support
              </span>
            </h1>

            {/* Service Notice */}
            <div className="max-w-4xl mx-auto mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg mx-4">
              <div className="flex items-start">
                <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-left min-w-0">
                  <p className="font-medium text-blue-800 mb-1 text-sm sm:text-base">
                    Complete Education Transition Service
                  </p>
                  <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                    Our service combines credential evaluation with education
                    transition support for employment, immigration, university
                    admissions, professional licensing, and all credential
                    evaluation needs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                step: 1,
                title: "Submit Application",
                time: "10-15 minutes",
                description:
                  "Complete our detailed application including personal information, education history, and goals.",
                icon: (
                  <Package className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600" />
                ),
              },
              {
                step: 2,
                title: "Upload Documents",
                time: "15 minutes",
                description:
                  "Securely upload your educational documents. We accept diplomas, transcripts, and certificates from institutions worldwide.",
                icon: (
                  <Upload className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-indigo-600" />
                ),
              },
              {
                step: 3,
                title: "Expert Evaluation + Success Analysis",
                time: "2-5 business days",
                description:
                  "Our certified evaluators assess your credentials while our success specialists analyze your background and opportunities.",
                icon: (
                  <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600" />
                ),
              },
              {
                step: 4,
                title: "Receive Complete Package",
                time: "Digital delivery",
                description:
                  "Get your credential evaluation report plus personalized success roadmap, optimization guides, and field-specific guidance.",
                icon: (
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-indigo-600" />
                ),
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        {step.icon}
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                        <span className="whitespace-nowrap">{step.time}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mr-2">
                          {step.step}
                        </span>
                        <h3 className="text-sm sm:text-base lg:text-xl font-bold leading-tight">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-24">
          <Card className="border-2">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 px-2">
                Required Documents
              </h2>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4">
                    Essential Documents
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Official transcripts from all educational institutions",
                      "Degree certificates, diplomas, or completion certificates",
                      "Government-issued identification (passport or ID)",
                      "Certified English translations (if documents are not in English)",
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
                </div>

                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4">
                    Document Requirements
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Documents must be official copies from the institution",
                      "Scanned copies in PDF, JPG, or PNG format",
                      "Clear, legible images with all text visible",
                      "Maximum file size: 10MB per document",
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
                </div>
              </div>

              <div className="mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 mb-1 text-sm sm:text-base">
                      Translation Requirements
                    </p>
                    <p className="text-xs sm:text-sm text-amber-700 leading-relaxed">
                      All documents not in English must be accompanied by
                      certified English translations. We can recommend trusted
                      translation services if needed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                  <div className="flex items-center">
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
                  </div>

                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-xs sm:text-sm lg:text-base">
                        Email Support
                      </p>
                      <p className="text-blue-600 text-xs sm:text-sm lg:text-base break-all">
                        support@centereducationtransitions.com
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

        <section className="text-center">
          <Card className="border-2 gradient-border">
            <CardContent className="p-4 sm:p-6 lg:p-8 lg:p-12">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 px-2">
                Ready to Transform Your International Credentials Into American
                Success?
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 lg:mb-8 px-2">
                Begin your thorough credential evaluation and education
                transition process today. Get your evaluation PLUS success
                pathway roadmap in 5 business days or less.
              </p>
              <Button
                onClick={handleStartApplication}
                className="gradient-bg hover:opacity-90 text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 w-full sm:w-auto min-h-[44px] sm:min-h-[48px]"
              >
                Start Your Education Transition
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
