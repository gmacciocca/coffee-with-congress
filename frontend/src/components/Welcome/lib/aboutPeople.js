import React from "react";
import { LinkTo } from "../../CommonUi";

const AboutText = () => (
<div>
    We are not a business, nonprofit or school.  We are simply of a group of people who want to help American citizens protect freedom, so we started this project.  We are scattered across the globe and have full-time jobs.  But we believe we are citizens of the world who must help one another.  (Our project and its views do not represent our employers.)  Some writers and developers did not feel comfortable being publicly listed for fear of retaliation.
</div>);

const TanujaBio = () => (
<div>
    Tanuja has worked in the software and e-commerce development space for 16+ years with companies like
    Google, Barnes & Noble.com and Broadway.com.  In parallel, she tutors math with&nbsp;
    <LinkTo url="http://www.tophonors.org/">Top Honors</LinkTo>
    &nbsp;and sits on the board of the&nbsp;
    <LinkTo url="http://www.cvtcnyc.org/">Crime Victims Treatment Center</LinkTo>.
    &nbsp;She worked extensively with the Hurricane Sandy recovery efforts and
    organized an initiative to help hundreds of local residents restore their homes from mold and water damage.
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
    Lifelong politico with opinions to spare. In her present life, Yashoda Sampath plans and performs user experience research, making sure that the voice of the user is represented at all stages of the design process. In her many past lives, Yashoda has worked for the British government, an environmental design agency, political campaigns, a really terrible rock band, and an international newspaper. All these jobs have one common thread: Yashoda gets to ask a shitload of questions about why people behave the way they do.
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
