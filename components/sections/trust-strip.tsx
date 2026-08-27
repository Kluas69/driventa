import { trustItems } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

export function TrustStrip() {
  return (
    <div className="border-b border-line bg-paper">
      <Container className="py-8">
        <p className="kicker mb-6 text-center text-[0.68rem] text-muted">
          Everything handled, end to end
        </p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {trustItems.map((item, i) => (
            <li key={item.label}>
              <Reveal
                delay={i * 60}
                className="flex flex-col items-center gap-2.5 text-center sm:flex-row sm:text-left"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-strong">
                  <Icon name={item.icon} size={20} />
                </span>
                <span className="text-sm font-semibold leading-tight text-navy">{item.label}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
