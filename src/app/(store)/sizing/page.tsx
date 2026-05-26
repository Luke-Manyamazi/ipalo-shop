import type { Metadata } from "next";
import { Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "ipalo size guide — women's, men's, kids, and baby sizes with measurements in cm.",
};

function SizeTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="mb-12">
      <h3 className="text-base font-semibold text-[#0a0a0a] mb-4 tracking-tight">
        {caption}
      </h3>
      <div className="overflow-x-auto rounded-2xl border border-[#e5e5e5]">
        <table className="w-full text-sm min-w-max">
          <thead>
            <tr className="bg-[#f8f5f0] border-b border-[#e5e5e5]">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-5 py-3.5 ${
                      j === 0
                        ? "font-semibold text-[#0a0a0a]"
                        : "text-neutral-600"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SizingPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#f8f5f0] px-4 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4 font-medium">
            Sizing
          </p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#0a0a0a]">
            Size Guide
          </h1>
          <p className="mt-4 text-neutral-500 text-base leading-relaxed">
            All measurements are in centimetres. If you&apos;re between sizes,
            we recommend sizing up.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        {/* Tip banner */}
        <div className="flex items-start gap-4 bg-[#c9a96e]/8 border border-[#c9a96e]/30 rounded-2xl px-6 py-4 mb-12">
          <Ruler className="h-5 w-5 text-[#c9a96e] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#0a0a0a]">
            <span className="font-semibold text-[#c9a96e]">
              When in doubt, size up.
            </span>{" "}
            Our adult pieces run true to size. Kids&apos; sizes run slightly
            large to allow for growing room.
          </p>
        </div>

        {/* Women's */}
        <SizeTable
          caption="Women's sizes"
          headers={["Size", "Chest (cm)", "Waist (cm)", "Hips (cm)"]}
          rows={[
            ["XS", "80 – 84", "60 – 64", "86 – 90"],
            ["S", "85 – 89", "65 – 69", "91 – 95"],
            ["M", "90 – 95", "70 – 75", "96 – 101"],
            ["L", "96 – 103", "76 – 83", "102 – 109"],
            ["XL", "104 – 112", "84 – 92", "110 – 118"],
          ]}
        />

        {/* Men's */}
        <SizeTable
          caption="Men's sizes"
          headers={["Size", "Chest (cm)", "Waist (cm)", "Hips (cm)"]}
          rows={[
            ["S", "88 – 93", "73 – 78", "89 – 94"],
            ["M", "94 – 100", "79 – 85", "95 – 101"],
            ["L", "101 – 108", "86 – 93", "102 – 109"],
            ["XL", "109 – 117", "94 – 102", "110 – 118"],
            ["XXL", "118 – 127", "103 – 112", "119 – 128"],
          ]}
        />

        {/* Kids */}
        <SizeTable
          caption="Kids' sizes"
          headers={["Size", "Height (cm)", "Chest (cm)"]}
          rows={[
            ["2 – 3Y", "92 – 98", "53 – 55"],
            ["4 – 5Y", "104 – 110", "57 – 59"],
            ["6 – 7Y", "116 – 122", "61 – 63"],
            ["8 – 9Y", "128 – 134", "65 – 68"],
            ["10 – 11Y", "140 – 146", "70 – 73"],
          ]}
        />

        {/* Baby */}
        <SizeTable
          caption="Baby sizes"
          headers={["Size", "Height (cm)", "Weight (kg)"]}
          rows={[
            ["0 – 3m", "50 – 60", "3.5 – 6"],
            ["3 – 6m", "60 – 67", "6 – 7.5"],
            ["6 – 12m", "67 – 74", "7.5 – 9.5"],
            ["12 – 18m", "74 – 80", "9.5 – 11"],
            ["18 – 24m", "80 – 86", "11 – 12.5"],
          ]}
        />

        {/* Fit notes */}
        <div className="bg-[#f8f5f0] rounded-2xl p-6">
          <h3 className="font-semibold text-[#0a0a0a] mb-3">Fit notes</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="text-[#c9a96e] mt-1">·</span>
              Our adult pieces are cut true to size — no vanity sizing.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a96e] mt-1">·</span>
              Kids&apos; sizes run slightly large to allow for growing room.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a96e] mt-1">·</span>
              For a relaxed fit on adults, consider going up one size.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a96e] mt-1">·</span>
              Still not sure? Email us at{" "}
              <a
                href="mailto:hello@ipalo.co.za"
                className="text-[#c9a96e] hover:underline"
              >
                hello@ipalo.co.za
              </a>{" "}
              and we&apos;ll help.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
