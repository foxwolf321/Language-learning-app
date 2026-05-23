# JFT_BASIC_EXAMINEE_DISTRIBUTION.md

Last checked: 2026-05-23

## Purpose

Record the country-by-country JFT-Basic examinee distribution and product implications for the revenue-first language-learning app project.

This document should guide country/language prioritization. It does not prove willingness to pay by itself.

## Source

Official JFT-Basic implementation report PDF:

- https://www.jpf.go.jp/jft-basic/report/pdf/country-2019-2025.pdf

The source table lists examinee counts by country and fiscal year from FY2019 to FY2025.

## FY2025 distribution

Overseas total in FY2025: **205,653** examinees.

| Rank | Country | FY2025 examinees | Share of overseas FY2025 |
|---:|---|---:|---:|
| 1 | Indonesia | 102,494 | 49.84% |
| 2 | Nepal | 47,572 | 23.13% |
| 3 | Myanmar | 22,081 | 10.74% |
| 4 | Philippines | 9,432 | 4.59% |
| 5 | Sri Lanka | 8,310 | 4.04% |
| 6 | Vietnam | 5,337 | 2.60% |
| 7 | Bangladesh | 4,543 | 2.21% |
| 8 | India | 2,083 | 1.01% |
| 9 | Thailand | 1,714 | 0.83% |
| 10 | Cambodia | 1,670 | 0.81% |
| 11 | Mongolia | 235 | 0.11% |
| 12 | Uzbekistan | 172 | 0.08% |
| 13 | Pakistan | 10 | 0.00% |

FY2025 total including Japan domestic examinees: **216,802**.
Japan domestic FY2025 examinees: **11,149**.

## FY2019-FY2025 cumulative distribution

Overseas cumulative total from FY2019 to FY2025: **537,728** examinees.

| Rank | Country | FY2019-FY2025 cumulative | Share of overseas cumulative |
|---:|---|---:|---:|
| 1 | Indonesia | 270,571 | 50.32% |
| 2 | Nepal | 90,405 | 16.81% |
| 3 | Myanmar | 77,645 | 14.44% |
| 4 | Philippines | 37,936 | 7.05% |
| 5 | Sri Lanka | 23,025 | 4.28% |
| 6 | Cambodia | 9,251 | 1.72% |
| 7 | Thailand | 7,534 | 1.40% |
| 8 | Bangladesh | 6,870 | 1.28% |
| 9 | India | 6,765 | 1.26% |
| 10 | Vietnam | 5,337 | 0.99% |
| 11 | Mongolia | 1,868 | 0.35% |
| 12 | Uzbekistan | 511 | 0.10% |
| 13 | Pakistan | 10 | 0.00% |

Total including Japan domestic FY2019-FY2025: **589,719**.
Japan domestic cumulative: **51,991**.

## Product implications

### Main conclusion

Indonesia is the strongest first country/language candidate by JFT-Basic examinee volume.

The FY2025 overseas distribution is highly concentrated:

- Indonesia alone is about half of overseas examinees.
- Indonesia + Nepal are about 73% of overseas examinees.
- Indonesia + Nepal + Myanmar are about 84% of overseas examinees.

Therefore, a revenue-first strategy should not treat all languages equally in the first market-validation phase.

### Recommended first localization lane

**Indonesian + English fallback** is the most rational Stage 1B candidate unless a stronger real-world channel appears for another country.

Reasons:

1. Indonesia has the largest JFT-Basic examinee volume by a wide margin.
2. Indonesian is one of the local languages supported in JFT-Basic's own test interface.
3. Indonesian uses Latin script, reducing early UI/font complexity compared with Nepali, Bengali, or Burmese.
4. English-only would likely miss part of the broad worker segment.
5. The same card/data structure can later be applied to Nepali, Burmese, Bengali, Vietnamese, and others.

### Secondary candidates

- Nepal: very large and fast-growing; good candidate after Indonesian, but Nepali script and translation QA add complexity.
- Myanmar: large cumulative and single-year base; Burmese localization has UI/font and channel/payment risks.
- Philippines: smaller JFT-Basic volume than Indonesia/Nepal/Myanmar, but useful for English-bridge validation.
- Sri Lanka: surprisingly meaningful FY2025 count; should be researched further before ignoring.
- Vietnam: FY2025 appears because the country entered the report only in FY2025; needs separate validation despite smaller cumulative count.
- Bangladesh: growing; Bengali localization should be considered after stronger channels/data.

## Revenue-first interpretation

This distribution supports the current working thesis:

> Do not build a generic Japanese app. Build a practical Work-in-Japan / JFT-Basic / SSW Japanese product, then test one high-volume country lane first.

Recommended immediate path:

1. Keep current English-support PWA as Stage 1A technical sample.
2. Build Stage 1B validation sample for Indonesian + English fallback.
3. Use the same structure later for Nepal/Myanmar/Bangladesh/Vietnam if validation signals appear.
4. Do not produce all translations or all audio before paid-demand evidence.

## Caveats

JFT-Basic examinee count is not the same as revenue potential.

It does not directly measure:

- willingness to pay
- app purchase behavior
- payment access
- school/agency adoption
- competition in each country
- translation cost
- advertising cost
- B2B sales difficulty

It is a prioritization signal, not proof of market success.
