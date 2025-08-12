// app/dashboard/settings/[slug]/page.js
"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from "@/providers/LanguageProvider";

const SettingsDetailPage = () => {
  const params = useParams();
  const { slug } = params;
  const { t } = useLanguage();

  // You can fetch any necessary data based on the slug here
  useEffect(() => {
    // Example: fetch settings data for this specific section
    // fetchSettingsData(slug);
  }, [slug]);

  // Create a function to generate the appropriate title based on the slug
  const getTitle = (slug) => {
    const titles = {
      'academic-settings': 'siteSettings',
      'session': 'session',
      'section': 'section',
      'examination': 'examination',
      'class': 'class',
      'book': 'book',
      'book-assign': 'bookAssign',
      'responsibility': 'responsibility',
      'donor-type': 'donorType',
      'donation-type': 'donationType',
      'grade-system': 'gradeSystem',
      'shop': 'shop',
      'invoice-design': 'invoiceDesign',
      'user': 'user',
      'admission-fee': 'admissionFee',
      'sms-settings': 'smsSettings',
    };
    
    return titles[slug] ? t(titles[slug]) : slug;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{getTitle(slug)}</h1>
      
      {/* Content specific to this settings page */}
      <div className="bg-white rounded-lg shadow p-6">
        <p>Settings content for: {slug}</p>
        {/* Add your form or settings UI here */}
      </div>
    </div>
  );
};

export default SettingsDetailPage;