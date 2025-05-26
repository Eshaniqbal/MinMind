'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { OPEN_ROLES } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import { Briefcase, MapPin, Clock, ChevronRight } from 'lucide-react';

interface FieldError {
  message: string;
  fields?: string[];
  details?: string;
}

export default function CareerPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('');
  const formRef = useRef<HTMLDivElement>(null);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const displayedRoles = showAllRoles ? OPEN_ROLES : OPEN_ROLES.slice(0, 2);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleApplyNow = (roleId: string) => {
    const role = OPEN_ROLES.find(r => r.id === roleId);
    if (role) {
      setSelectedRole(roleId);
      setFormData(prev => ({
        ...prev,
        position: role.title
      }));
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.position) {
      errors.position = 'Please select a position';
    }
    
    if (!file) {
      errors.resume = 'Please upload your resume';
    } else {
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      if (!['.pdf', '.doc', '.docx'].includes(fileExtension)) {
        errors.resume = 'Please upload a PDF or Word document (.pdf, .doc, .docx)';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setFieldErrors({});
    setSubmitStatus({ type: null, message: '' });

    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please correct the errors before submitting.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (file) {
        formDataToSend.append('resume', file);
      }

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully! Please check your email for confirmation.',
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          message: '',
        });
        setFile(null);
        setSelectedRole('');
        setFieldErrors({});
      } else {
        // Handle specific error responses
        if (data.fields) {
          const newFieldErrors: Record<string, string> = {};
          data.fields.forEach((field: string) => {
            newFieldErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
          });
          setFieldErrors(newFieldErrors);
        }
        throw new Error(data.details || data.message || 'Something went wrong');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit application',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimationWrapper animationType="fadeIn">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Join Our Team</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're looking for passionate individuals to help us build innovative solutions and shape the future of technology.
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimationWrapper animationType="fadeInUp">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedRoles.map((role) => (
                <Card 
                  key={role.id}
                  className="border-2 border-border hover:border-primary/50 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-xl">{role.title}</span>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {role.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {role.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{role.description}</p>
                    <div className="space-y-2 mb-6">
                      {role.requirements.map((req, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                          {req}
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => handleApplyNow(role.id)}
                      className="w-full"
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {OPEN_ROLES.length > 2 && (
              <div className="mt-8 text-center">
                <Button
                  onClick={() => setShowAllRoles(!showAllRoles)}
                  variant="outline"
                  className="px-8"
                >
                  {showAllRoles ? 'Show Less' : `Show More (${OPEN_ROLES.length - 2} positions)`}
                </Button>
              </div>
            )}
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Application Form Section */}
      <section ref={formRef} className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimationWrapper animationType="fadeInUp">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Apply Now</h2>
              <Card className="backdrop-blur-sm bg-background/80">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            fieldErrors.fullName ? 'border-red-500' : 'border-border'
                          }`}
                        />
                        {fieldErrors.fullName && (
                          <p className="text-sm text-red-500 mt-1">{fieldErrors.fullName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            fieldErrors.email ? 'border-red-500' : 'border-border'
                          }`}
                        />
                        {fieldErrors.email && (
                          <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-foreground">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="position" className="text-sm font-medium text-foreground">
                          Position Applied For *
                        </label>
                        <select
                          id="position"
                          name="position"
                          required
                          value={formData.position}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            fieldErrors.position ? 'border-red-500' : 'border-border'
                          }`}
                        >
                          <option value="">Select a position</option>
                          {OPEN_ROLES.map((role) => (
                            <option key={role.id} value={role.title}>
                              {role.title}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.position && (
                          <p className="text-sm text-red-500 mt-1">{fieldErrors.position}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="experience" className="text-sm font-medium text-foreground">
                          Years of Experience
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <option value="">Select experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5+">5+ years</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="resume" className="text-sm font-medium text-foreground">
                          Resume/CV * (.pdf, .doc, .docx)
                        </label>
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          required
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className={`w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-medium
                            file:bg-primary file:text-primary-foreground
                            hover:file:bg-primary/90 ${
                              fieldErrors.resume ? 'border-red-500' : 'border-border'
                            }`}
                        />
                        {fieldErrors.resume && (
                          <p className="text-sm text-red-500 mt-1">{fieldErrors.resume}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Cover Letter / Additional Information
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>

                    {submitStatus.type && (
                      <div
                        className={`p-4 rounded-lg ${
                          submitStatus.type === 'success' 
                            ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}
                      >
                        {submitStatus.message}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-2 ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </div>
  );
} 