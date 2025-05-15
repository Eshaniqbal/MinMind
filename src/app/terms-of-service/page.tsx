import { APP_NAME } from '@/lib/constants';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg text-muted-foreground">Last updated: June 2024</p>
      </ScrollAnimationWrapper>
      <div className="max-w-3xl mx-auto space-y-8 text-base text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p>
            These Terms of Service ("Terms") govern your use of the {APP_NAME} website and services. By accessing or using our site, you agree to these Terms.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
          <p>
            By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Use of Service</h2>
          <p>
            You agree to use our services only for lawful purposes and in accordance with these Terms. You may not use our site to engage in any illegal or harmful activity.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
          <p>
            All content, trademarks, and intellectual property on this site are the property of {APP_NAME} or its licensors. You may not use, reproduce, or distribute any content without our written permission.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to our services at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Disclaimers</h2>
          <p>
            Our services are provided "as is" and "as available" without warranties of any kind. We do not guarantee that our site will be error-free or uninterrupted.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
          <p>
            {APP_NAME} will not be liable for any damages arising from your use of our website or services.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Changes will be posted on this page with an updated effective date.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us through our website.
          </p>
        </section>
      </div>
    </div>
  );
} 