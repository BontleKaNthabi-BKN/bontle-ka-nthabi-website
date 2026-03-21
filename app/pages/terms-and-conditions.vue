<template>
  <div class="min-h-screen bg-light-beige dark:bg-bg-dark">
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-primary-green to-accent-gold text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p class="text-xl">Please read our terms carefully before using our services</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          
          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              <strong>Last Updated:</strong> {{ new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </p>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded mb-8">
              <p class="text-yellow-800 dark:text-yellow-200">
                <strong>IMPORTANT:</strong> These Terms and Conditions constitute a legally binding agreement between you and Bontle Ka Nthabi (Pty) Ltd (trading as BKN Beauty Academy). By accessing our website, applying for courses, or using our services, you agree to be bound by these terms. If you do not agree, please do not use our services.
              </p>
            </div>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              By accessing the website www.bknbeautyacademy.co.za (the "Website"), applying for courses, or using any services provided by Bontle Ka Nthabi (Pty) Ltd, trading as BKN Beauty Academy ("we," "us," "our," or "the Academy"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions ("Terms") and our Privacy Policy.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              If you are entering into this agreement on behalf of a minor (under 18 years of age), you represent that you are the parent or legal guardian of such minor and that you agree to be bound by these Terms on their behalf.
            </p>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">2. About the Academy</h2>
            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Legal Name:</strong> Bontle Ka Nthabi (Pty) Ltd<br>
                <strong>Trading As:</strong> BKN Beauty Academy<br>
                <strong>Registration:</strong> [Company Registration Number]<br>
                <strong>Email:</strong> <a href="mailto:nthabi@bknbeautyacademy.co.za" class="text-primary-green hover:underline">nthabi@bknbeautyacademy.co.za</a><br>
                <strong>Phone:</strong> <a href="tel:+27638429997" class="text-primary-green hover:underline">+27 63 842 9997</a><br>
                <strong>Location:</strong> Mbombela, South Africa
              </p>
            </div>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">3. Course Applications and Enrollment</h2>
            
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">3.1 Application Process</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>All applications must be submitted through our official online application form</li>
              <li>Applicants must be at least 16 years of age to enroll in courses</li>
              <li>Applicants must provide accurate and complete information, including valid contact details</li>
              <li>Supporting documents (certificates, ID copies, etc.) must be uploaded in acceptable formats (PDF, JPG, PNG, DOC)</li>
              <li>Maximum file size per document is 10MB</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">3.2 Application Review</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>All applications are reviewed within 2-3 business days</li>
              <li>Acceptance is at the sole discretion of the Academy</li>
              <li>We reserve the right to request additional documentation or information</li>
              <li>Application submission does not guarantee enrollment</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">3.3 Enrollment Confirmation</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Enrollment is only confirmed upon receipt of written acceptance from the Academy</li>
              <li>Students will receive an enrollment confirmation email with course details</li>
              <li>Students must confirm their acceptance within 5 business days or the offer may be withdrawn</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">4. Course Fees and Payment</h2>
            
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">4.1 Fee Structure</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Course fees are as advertised on the Website at the time of enrollment</li>
              <li>Fees may vary depending on the course, duration, and included materials</li>
              <li>The Academy reserves the right to adjust fees with reasonable notice</li>
              <li>All fees are quoted in South African Rand (ZAR)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">4.2 Payment Terms</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Full payment is required before course commencement unless otherwise agreed</li>
              <li>Payment plans may be available for selected courses (subject to approval)</li>
              <li>Accepted payment methods will be communicated during enrollment</li>
              <li>Late payments may result in suspension from courses</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">4.3 Refund Policy</h3>
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
              <p class="text-blue-800 dark:text-blue-200 mb-2"><strong>Refund Eligibility:</strong></p>
              <ul class="list-disc pl-6 text-blue-800 dark:text-blue-200 space-y-2">
                <li><strong>Before Course Commencement:</strong> Full refund minus 10% administration fee if cancellation is made 7+ days before course start date</li>
                <li><strong>Within 7 Days of Start:</strong> 50% refund if cancellation is made 3-7 days before course start date</li>
                <li><strong>Within 3 Days of Start:</strong> No refund available</li>
                <li><strong>After Course Commencement:</strong> No refunds for students who discontinue after the course has started</li>
              </ul>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Refund requests must be submitted in writing to <a href="mailto:nthabi@bknbeautyacademy.co.za" class="text-primary-green hover:underline">nthabi@bknbeautyacademy.co.za</a> and will be processed within 14 business days.
            </p>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">5. Student Conduct and Responsibilities</h2>
            
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">5.1 Code of Conduct</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Students are expected to:</p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Attend all scheduled classes and practical sessions (minimum 80% attendance required)</li>
              <li>Arrive on time and prepared for all sessions</li>
              <li>Treat instructors, staff, and fellow students with respect and professionalism</li>
              <li>Follow all safety protocols and guidelines during practical sessions</li>
              <li>Maintain proper hygiene and dress code as specified by the Academy</li>
              <li>Use equipment and facilities responsibly</li>
              <li>Refrain from disruptive behavior, harassment, or discrimination of any kind</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">5.2 Academic Integrity</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>All submitted work must be the student's own original work</li>
              <li>Plagiarism, cheating, or falsification of records will not be tolerated</li>
              <li>Violations may result in disciplinary action, including expulsion without refund</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">5.3 Disciplinary Action</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Academy reserves the right to take disciplinary action, including suspension or expulsion, for violations of the code of conduct. No refunds will be provided in cases of expulsion due to misconduct.
            </p>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">6. Course Completion and Certification</h2>
            
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">6.1 Completion Requirements</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Successful completion of all theoretical assessments</li>
              <li>Successful completion of all practical assessments</li>
              <li>Minimum 80% attendance rate</li>
              <li>Payment of all outstanding fees</li>
              <li>Return of all borrowed materials and equipment</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">6.2 Certification</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Certificates are issued upon successful completion of all requirements</li>
              <li>Certificates are issued in the name of the Academy and/or accreditation partners</li>
              <li>Certificates are non-transferable and cannot be reissued if lost (certified copies may be requested for a fee)</li>
              <li>The Academy reserves the right to withhold certification until all obligations are met</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">7. Intellectual Property</h2>
            
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">7.1 Academy Property</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              All course materials, including but not limited to textbooks, manuals, videos, images, and digital content, are the intellectual property of Bontle Ka Nthabi (Pty) Ltd or its partners. Students are granted a limited, non-exclusive, non-transferable license to use these materials for personal educational purposes only.
            </p>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">7.2 Restrictions</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Course materials may not be reproduced, distributed, or sold without written permission</li>
              <li>Recording of classes (audio or video) is prohibited without explicit consent</li>
              <li>Sharing of login credentials or course access with third parties is prohibited</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">7.3 Student Work</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Academy may use photographs or examples of student work for promotional and educational purposes. By enrolling, students grant the Academy permission to use such materials unless they explicitly opt out in writing.
            </p>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">8. Website Use</h2>
            
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">8.1 Acceptable Use</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">You agree to use the Website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the Website.</p>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">8.2 Prohibited Activities</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Attempting to gain unauthorized access to the Website or its systems</li>
              <li>Using the Website to transmit viruses, malware, or harmful code</li>
              <li>Interfering with or disrupting the Website or servers</li>
              <li>Using automated systems (bots, scrapers) to access the Website without permission</li>
              <li>Impersonating any person or entity or misrepresenting your affiliation</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">9. Limitation of Liability</h2>
            
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              To the fullest extent permitted by South African law, Bontle Ka Nthabi (Pty) Ltd and its directors, employees, and agents shall not be liable for:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Any indirect, incidental, special, or consequential damages arising from use of our services</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Personal injury or property damage resulting from course participation (except where caused by gross negligence)</li>
              <li>Errors, delays, or interruptions in Website functionality</li>
              <li>Any third-party content or links accessible through the Website</li>
            </ul>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Our total liability for any claim arising from these Terms or your use of our services shall not exceed the total amount paid by you to the Academy in the 12 months preceding the claim.
            </p>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">10. Indemnification</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              You agree to indemnify, defend, and hold harmless Bontle Ka Nthabi (Pty) Ltd, its directors, employees, and agents from and against any claims, liabilities, damages, losses, or expenses (including legal fees) arising from:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Your use of the Website or services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your misconduct or negligence</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">11. Modifications to Services and Terms</h2>
            
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">11.1 Course Modifications</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Academy reserves the right to modify, suspend, or cancel any course, change course content, adjust schedules, or substitute instructors at its discretion. Students will be notified of material changes as soon as reasonably practicable.
            </p>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">11.2 Terms Modifications</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website or services after changes constitutes acceptance of the modified Terms.
            </p>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">12. Termination</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              We reserve the right to terminate or suspend your access to the Website and services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, the Academy, or third parties, or for any other reason.
            </p>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">13. Governing Law and Dispute Resolution</h2>
            
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">13.1 Governing Law</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa.
            </p>

            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">13.2 Dispute Resolution</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Any disputes arising from these Terms or our services shall first be attempted to be resolved through good faith negotiation. If negotiation fails, disputes shall be submitted to mediation before resorting to litigation. The parties agree to submit to the non-exclusive jurisdiction of the courts of South Africa.
            </p>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">14. Force Majeure</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Academy shall not be liable for any failure or delay in performing its obligations under these Terms due to circumstances beyond its reasonable control, including but not limited to natural disasters, pandemics, government actions, strikes, or utility failures.
            </p>

            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">15. Contact Information</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              For any questions or concerns regarding these Terms and Conditions, please contact us:
            </p>
            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Bontle Ka Nthabi (Pty) Ltd</strong><br>
                <strong>Trading as:</strong> BKN Beauty Academy
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Email:</strong> <a href="mailto:nthabi@bknbeautyacademy.co.za" class="text-primary-green hover:underline">nthabi@bknbeautyacademy.co.za</a>
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Phone:</strong> <a href="tel:+27638429997" class="text-primary-green hover:underline">+27 63 842 9997</a>
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>Location:</strong> Mbombela, South Africa
              </p>
            </div>

            <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded">
              <p class="text-green-800 dark:text-green-200 text-sm">
                <strong>By using our Website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Import SEO composable
import { setCustomSeoMeta } from '~/composables/useSeoMeta';

// Set SEO meta for terms and conditions page
setCustomSeoMeta({
  title: 'Terms and Conditions | BKN Beauty Academy',
  description: 'Terms and Conditions for BKN Beauty Academy courses and services. Read our enrollment, payment, and conduct policies.',
  keywords: 'terms and conditions, enrollment policy, refund policy, course terms, BKN Beauty Academy, student agreement',
  ogTitle: 'Terms and Conditions | BKN Beauty Academy',
  ogDescription: 'Please read our Terms and Conditions carefully before enrolling in our courses or using our services.',
  ogImage: '/images/gallery/photos/gallery-02.jpg',
  twitterTitle: 'Terms and Conditions | BKN Beauty Academy',
  twitterDescription: 'Please read our Terms and Conditions carefully before enrolling in our courses or using our services.',
  twitterImage: '/images/gallery/photos/gallery-02.jpg'
});
</script>
