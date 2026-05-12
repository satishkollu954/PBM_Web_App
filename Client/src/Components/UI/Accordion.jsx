import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({ className = "", ...props }) {
  return (
    <AccordionPrimitive.Item
      className={`border-b border-[#c9a84c]/20 ${className}`}
      {...props}
    />
  );
}

function AccordionTrigger({ className = "", children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={`flex flex-1 items-center justify-between py-4 text-left text-sm font-medium transition-all hover:text-[#c9a84c] [&[data-state=open]>svg]:rotate-180 ${className}`}
        {...props}
      >
        {children}

        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className = "", children, ...props }) {
  return (
    <AccordionPrimitive.Content
      className={`overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${className}`}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
