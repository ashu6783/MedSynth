import Index from "@/components/Dashboard/Index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { Metadata } from "next";

export const metadata:Metadata={
  title:'MedSynth : A leading research plateform for drug discovery',
  description:'this is a description for protein bind',
}
export default function Home() {
  return (
    <>
      <DefaultLayout>
       <Index/>
      </DefaultLayout>
    </>
  );
}

