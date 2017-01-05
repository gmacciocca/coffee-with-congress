import React from "react";

const EmailTo = ({email}) => {
    return (
        <a href={`mailto:${email}`} target='_top'>{email}</a>
    );
};

const FaqText = () => (
    <div>
        <div>
            <h5>How can I help write a template?</h5>
            Drop us a line at <EmailTo email="writers@writetocongress.org"/> with your information and a writing sample (no more than 1 page).
            <h5>Why can&rsquo;t I write a letter longer than one page?</h5>
            Because the letter loses its effectiveness. Elected officials are busy and we have to get straight to the point.
            <h5>I run a media / news site - can I feature Write to Congress to my readers?</h5>
            We&rsquo;d love it - drop us a line at <EmailTo email="media@writetocongress.org"/>.
            <h5>Why do I have to enter my full address? And what do you do with it?</h5>
            Cities are broken down into multiple districts, which have different representatives in the House. To give you the right list of people to contact, we need your address. You also need to list your address on your letter to prove you are really a constituent in that official's jurisdiction. Write to Congress does not record your address, or the letter you customize, in any way, shape or form.

            <h5>I am getting 'no officials found' when I type in my address - why?</h5>
            Please send us your info <a href="https://docs.google.com/a/writetocongress.org/forms/d/e/1FAIpQLSc7N9tYMmg5rP0MRCvHu-z9w_7jyCqN7gB4tkjB4Xj3NUpoWw/viewform" target="_blank">here</a> and we'll get back to you as soon as possible.

            <h5>The elected official I chose has no address - why?</h5>

            This means address is not available through the Google Civics API. We encourage you to still try calling the office or writing other officials.

            <h5>I have another question that&rsquo;s not answered here - how do I reach you?</h5>
            E-mail us at <EmailTo email="info@writetocongress.org"/>
        </div>
    </div>
);

export default FaqText;
