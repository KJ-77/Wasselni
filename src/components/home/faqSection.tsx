import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const DEFAULT_FAQ: FaqItem[] = [
  {
    id: "f1",
    question: "How does Wasselni ensure rider safety?",
    answer:
      "All users undergo ID verification and university authentication. Drivers complete additional background checks. Every ride is tracked in real-time with emergency SOS features, trip sharing with trusted contacts, and 24/7 safety monitoring.",
  },
  {
    id: "f2",
    question: "How much can I save compared to private transportation?",
    answer:
      "Passengers typically save 60–80% compared to taxis or ride-hailing. A Beirut to Tripoli ride costs around $8–15 instead of $50+. Drivers can earn $200–500 monthly by sharing their daily commute.",
  },
  {
    id: "f3",
    question: "How does the AI matching system work?",
    answer:
      "Our smart algorithm considers your route, schedule, preferences (music, conversation level, smoking), and compatibility scores to match you with the best riders. You can set filters for gender, age range, and university affiliation.",
  },
  {
    id: "f4",
    question: "What areas does Wasselni cover?",
    answer:
      "We cover all major Lebanese cities and routes: Beirut, Tripoli, Jounieh, Sidon, Baalbek, and connections to all universities. The network includes intercity routes, student shuttles, and airport transfers.",
  },
  {
    id: "f5",
    question: "How do payments work?",
    answer:
      "Payments are handled automatically through the app via credit/debit cards or mobile wallets. Costs are split fairly based on distance traveled. Drivers receive payouts within 24 hours of trip completion.",
  },
  {
    id: "f6",
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes. You can cancel up to 2 hours before departure with no fees. Cancelling within 2 hours may incur a small compensation fee. Pickup points, passenger counts, and preferences can be modified directly in the app.",
  },
];

type Props = {
  faqs?: FaqItem[];
};

export default function FaqSection({ faqs }: Props) {
  const items = faqs ?? DEFAULT_FAQ;

  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Everything you need to know about ridesharing with Wasselni
          </p>
        </motion.div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <AccordionItem
                value={item.id}
                className="rounded-2xl border bg-[var(--color-card)] shadow-sm px-4"
              >
                <AccordionTrigger className="text-left py-4 font-medium text-base md:text-lg">
                  {item.question}
                </AccordionTrigger>

                <AccordionContent className="pb-4 text-sm md:text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}