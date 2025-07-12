"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Search,
  Clock,
  FileCheck,
  DollarSign,
  // GraduationCap,
  Globe,
  Shield,
  Briefcase,
} from "lucide-react";
import { Footer } from "../shared/Footer";
import { useRouter } from "next/navigation";
import { Header } from "../shared/Header";

interface FAQCategory {
  icon: JSX.Element;
  title: string;
  questions: Array<{
    q: string;
    a: string | JSX.Element;
  }>;
}

const faqCategories: FAQCategory[] = [
  {
    icon: (
      <Clock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
    ),
    title: "Processing & Timelines",
    questions: [
      {
        q: "How long does the evaluation and education transition process take?",
        a: "Processing times vary by package: Essential Document (7-10 days), Professional Plus (5-7 days), Career Success (3-5 days), and Premium Transition (1-2 days). All include education transition support.",
      },
      {
        q: "When does processing time start?",
        a: "Processing time begins once we have received all required documents and payment. You'll receive a confirmation email when your evaluation enters the processing queue.",
      },
      {
        q: "What's included in the education transition support?",
        a: "Every package includes a personalized success roadmap, LinkedIn optimization guide, field-specific guidance, and access to our resources toolkit. Higher-tier packages include coaching sessions and professional network introductions.",
      },
    ],
  },
  {
    icon: (
      <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-indigo-600" />
    ),
    title: "Document Requirements",
    questions: [
      {
        q: "What documents do I need to submit?",
        a: "You need official transcripts, degree certificates/diplomas, and government-issued ID. If your documents are not in English, you'll also need certified English translations.",
      },
      {
        q: "Do I need to submit original documents?",
        a: "No, we accept clear, legible scanned copies of official documents. You can upload PDF, JPG, or PNG files through our secure portal.",
      },
      {
        q: "What if my documents aren't in English?",
        a: "All non-English documents must be accompanied by certified English translations. We can recommend trusted translation services if needed.",
      },
      {
        q: "How do I get official transcripts?",
        a: "Contact your educational institution's registrar office directly. Many schools now offer digital transcript services that can be sent directly to us.",
      },
    ],
  },
  {
    icon: (
      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-600" />
    ),
    title: "Pricing & Packages",
    questions: [
      {
        q: "How much does the complete service cost?",
        a: "Our Essential Document package costs $149 (7-10 days), Professional Plus costs $229 (5-7 days), Career Success costs $349 (3-5 days), and Premium Transition costs $499 (1-2 days). All packages include credential evaluation plus education transition support.",
      },
      {
        q: "What's the difference between document-by-document and course-by-course evaluation?",
        a: "Document-by-document evaluation provides overall degree equivalency and is suitable for employment, immigration, and community college admission. Course-by-course evaluation provides detailed analysis of each course and is required for university admissions, professional licensing, and transfer credit.",
      },
      {
        q: "Are there any hidden fees?",
        a: "No hidden fees. The price you see is what you pay. Additional costs only apply if you request extra services like additional copies or special handling.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, PayPal, and bank transfers. Payment is required before processing begins.",
      },
      {
        q: "Do you offer refunds?",
        a: "We offer full refunds if your evaluation is rejected by an employer, university, or immigration authority due to our error. Cancellations before processing begins are eligible for a refund minus a $25 processing fee.",
      },
    ],
  },
  // {
  //   icon: (
  //     <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-purple-600" />
  //   ),
  //   title: "Academic & University Use",
  //   questions: [
  //     {
  //       q: "Can I use this evaluation for university admissions?",
  //       a: "Yes! Our course-by-course evaluations are specifically designed for university admissions at all levels. We provide detailed course analysis that universities require for admission decisions.",
  //     },
  //     {
  //       q: "Will universities accept your evaluations?",
  //       a: "Yes, our evaluations are widely accepted by universities across the United States. We follow standard evaluation practices and provide the detailed analysis that admissions offices require.",
  //     },
  //     {
  //       q: "Can I get transfer credit with your evaluation?",
  //       a: "Our course-by-course evaluations are designed to help universities award transfer credit for previously completed coursework. The detailed course analysis helps institutions make informed transfer credit decisions.",
  //     },
  //     {
  //       q: "Do you evaluate credentials for graduate school?",
  //       a: "Yes, we evaluate credentials for all academic levels including graduate and professional programs. Our course-by-course evaluations provide the detailed analysis required for graduate admissions.",
  //     },
  //   ],
  // },
  {
    icon: (
      <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-amber-600" />
    ),
    title: "Employment & Career Support",
    questions: [
      {
        q: "What type of evaluation do you provide for employment?",
        a: "We provide document-by-document evaluations combined with thorough education transition support. This includes credential assessment, career roadmap development, and industry-specific guidance for employment purposes.",
      },
      {
        q: "How do you determine U.S. equivalency?",
        a: "Our certified evaluators compare your credentials to U.S. educational standards using established guidelines and databases of international educational systems, while our success specialists analyze opportunities.",
      },
      {
        q: "Will my evaluation be accepted for employment?",
        a: "Yes, our evaluations are widely accepted by employers across the United States for employment verification purposes. The format is designed to be easily understood by HR departments.",
      },
      {
        q: "Do you help with professional licensing?",
        a: "Yes, our course-by-course evaluations are suitable for professional licensing boards, and we provide guidance on licensing requirements as part of our education transition support.",
      },
    ],
  },
  {
    icon: (
      <Globe className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
    ),
    title: "International Credentials",
    questions: [
      {
        q: "Do you evaluate credentials from all countries?",
        a: "Yes, we evaluate credentials from educational institutions worldwide. Our evaluators have expertise in educational systems from every region.",
      },
      {
        q: "How do you verify foreign institutions?",
        a: "We maintain extensive databases of accredited institutions worldwide and work with international education authorities to verify institutional legitimacy.",
      },
      {
        q: "What if my institution is no longer operating?",
        a: "We can still evaluate credentials from closed institutions if we can verify their legitimacy through educational authorities or historical records.",
      },
      {
        q: "Can I apply from outside the U.S.?",
        a: "Absolutely! Our entire process is online, and we serve clients worldwide. Digital delivery means you can receive your evaluation and success roadmap anywhere.",
      },
    ],
  },
  {
    icon: (
      <Shield className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-600" />
    ),
    title: "Licensing",
    questions: [
      // {
      //   q: "Is this evaluation accepted for immigration purposes?",
      //   a: "Yes, our evaluations meet USCIS requirements for immigration documentation. The format and content comply with federal immigration standards.",
      // },
      // {
      //   q: "Can employers use this for I-9 verification?",
      //   a: "Our evaluations provide valuable information for employers but are not a substitute for required I-9 documentation. They serve as supplementary verification of educational qualifications.",
      // },
      {
        q: "Will this help with professional licensing?",
        a: "Yes, our course-by-course evaluations are accepted by many licensing boards, and we provide guidance on licensing requirements as part of our education transition support.",
      },
      {
        q: "How long is the evaluation valid?",
        a: "Our evaluations don't expire, but some employers, universities, or institutions may have their own policies about the age of evaluations they'll accept.",
      },
    ],
  },
];

export default function FAQPage() {
  const router = useRouter();
  const handleStartApplication = () => {
    // Use router.push for programmatic navigation
    router.push("/application");
  };
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (typeof q.a === "string" &&
            q.a.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8 lg:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 px-4">
            Find answers to common questions about our thorough credential
            evaluation and education transition services
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg min-h-[44px] sm:min-h-[48px]"
            />
          </div>
        </motion.div>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8 mb-8 sm:mb-12 lg:mb-16">
          {filteredCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4 lg:mb-6">
                    {category.icon}
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold ml-2 sm:ml-3">
                      {category.title}
                    </h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, j) => (
                      <AccordionItem key={j} value={`item-${i}-${j}`}>
                        <AccordionTrigger className="text-left text-xs sm:text-sm lg:text-base leading-relaxed hover:no-underline">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="border-2 gradient-border">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 px-2">
                Still Have Questions?
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm lg:text-base px-2">
                Ready to get started with your credential evaluation and
                education transition? Our team is here to help guide you through
                the process.
              </p>
              <Button
                onClick={handleStartApplication}
                className="gradient-bg hover:opacity-90 text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 w-full sm:w-auto min-h-[44px] sm:min-h-[48px]"
              >
                Start Your Application
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
