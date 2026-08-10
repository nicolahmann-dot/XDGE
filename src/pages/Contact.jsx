import { ContactHero } from '../components/sections/ContactHero';
import { ContactForm } from '../components/sections/ContactForm';
import { DiscoveryMeeting } from '../components/sections/DiscoveryMeeting';

export default function Contact() {
  return (
    <div className="xg-contact-page">
      <ContactHero />
      <ContactForm />
      <DiscoveryMeeting />
    </div>
  );
}
