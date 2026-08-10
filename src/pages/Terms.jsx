import { site } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { LegalPage } from './Privacy';

export default function Terms() {
  usePageMeta();

  return (
    <LegalPage
      title="Terms of Use"
      updated="10 August 2026"
      sections={[
        {
          heading: 'Acceptance',
          body: 'By accessing and using the XDGE website (thexdge.com), you agree to these Terms of Use. If you do not agree, please do not use this site.',
        },
        {
          heading: 'Website content',
          body: 'All content on this website — including text, images, branding, and programme descriptions — is owned by XDGE or used with permission. You may not reproduce, distribute, or modify content without our written consent.',
        },
        {
          heading: 'Programme information',
          body: 'Programme descriptions, outcomes, and timelines are provided for general information. Specific terms, pricing, and delivery details are confirmed directly with participants or guardians during the enquiry process.',
        },
        {
          heading: 'Enquiries & applications',
          body: 'Submitting a Contact or Apply form does not guarantee programme placement. All applications are subject to review and availability.',
        },
        {
          heading: 'Third-party links',
          body: 'This site may link to third-party services (e.g. Calendly for scheduling). We are not responsible for the content or privacy practices of external sites.',
        },
        {
          heading: 'Limitation of liability',
          body: 'XDGE provides this website on an "as is" basis. To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from use of this site.',
        },
        {
          heading: 'Governing law',
          body: `These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
        },
        {
          heading: 'Contact',
          body: `Questions about these terms? Contact us at ${site.email}.`,
        },
      ]}
    />
  );
}
