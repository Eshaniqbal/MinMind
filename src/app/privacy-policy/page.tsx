import { APP_NAME } from '@/lib/constants';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground">Last updated: June 2024</p>
      </ScrollAnimationWrapper>
      <div className="max-w-3xl mx-auto space-y-8 text-base text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p>
            This Privacy Policy describes how {APP_NAME} ("we", "us", or "our") collects, uses, and protects your information when you use our website and services.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, and any other information you provide when you contact us or use our services. We also collect non-personal information such as browser type, device information, and usage data through cookies and analytics tools.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
          <p>
            We use your information to provide, maintain, and improve our services, communicate with you, respond to your inquiries, and ensure the security of our website.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Cookies & Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookies through your browser settings.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those sites.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our website.
          </p>
        </section>
      </div>
    </div>
  );
} 