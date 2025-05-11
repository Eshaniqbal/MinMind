"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";

import { contactFormSchema, type ContactFormData, type FormState } from "@/lib/types";
import { submitContactForm } from "@/app/actions/form-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const initialState: FormState = {
  message: null,
  errors: null,
  success: false,
};

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button 
      type="submit" 
      disabled={isSubmitting} 
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Submitting...</span>
        </div>
      ) : (
        "Send Message"
      )}
    </Button>
  );
}

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    if (state.message) {
      setIsSubmitting(false);
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
          duration: 5000,
        });
        reset();
      } else if (state.errors || state.message.startsWith("Validation failed")) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
          duration: 5000,
        });
      } else {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  }, [state, toast, reset]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    startTransition(async () => {
      await formAction(formData);
    });
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      id="contact-form" 
      className="space-y-6 w-full max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
          <Input 
            id="name" 
            type="text" 
            {...register("name")} 
            placeholder="Your Name"
            className="w-full"
          />
          {errors.name?.message && <p className="text-sm text-destructive">{errors.name.message}</p>}
          {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name.join(", ")}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            {...register("email")} 
            placeholder="you@example.com"
            className="w-full"
          />
          {errors.email?.message && <p className="text-sm text-destructive">{errors.email.message}</p>}
          {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email.join(", ")}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">Message</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder="How can we help you?"
          className="w-full resize-none"
        />
        {errors.message?.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
        {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message.join(", ")}</p>}
      </div>
      
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}
