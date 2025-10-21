import axios from "axios";
import IRL from "../models/IRL.js";

const INSEE_API_URL =
  "https://api.insee.fr/series/BDM/V1/data/001688717";

// Optional: if INSEE requires API key later, you could add headers here

/**
 * Fetch IRL data from INSEE open API
 * Returns a list of { year, quarter, value }
 */
async function fetchIRLFromInsee() {
  const { data } = await axios.get(
    "https://api.insee.fr/series/BDM/V1/data/IRL"
  );

  // Example transformation depending on INSEE response format
  return data.series[0].observations.map((obs) => {
    const [year, quarter] = obs.period.split("-");
    return {
      year: parseInt(year, 10),
      quarter,
      value: parseFloat(obs.value),
    };
  });
}

/**
 * Synchronize INSEE IRL data with database
 */
export async function syncIRL() {
  const irlList = await fetchIRLFromInsee();
  let added = 0;

  for (const irl of irlList) {
    const exists = await IRL.findOne({
      year: irl.year,
      quarter: irl.quarter,
    });

    if (!exists) {
      await IRL.create(irl);
      added++;
    }
  }

  return { added, total: irlList.length };
}

/**
 * Get all IRL data from database
 */
export async function getAllIRL() {
  return IRL.find({}).sort({ year: 1, quarter: 1 });
}
