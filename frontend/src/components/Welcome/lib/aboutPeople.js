import React from "react";

const LinkTo = ({ url, urlName }) => {
    return (
        <a href={url} target="_blank">{urlName}</a>
    );
};

const AboutText = () => (
<div>
    We are not a business, nonprofit or school.  We are simply of a group of people who want to help American citizens protect freedom, so we started this project.  We are scattered across the globe and have full-time jobs.  But we believe we are citizens of the world who must help one another.  (Our project and its views do not represent our employers.)  Some writers and developers did not feel comfortable being publicly listed for fear of retaliation.
</div>);

const TanujaBio = () => (
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
</div>);

const JuliaBio = () => (
<div>
    Concerned American.  Advocate of a democracy that serves all the peoples.
    Believer in the collective power of individuals who raise up communities.
    Recognizer of a government&#39;s core responsibility to promote and enable a prosperous country -- as measured by its ability to protect its weakest citizens.
    Privileged person because of all of the above.
</div>);

const YashodaBio = () => (
<div>
    Contributor.
</div>);

const KavitaBio = () => (
<div>
    Contributor.
</div>);

const ChadBio = () => (
<div>
    Contributor, independent, researcher, writer to congress, patriot, volunteer, AIDS/LifeCycle Rider.
</div>);

const GianlucaBio = () => (
<div>
    Developer, activist and philanthropist.<br />
    Gianluca is a C++/Javascript programmer who has worked at many startups, and corporates in both the Bay Area and New York.
    He currently works at Barnes &amp; Noble.com building out higher education software.
    He immigrated to the US from Italy in 1994, and obtained his citizenship in 2016, during one of the most contentious presidential campaigns.
    Gianluca actively volunteered in Staten Island and the Rockaways during Hurricane Sandy to help hundreds of local residents clean, restore and rebuild their homes.
    He and his partner are proof that we have too much at stake to not fight.
</div>);

const aboutPeople = [{
    name: "Tanuja Gupta",
    photoUrl: "./images/tanuja.jpg",
    bioComponent: <TanujaBio />
}, {
    name: "Gianluca Macciocca",
    photoUrl: "http://gravatar.com/avatar/e4e39436859e90abb970ef9e8eff28fe",
    bioComponent: <GianlucaBio />
}, {
    name: "Yashoda Sampath",
    photoUrl: "./images/yashoda.jpg",
    bioComponent: <YashodaBio />
}, {
    name: "Chad Walters",
    photoUrl: "./images/chad.jpg",
    bioComponent: <ChadBio />
}, {
    name: "Julia Kang",
    photoUrl: "./images/sil.png",
    bioComponent: <JuliaBio />
}, {
    name: "Kavita Jain-Cocks",
    photoUrl: "./images/kavita.jpg",
    bioComponent: <KavitaBio />
}];

export { AboutText, aboutPeople };
