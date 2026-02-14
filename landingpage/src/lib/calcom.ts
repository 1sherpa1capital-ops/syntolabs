export interface CalBookingField {
  name: string;
  label: string;
  type: "text" | "select" | "multi_select" | "checkbox" | "email" | "phone" | "website" | "paragraph" | "long_text";
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
}

/**
 * Custom booking fields for Synto Labs qualification
 */
export const SYNTOLABS_BOOKING_FIELDS: CalBookingField[] = [
  {
    name: "name",
    label: "Your Name",
    type: "text",
    required: true,
    placeholder: "John Doe"
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "you@company.com"
  },
  {
    name: "role",
    label: "Your Role",
    type: "select",
    required: true,
    options: [
      { label: "Founder / CEO", value: "founder_ceo" },
      { label: "CTO / VP Operations", value: "cto_vpo_operations" },
      { label: "CTO / VP Engineering", value: "cto_vpo_engineering" },
      { label: "Head of Product", value: "head_of_product" },
      { label: "Head of Engineering", value: "head_of_engineering" },
      { label: "Head of Growth", value: "head_of_growth" },
      { label: "Product Manager", value: "product_manager" },
      { label: "Engineering Manager", value: "engineering_manager" },
      { label: "Other Leadership", value: "other_leadership" },
      { label: "Individual Contributor", value: "individual_contributor" }
    ]
  },
  {
    name: "company",
    label: "Company Name",
    type: "text",
    required: true,
    placeholder: "Acme Inc"
  },
  {
    name: "company_size",
    label: "Company Size",
    type: "select",
    required: true,
    options: [
      { label: "1-10 employees", value: "1_10" },
      { label: "11-50 employees", value: "11_50" },
      { label: "51-200 employees", value: "51_200" },
      { label: "201-500 employees", value: "201_500" },
      { label: "500+ employees", value: "500_plus" }
    ]
  },
  {
    name: "project_type",
    label: "What do you want to automate?",
    type: "multi_select",
    required: true,
    options: [
      { label: "Customer Support", value: "customer_support" },
      { label: "Sales Operations", value: "sales_operations" },
      { label: "Data Processing", value: "data_processing" },
      { label: "Content Operations", value: "content_operations" },
      { label: "HR Operations", value: "hr_operations" },
      { label: "Financial Operations", value: "financial_operations" },
      { label: "Internal Workflows", value: "internal_workflows" },
      { label: "Other", value: "other" }
    ]
  },
  {
    name: "timeline",
    label: "Timeline for this project",
    type: "select",
    required: true,
    options: [
      { label: "ASAP (within 1 week)", value: "asap" },
      { label: "1-2 weeks", value: "1_2_weeks" },
      { label: "1 month", value: "1_month" },
      { label: "2-3 months", value: "2_3_months" },
      { label: "3+ months", value: "3_plus_months" }
    ]
  },
  {
    name: "budget_range",
    label: "Budget Range",
    type: "select",
    required: false,
    options: [
      { label: "$2.5K - $5K", value: "2_5k" },
      { label: "$5K - $10K", value: "5_10k" },
      { label: "$10K - $25K", value: "10_25k" },
      { label: "$25K+", value: "25k_plus" }
    ]
  },
  {
    name: "challenges",
    label: "What challenges are you facing?",
    type: "multi_select",
    required: false,
    options: [
      { label: "Too much manual/repetitive work", value: "manual_work" },
      { label: "Outgrowing competitors automating faster", value: "competitors" },
      { label: "Process inefficiencies", value: "inefficiency" },
      { label: "Data silos across tools", value: "data_silos" },
      { label: "Limited technical resources", value: "limited_resources" },
      { label: "Scaling difficulties", value: "scaling" },
      { label: "Integration complexity", value: "integration" }
    ]
  }
];

export async function updateEventTypeWithBookingFields(
  _apiKey: string,
  eventTypeId: string,
  bookingFields: CalBookingField[]
): Promise<void> {
  const response = await fetch(`https://api.cal.com/v2/event_types/${eventTypeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "cal-api-version": "2024-08-13"
    },
    body: JSON.stringify({
      bookingFieldsResponses: bookingFields
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to update event type: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
