import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm: React.FC = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} className="bg-white/80 focus:bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@email.com" {...field} className="bg-white/80 focus:bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="How can we help you?" {...field} className="bg-white/80 focus:bg-white resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              type="submit"
              className="gradient-bg w-full py-3 text-lg font-semibold rounded-lg shadow-md hover:opacity-90 transition-all duration-200"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-600 text-center mt-4 font-medium"
              >
                Thank you! Your message has been sent.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-center mt-4 font-medium"
              >
                {errorMsg}
              </motion.p>
            )}
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default ContactForm; 