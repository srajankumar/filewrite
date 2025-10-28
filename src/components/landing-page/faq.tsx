import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="max-w-2xl mx-auto py-10">
      <h2 className="md:text-2xl text-xl font-semibold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Why does it sometimes take longer to load?
          </AccordionTrigger>
          <AccordionContent>
            Because Filewrite is hosted on Render’s free tier, servers may go
            into “sleep” mode after periods of inactivity. The first load after
            inactivity can take a few seconds as the server spins back up.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is Filewrite free to use?</AccordionTrigger>
          <AccordionContent>
            Yes. Filewrite is completely free to all users.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
