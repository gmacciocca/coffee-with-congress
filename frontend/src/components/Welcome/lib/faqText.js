import React from "react";
import { LinkTo, EmailTo } from "../../CommonUi";

const FaqText = () => (
    <div>
        <div>
            <h5>One Year Update</h5>
            One year and 7000 letters later, Write to Congress is proud of all of you who took time to engage your leaders.  We are not proud of all our leaders - particularly the ones who continue to propose pork-barrel legislation and chip away at our constitutional freedoms behind closed doors.  We also know that by the time our letters reach an elected official, an issue may already be wrapped up in an executive order or midnight vote.  Thus, we've decided that we'll keep up just a handful of templates and the address match service on this website.  The rest of the fight will be fought with your votes ... and maybe even your decision to run for office.  

            <h5> Wait, is this email or snail mail?</h5>
            Snail mail.  Email gets easily filtered and organized by algorithms without ever being read.  You have to really explain your needs as a constituent, print the letter and mail it.  It&rsquo;s all about the phone calls and letters!

            <h5>How can I help write a template?</h5>
            Drop us a line at <EmailTo email="writers@writetocongress.org" /> with your information and a writing sample (no more than 1 page).

            <h5>Why can&rsquo;t I write a letter longer than one page?</h5>
            Because the letter loses its effectiveness. Elected officials are busy and we have to get straight to the point.

            <h5>I run a media / news site - can I feature Write to Congress to my readers?</h5>
            We&rsquo;d love it - drop us a line at <EmailTo email="media@writetocongress.org" />.

            <h5>Why do I have to enter my full address? And what do you do with it?</h5>
            Cities are broken down into multiple districts, which have different representatives in the House. To give you the right list of people to contact, we need your address. You also need to list your address on your letter to prove you are really a constituent in that official&rsquo;s jurisdiction. Write to Congress does not record your address, or the letter you customize, in any way, shape or form.

            <h5>I am getting &rsquo;no officials found&rsquo; when I type in my address - why?</h5>
            Please send us your info <LinkTo url="https://docs.google.com/a/writetocongress.org/forms/d/e/1FAIpQLSc7N9tYMmg5rP0MRCvHu-z9w_7jyCqN7gB4tkjB4Xj3NUpoWw/viewform" >here</LinkTo> and we&rsquo;ll get back to you as soon as possible.

            <h5>The elected official I chose has no address - why?</h5>
            This means address is not available through the Google Civics API. We encourage you to still try calling the office or writing other officials.

            <h5>I represent a nonprofit - how can our supporters use this?</h5>
            Contact us at <EmailTo email="nonprofits@writetocongress.org" />.

            <h5>I see a typo in one of the letters - should I tell you or troll you?</h5>
            Tell us!  We&rsquo;re working at all hours so your proofreading prowess is welcomed.  Contact us at <EmailTo email="writers@writetocongress.org" /> with the Issue, Elected Official and State of the letter (and the typo!).  Meanwhile, you can edit your letter to make it perfect.

            <h5>How do I know which elected official I should be writing to?</h5>
            Do a quick Google search on the topic to see how far along the bill is in the process. When in doubt, write both.

            <h5>The address you show seems different than the one I've seen in the past - are you sure it's right?</h5>
            An official can have many different addresses, so we use the Google Civics API to pull the first one listed. If you&#39;d prefer to send it to a different address closer to you, feel free to do so.

            <h5>I have another question that&rsquo;s not answered here - how do I reach you?</h5>
            E-mail us at <EmailTo email="info@writetocongress.org" />
        </div>
    </div>
);

export default FaqText;
