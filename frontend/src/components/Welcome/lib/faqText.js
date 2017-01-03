import React from "react";

const EmailTo = ({ email }) => {
    return (
        <a href={`mailto:${email}`} target='_top'>{email}</a>
    );
};

const FaqText = () => (
<div>
    <div>
        <h5>How can I help write a template?</h5>
        Drop us a line at <EmailTo email="writers@writetocongress.org" /> with your information and a writing sample (no more than 1 page).
        <h5>Why can&rsquo;t a write a letter longer than one page?</h5>
        Because the letter loses its effectiveness. Elected officials are busy and we have to get straight to the point.
        <h5>I run a media / news site - can I feature Write to Congress to my readers?</h5>
        We&rsquo;d love it - drop us a line at <EmailTo email="media@writetocongress.org" />
        <h5>I have another question that&rsquo;s not answered here - how do I reach you?</h5>
        <EmailTo email="info@writetocongress.org" />
    </div>
</div>);

export default FaqText;
