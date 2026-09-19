export type Product = {
  id: string
  name: string
  category: string
  status: string
  description: string
}

/** Exact product titles and project copy from the live Face specimens. Do not invent copy. */
export const PRODUCTS: Product[] = [
  {
    id: '01',
    name: 'SKU Profitability and Complexity Optimisation Agent',
    category: 'ZERO TO ONE',
    status: 'Global rollout',
    description:
      'A SKU profitability and complexity control tower that helps procurement teams find grounded opportunities, prepare evidence and coordinate the people who own the decision.',
  },
  {
    id: '02',
    name: 'Manufacturing Real-Time AI Assistant',
    category: 'FLAGSHIP AI PRODUCTS',
    status: 'Global rollout',
    description:
      "Approved, context-aware troubleshooting inside the operator's normal downtime workflow—backed by a governed feedback-to-fix quality loop.",
  },
  {
    id: '03',
    name: 'C-Suite Financial Report Agent',
    category: 'AI PRODUCT FOR C-SUITE',
    status: 'UAT',
    description:
      'A controlled Finance-validation workflow that turns protected performance packs into concise, source-bounded executive answers—and Finance feedback into repeatable regression evidence.',
  },
  {
    id: '04',
    name: 'Promotion Investment Planner',
    category: 'DIGITAL TRANSFORMATION',
    status: 'Proof of concept',
    description:
      'Prototyped a regional Promotion Investment Planner system to manage and optimise DKK 1bn in annual promotion spend.',
  },
  {
    id: '05',
    name: 'Warehouse Optimisation Configurator',
    category: 'DIGITAL TRANSFORMATION',
    status: 'Minimum Viable Product',
    description:
      'Turning a manual pallet-management process into an algorithmic calculation workflow to reduce rental warehouse spend through optimised space usage and reduce goods write-offs from transport losses.',
  },
  {
    id: '06',
    name: 'Spare-Parts Analytics',
    category: 'AI ANALYTICS',
    status: 'Prototype',
    description:
      'Identified more than DKK 200m in optimisation opportunities from idle spare-parts inventory in a major business unit.',
  },
  {
    id: '07',
    name: 'Asset Lifecycle Analytics',
    category: 'AI ANALYTICS',
    status: 'Prototype',
    description:
      'A traceable asset-record and lifecycle-remediation product. It does not assess spare-parts pooling, transfer or disposal, and never presents a review flag as confirmed risk.',
  },
]
