import type { Metadata } from "next";
import ContractorResponsePortal from "../components/ContractorResponsePortal";
export const metadata:Metadata={title:"Contractor Response",description:"Secure contractor response portal for Africa Security Solutions.",robots:{index:false,follow:false}};
export default function ContractorResponsePage(){return <main id="main-content" className="contractorPortalPage"><section className="contractorPortalHero"><div><p className="eyebrow">Partner operations</p><h1>Secure contractor response.</h1><p>Review the restricted assignment brief and submit availability, resources and quotation.</p></div></section><section className="contractorPortalSection"><ContractorResponsePortal/></section></main>}
