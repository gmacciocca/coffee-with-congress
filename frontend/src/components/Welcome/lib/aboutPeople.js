import React from "react";

const LinkTo = ({ url, urlName }) => {
    return (
        <a href={url} target="_blank">{urlName}</a>
    );
};

const AboutText = () => (
<div>
    <div>
        We are not a business, nonprofit or school.  We are simply of a group of people who want to help American citizens protect freedom, so we started this project.  We are scattered across the globe and have full-time jobs.  But we believe we are citizens of the world who must help one another.  (Our project nor its views do not represent our employers.)  Some writers and developers did not feel comfortable being publicly listed for fear of retaliation.
    </div>
</div>);

const TanujaBio = () => (
<div>
    <div>
        Tanuja has been with Google for six years, serving as a program manager on the Docs engineering team.
        Prior to Google, she was a Product Manager at Barnes &amp; Noble.com and Broadway.com.
        Parallel to her 16+ year career in ecommerce and software development, Tanuja tutors math through&nbsp;
        <LinkTo url="http://www.tophonors.org/" urlName="Top Honors" />
        &nbsp;for 7 years and counting.
        In 2013, she started a complementary middle school reading program&nbsp;
        <LinkTo url="http://www.booksandbreakfast.org/" urlName="Books & Breakfast" />
        &nbsp;in her neighborhood.
        She worked extensively with the Hurricane Sandy recovery efforts and organized an initiative to help hundreds of local residents restore their homes from mold and water damage.
        Born to immigrants from the India, Tanuja earned her Bachelor&#39;s of Science from New York University.
        At 20, she launched her first commercial website and never looked back.
    </div>
</div>);


const aboutPeople = [{
    name: "Tanuja Gupta",
    photoUrl: "./images/tanuja.jpg",
    bioComponent: <TanujaBio />
}, {
    name: "Gianluca Macciocca",
    photoUrl: "http://gravatar.com/avatar/e4e39436859e90abb970ef9e8eff28fe",
}, {
    name: "Yashoda Sampath",
    photoUrl: "./images/sil.png",
}, {
    name: "Chad Walters",
    photoUrl: "./images/chad.jpg"
}, {
    name: "Julia Ipsa",
    photoUrl: "./images/sil.png",
}, {
    name: "Kavita Jain-Cocks",
    photoUrl: "./images/kavita.jpg"
}];

export { AboutText, aboutPeople };
