export interface IFAQ {
  question: string;
  answer: string;
}

export const dummyFAQs: IFAQ[] = [
  {
    question: "Is this product compatible with other devices?",
    answer:
      "Yes, most modern electronics support standard connectivity options such as Bluetooth, USB-C, or Wi-Fi, allowing them to work with a wide range of smartphones, tablets, and computers.",
  },
  {
    question: "Does this product come with a warranty?",
    answer:
      "Yes, it typically includes a 1-year manufacturer warranty that covers hardware defects and production issues under normal usage.",
  },
  {
    question: "What accessories are included in the box?",
    answer:
      "The package usually includes the main device, a charging cable or power adapter, and a quick start guide. Some products may also include additional accessories.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "Battery life depends on usage, but most electronics are designed to last several hours to a full day on a single charge under normal conditions.",
  },
  {
    question: "Does the device support wireless connectivity?",
    answer:
      "Yes, many electronics support wireless technologies such as Bluetooth and Wi-Fi for seamless connectivity with other devices.",
  },
];
