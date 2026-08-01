import type { Metadata } from "next";
import ClientPortalLookup from "../components/ClientPortalLookup";

export const metadata:Metadata={title:"Client Portal",description:"Securely check the status of an Africa Security Solutions service request using its reference number and contact email.",robots:{index:false,follow:false}};
export default function ClientPortalPage(){return <main id="main-content">
<section className="portalHero"><div className="serviceHeroOverlay"/><div className="serviceHeroContent"><p className="eyebrow">Client portal</p><h1>Track your security request.</h1><p className="lead">Use the reference number issued after submission and the matching email address to view the current processing stage.</p></div></section>
<section className="portalSection"><ClientPortalLookup/></section>
<section className="portalHelp"><div><p className="eyebrow">Need assistance?</p><h2>Cannot find your reference?</h2><p>Contact the operations team from the same email address used for your request. Include your name, company and approximate submission date.</p></div><a className="button secondary" href="mailto:info@security-solutions.africa?subject=Client%20portal%20assistance">Email operations</a></section>
</main>}
