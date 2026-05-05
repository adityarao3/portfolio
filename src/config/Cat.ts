export const catConfig = {
  enabled: true, // Set to false to disable the pet

  // Auto-cycle interval in milliseconds (10 seconds)
  cycleInterval: 10000,

  // Available sprites to cycle through
  sprites: [
    { name: "Classic Cat", src: "./oneko/oneko.gif", filter: "none" },
    { name: "Shadow Cat", src: "./oneko/oneko.gif", filter: "brightness(0.3) contrast(1.5)" },
    { name: "Golden Cat", src: "./oneko/oneko.gif", filter: "sepia(1) saturate(3) hue-rotate(10deg)" },
    { name: "Blue Cat", src: "./oneko/oneko.gif", filter: "sepia(1) saturate(5) hue-rotate(180deg)" },
    { name: "Pink Cat", src: "./oneko/oneko.gif", filter: "sepia(1) saturate(5) hue-rotate(300deg)" },
    { name: "Ghost Cat", src: "./oneko/oneko.gif", filter: "opacity(0.5) brightness(1.5)" },
  ],
};
