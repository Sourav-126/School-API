import express, { json, Router } from "express";
import { PrismaClient } from "../../prisma/app/generated/prisma/client";
import { addSchool } from "../types/addSchool";
import { listSchool } from "../types/listSchool";

const client = new PrismaClient();
type SchoolWithDistance = {
  distance: number;
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export const schoolRouter = Router();

// function to find the proximity to the user location and help getting Sorted order
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

schoolRouter.post("/addSchool", async (req, res) => {
  const body = req.body;
  const parsedData = addSchool.safeParse(body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "All fields are required",
    });
  }

  if (parsedData.success) {
    try {
      const school = await client.school.create({
        data: {
          name: parsedData.data?.name,
          address: parsedData.data?.address,
          latitude: parsedData.data.latitude,
          longitude: parsedData.data.longitude,
        },
      });

      res.json({
        message: "Thank You ,School is Added",
        school,
      });
    } catch (e) {
      res.json({
        message: "Please enter the write credentials",
        e,
      });
    }
  }
});

schoolRouter.get("/listSchools", async (req, res) => {
  const userLatitude = parseFloat(req.query.latitude as string);
  const userLongitude = parseFloat(req.query.longitude as string);

  try {
    const school = await client.school.findMany({});

    const schoolWithDistance: SchoolWithDistance[] = school.map((school) => {
      const distance = haversineDistance(
        userLatitude,
        userLongitude,
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    });
    const sortedSchools = schoolWithDistance.sort(
      (a, b) => a.distance - b.distance
    );
    res.json(sortedSchools);
  } catch (e) {
    res.json({
      message: "Please enter write credentials",
    });
  }
});
