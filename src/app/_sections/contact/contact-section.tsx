"use client";

import LabReveal, { RevealItem } from "@/components/lab-reveal";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import ContactEmailButton from "./contact-email-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormSchema } from "@/lib/schema";
import { sendEmailAction } from "@/lib/actions";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ErrorLine } from "@/components/ui/error-line";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
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
    <section ref={ref} id="contact" className="lab-section contact-finale border-b-0">
      <div className="site-container contact-content">
      <LabReveal variant="contact">
        <div className="connect-card">
          <div className="connect-card-inner">
            <div className="connect-flow" aria-hidden="true" />
            <div className="connect-layout">
              <RevealItem className="connect-intro">
                <p className="connect-eyebrow"><span className="availability-dot" aria-hidden="true" /> Open to opportunities</p>
                <h2>Let&rsquo;s connect<span className="text-link">.</span></h2>
                <p className="connect-description">Have an AI project in mind, a question, or an opportunity? I&rsquo;m always open to a conversation. Let&rsquo;s build something meaningful.</p>
                <div className="connect-actions">
                  <ContactEmailButton />
                  <Link className="connect-projects" href="#projects">See projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
                </div>
                <div className="connect-socials">
                  <Link href={siteConfig.links.mailTo} aria-label="Email"><Mail size={18} aria-hidden="true" /></Link>
                  <Link href={siteConfig.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin size={18} aria-hidden="true" /></Link>
                  <Link href={siteConfig.links.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer"><Github size={18} aria-hidden="true" /></Link>
                  <span>Based in Indonesia. Open to the world.</span>
                </div>
              </RevealItem>
              <RevealItem index={1} className="connect-form-panel">
                <h3>Send me a message</h3>
                <p>Have something in mind? Drop it here.</p>
                {ContactForm()}
              </RevealItem>
            </div>
          </div>
        </div>
      </LabReveal>
      </div>
    </section>
  );
}
