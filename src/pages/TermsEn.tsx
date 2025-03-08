
import React from "react";
import { SEOMetadataEn } from "@/components/landing/SEOMetadataEn";
import { HeaderEn } from "@/components/landing/HeaderEn";
import { Footer } from "@/components/landing/Footer";

export default function TermsEn() {
  return (
    <div className="min-h-screen flex flex-col bg-[#2C2C2C]">
      <SEOMetadataEn 
        title="Terms of Service - Pizzametrix"
        description="Terms of Service for Pizzametrix. Read our terms and conditions for using our pizza dough calculator application."
      />
      <HeaderEn />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-montserrat font-bold text-[#F5E9D7] mb-8">Terms of Service</h1>
          
          <p className="text-[#F5E9D7]/90 mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">1. Agreement to Terms</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            By accessing or using Pizzametrix, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">2. Description of Service</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Pizzametrix is a web application designed to help users calculate and manage pizza dough recipes. We provide tools for recipe calculation, storage, and management.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">3. User Accounts</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password and for all activities that occur under your account.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">4. User Content</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            Our service allows you to post, save, and share recipes. You retain all rights to your content, but grant us a license to use, reproduce, and display this content to provide the service.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">5. Intellectual Property</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            The service and its original content, features, and functionality are owned by Pizzametrix and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">6. Termination</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">7. Limitation of Liability</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            In no event shall Pizzametrix be liable for any indirect, incidental, special, consequential or punitive damages, including loss of profits, data, or goodwill.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">8. Changes to Terms</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            We reserve the right to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
          
          <h2 className="text-2xl font-montserrat font-bold text-[#F5E9D7] mt-8 mb-4">9. Contact Us</h2>
          <p className="text-[#F5E9D7]/90 mb-4">
            If you have any questions about these Terms, please contact us at support@pizzametrix.com.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
