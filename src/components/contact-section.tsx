"use client";

import LabReveal from "./lab-reveal";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import SectionHeading from "./section-heading";
import { Button } from "./ui/button";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormSchema } from "@/lib/schema";
import { sendEmailAction } from "@/lib/actions";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { ErrorLine } from "./ui/error-line";
import { Textarea } from "./ui/textarea";
import { Icons } from "./icons";
import { useSectionInView } from "@/hooks/use-section-in-view";

export default function ContactSection() {
  const { ref } = useSectionInView("Contact");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchema>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (values: ContactFormSchema) => {
    const { data, error } = await sendEmailAction(values);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
    reset();
  };

  const ContactForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="w-full">
          <Label htmlFor="email" className={cn(errors.email?.message && "text-destructive")}>
            Email
          </Label>
          <Input
            type="email"
            id="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="hello@gmail.com"
            {...register("email")}
            className={cn(errors.email?.message && "border-destructive")}
          />
          <div id="email-error">
            <ErrorLine message={errors.email?.message} />
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="message" className={cn(errors.message?.message && "text-destructive")}>
            Message
          </Label>
          <Textarea
            id="message"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="Hello! What's up?"
            {...register("message")}
            className={cn(errors.message?.message && "border-destructive")}
          />
          <div id="message-error">
            <ErrorLine message={errors.message?.message} />
          </div>
        </div>
        <Button type={"submit"} size="lg" disabled={isSubmitting} className="self-start">
          {isSubmitting ? "Sending..." : "Submit"} <Icons.arrowRight className="ml-2 size-4" />
        </Button>
      </form>
    );
  };

  return (
    <section ref={ref} id="contact" className="lab-section border-b-0">
      <LabReveal>
        <div className="contact-panel bracket-card">
          <div className="min-w-0">
            <SectionHeading
              label="SYS.05 // CONTACT"
              heading="Get In Touch"
              content={
                <>
                  Please contact me directly at{" "}
                  <a
                    className="text-link underline underline-offset-4"
                    href={siteConfig.links.mailTo}
                  >
                    {siteConfig.contact.email}
                  </a>{" "}
                  or through this form.
                </>
              }
            />
            <div className="contact-links">
              <Link className="contact-link" href={siteConfig.links.mailTo}>
                <Mail className="size-5" aria-hidden="true" />
                <span>
                  <small>EMAIL</small>
                  {siteConfig.contact.email}
                </span>
                <ArrowUpRight className="ml-auto size-4" aria-hidden="true" />
              </Link>
              <Link
                className="contact-link"
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="size-5" aria-hidden="true" />
                <span>
                  <small>CONNECT</small>LinkedIn
                </span>
                <ArrowUpRight className="ml-auto size-4" aria-hidden="true" />
              </Link>
              <Link
                className="contact-link"
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-5" aria-hidden="true" />
                <span>
                  <small>EXPLORE</small>GitHub
                </span>
                <ArrowUpRight className="ml-auto size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="min-w-0">{ContactForm()}</div>
        </div>
      </LabReveal>
    </section>
  );
}
