// Lets any component tell the mascot what is happening, without importing it. Browser only.
export type Mood = "thinking" | "happy" | "error" | "look-up" | "calm"; // our type

export function tellMascot(mood: Mood) {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("mascot", { detail: mood }));
}
