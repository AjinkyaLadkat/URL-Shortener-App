import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navigate, useNavigate } from "react-router-dom";

const LandingPage = () => {

  const [longUrl , setLongUrl] = useState()
  const navigate = useNavigate()

  const handleShorten = (e) => {
    e.preventDefault()
    if(longUrl){
      navigate(`/auth?createNew=${longUrl}`)
    }
  }

  return (
    <div className=" sm:px-12 flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-5xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        Simplify your URLs,
        <br />
        Amplify your impact.
      </h2>

      <form
        onSubmit={handleShorten}
        action=""
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 "
      >
        <Input
          className=" h-3/4 text-gray-400 flex-1 py-4 px-4 border-[#dcc284]"
          type="url"
          value = {longUrl}
          onChange = {(e) => setLongUrl(e.target.value)}
          placeholder="Enter Your Long URL..."
        />
        <Button className="h-3/4" type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>

      <img
        src="/banner.png"
        className="w-full max-w-screen-md h-auto my-8 md:my-12 px-4 md:px-11 rounded-[130px] object-contain"
        alt="banner image"
      />

<Accordion type="multiple" collapsible className="w-3/4 md:px-11">
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-left w-full">
      What is SlimLink.io?
    </AccordionTrigger>
    <AccordionContent>
      SlimLink.io is a fast, reliable, and free URL shortener that helps
      you turn long links into sleek, shareable ones.
    </AccordionContent>
  </AccordionItem>
</Accordion>

<Accordion type="multiple" collapsible className="w-3/4 md:px-11">
  <AccordionItem value="item-2">
    <AccordionTrigger className="text-left w-full">
      Is SlimLink.io free to use?
    </AccordionTrigger>
    <AccordionContent>
      Absolutely. SlimLink.io is 100% free for individuals and startups.
      No hidden charges.
    </AccordionContent>
  </AccordionItem>
</Accordion>

<Accordion type="multiple" collapsible className="w-3/4 md:px-11">
  <AccordionItem value="item-3">
    <AccordionTrigger className="text-left w-full">
      Does SlimLink.io provide analytics for my links?
    </AccordionTrigger>
    <AccordionContent>
      Yes! You will get real-time insights like total clicks, countries
      and device type — all in your dashboard.
    </AccordionContent>
  </AccordionItem>
</Accordion>

<Accordion type="multiple" collapsible className="w-3/4 md:px-11">
  <AccordionItem value="item-4">
    <AccordionTrigger className="text-left w-full">
      Can I use this for commercial purposes?
    </AccordionTrigger>
    <AccordionContent>
      Yes! Whether you’re sharing links in emails, ads, or social media —
      SlimLink.io is business-ready.
    </AccordionContent>
  </AccordionItem>
</Accordion>

<Accordion type="multiple" collapsible className="w-3/4 md:px-11">
  <AccordionItem value="item-5">
    <AccordionTrigger className="text-left w-full">
      Can I customize the shortened URL?
    </AccordionTrigger>
    <AccordionContent>
      Yes! Logged-in users can create custom aliases like
      slimlink.io/my-brand instead of random characters.
    </AccordionContent>
  </AccordionItem>
</Accordion>

    </div>
  );
};

export default LandingPage;
