import z from "zod";

export const listSchool = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
