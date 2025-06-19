"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";

import { quoteFormSchema, type QuoteFormData, type FormState } from "@/lib/types";
import { submitQuoteForm } from "@/app/actions/form-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
        "Request a Quote"
      )}
    </Button>
  );
}

export function QuoteForm() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(submitQuoteForm, initialState);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, 
    watch
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  });

  const projectType = watch("projectType");
  const budget = watch("budget");

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

  const onSubmit = async (data: QuoteFormData) => {
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
      id="quote-form" 
      className="space-y-6 w-full max-w-4xl mx-auto"
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
        <Label htmlFor="company" className="text-sm font-medium">Company (Optional)</Label>
        <Input 
          id="company" 
          type="text" 
          {...register("company")} 
          placeholder="Your Company Name"
          className="w-full"
        />
        {errors.company?.message && <p className="text-sm text-destructive">{errors.company.message}</p>}
        {state.errors?.company && <p className="text-sm text-destructive">{state.errors.company.join(", ")}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <Label htmlFor="projectType" className="text-sm font-medium">Project Type</Label>
          <Select
            onValueChange={(value) => setValue("projectType", value as QuoteFormData["projectType"], { shouldValidate: true })}
            value={projectType}
            {...register("projectType")}
          >
            <SelectTrigger id="projectType" className="w-full">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-development">Web Development</SelectItem>
              <SelectItem value="mobile-app">Mobile App</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="portfolio">Portfolio</SelectItem>
              <SelectItem value="cse-project">CSE Project Support</SelectItem>
              <SelectItem value="custom-solution">Custom Solution</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.projectType?.message && <p className="text-sm text-destructive">{errors.projectType.message}</p>}
          {state.errors?.projectType && <p className="text-sm text-destructive">{state.errors.projectType.join(", ")}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium">Budget (Optional)</Label>
          <Select
            onValueChange={(value) => setValue("budget", value, { shouldValidate: true })}
            {...register("budget")}
          >
            <SelectTrigger id="budget" className="w-full">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-50k">Under ₹50,000</SelectItem>
              <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
              <SelectItem value="1l-2l">₹1,00,000 - ₹2,00,000</SelectItem>
              <SelectItem value="2l-5l">₹2,00,000 - ₹5,00,000</SelectItem>
              <SelectItem value="5l-10l">₹5,00,000 - ₹10,00,000</SelectItem>
              <SelectItem value="above-10l">Above ₹10,00,000</SelectItem>
              <SelectItem value="custom">Custom Budget</SelectItem>
            </SelectContent>
          </Select>
          {errors.budget?.message && <p className="text-sm text-destructive">{errors.budget.message}</p>}
          {state.errors?.budget && <p className="text-sm text-destructive">{state.errors.budget.join(", ")}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="details" className="text-sm font-medium">Project Details</Label>
        <Textarea
          id="details"
          rows={5}
          {...register("details")}
          placeholder="Describe your project, goals, and any specific requirements..."
          className="w-full resize-none"
        />
        {errors.details?.message && <p className="text-sm text-destructive">{errors.details.message}</p>}
        {state.errors?.details && <p className="text-sm text-destructive">{state.errors.details.join(", ")}</p>}
      </div>
      
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}
