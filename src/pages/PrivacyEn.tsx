
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/landing/HeaderEn";
import { Footer } from "@/components/landing/Footer";
import { SEOMetadataEn } from "@/components/landing/SEOMetadataEn";

export default function PrivacyEn() {
  // Appliquer immédiatement le fond sombre pour éviter le flash blanc
  useEffect(() => {
    // Application plus agressive du fond sombre
    document.documentElement.style.backgroundColor = "#2C2C2C";
    document.body.style.backgroundColor = "#2C2C2C";
    
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#2C2C2C] animate-fadeIn">
      <Helmet>
        <title>Privacy Policy - Pizzametrix</title>
        <meta name="description" content="Privacy Policy for Pizzametrix. Learn how we collect, use and protect your personal information." />
        <style>{`
          html, body { 
            background-color: #2C2C2C !important;
            min-height: 100%; 
          }
        `}</style>
      </Helmet>
      <Header />
      <SEOMetadataEn />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-montserrat font-bold text-[#F5E9D7] mb-8">Privacy Policy</h1>
          
          <p className="text-[#F5E9D7]/90 mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">1. Introduction</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            At Pizzametrix, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">2. Information We Collect</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            We collect the following types of information:
          </p>
          <ul className="list-disc pl-6 text-[#F5E9D7]/90 mb-4">
            <li className="mb-2">Account information: email address, password, and profile details</li>
            <li className="mb-2">Recipe data: recipes you create and save using our application</li>
            <li className="mb-2">Usage data: how you interact with our application</li>
            <li className="mb-2">Technical data: IP address, browser type, device information</li>
          </ul>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 text-[#F5E9D7]/90 mb-4">
            <li className="mb-2">Provide, maintain, and improve our services</li>
            <li className="mb-2">Process and complete transactions</li>
            <li className="mb-2">Send you technical notices and support messages</li>
            <li className="mb-2">Respond to your comments and questions</li>
            <li className="mb-2">Understand how users use our application to improve it</li>
          </ul>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">4. Cookies and Similar Technologies</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            We use cookies and similar tracking technologies to track activity on our application and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">5. Data Security</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            We implement appropriate security measures to protect your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">6. Data Retention</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, and when we have ongoing legitimate business needs to do so.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">7. Your Data Protection Rights</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Depending on your location, you may have the following rights regarding your data:
          </p>
          <ul className="list-disc pl-6 text-[#F5E9D7]/90 mb-4">
            <li className="mb-2">Right to access your personal data</li>
            <li className="mb-2">Right to rectification of inaccurate data</li>
            <li className="mb-2">Right to erasure of your data</li>
            <li className="mb-2">Right to restrict processing of your data</li>
            <li className="mb-2">Right to data portability</li>
            <li className="mb-2">Right to object to processing of your data</li>
          </ul>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">8. Children's Privacy</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Our application is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">9. Changes to This Privacy Policy</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">10. Contact Us</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            If you have any questions about this Privacy Policy, please contact us at privacy@pizzametrix.com.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
