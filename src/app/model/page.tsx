"use client";
import Breadcrumb from "@/components/ComponentHeader/ComponentHeader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MoleculeStructure from "../../components/MoleculeStructure/index";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  createMoleculeGenerationHistory,
  getMoleculeGenerationHistoryByUser,
} from "@/lib/actions/molecule-generation.actions";
import { getUserByEmail } from "@/lib/actions/user.actions";

const ModalLayout = () => {
  const { data: session } = useSession();
  const [smiles, setSmiles] = useState(
    "CCN(CC)C(=O)[C@@]1(C)Nc2c(ccc3ccccc23)C[C@H]1N(C)C",
  );
  const [numMolecules, setNumMolecules] = useState("10");
  const [minSimilarity, setMinSimilarity] = useState("0.3");
  const [particles, setParticles] = useState("30");
  const [iterations, setIterations] = useState("10");
  const [molecules, setMolecules] = useState<Molecule[]>([]);
  const [loading, setLoading] = useState(false);
  interface HistoryEntry {
    smiles: string;
    numMolecules: number;
    createdAt: string;
    generatedMolecules: Array<{ structure: string; score: number }>;
  }

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const user = await getUserByEmail(session.user.email);
          setUserId(user._id);
          const historyFromServer = await getMoleculeGenerationHistoryByUser(
            user._id,
          );
          setHistory(historyFromServer);
        } catch (error) {
          console.error("Error fetching user or history:", error);
        }
      }
    };

    fetchUserData();
  }, [session?.user?.email]);

  interface Payload {
    algorithm: string;
    num_molecules: number;
    property_name: string;
    minimize: boolean;
    min_similarity: number;
    particles: number;
    iterations: number;
    smi: string;
  }

  interface Molecule {
    structure: string;
    score: number;
  }

  interface ApiResponse {
    molecules: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const API_KEY =
      "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";

    // Original API endpoint
    const apiEndpoint = "https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate";

    const payload: Payload = {
      algorithm: "CMA-ES",
      num_molecules: parseInt(numMolecules),
      property_name: "QED",
      minimize: false,
      min_similarity: parseFloat(minSimilarity),
      particles: parseInt(particles),
      iterations: parseInt(iterations),
      smi: smiles,
    };

    try {
      // Solution 1: Use a proxy API route
      const response = await fetch("/api/nvidia-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: API_KEY,
          payload: payload,
        }),
      });

      /* Solution 2: Use mode: "no-cors" (Comment out solution 1 and uncomment this if you prefer this approach)
      const response = await fetch(apiEndpoint, {
        method: "POST",
        mode: "no-cors", // This prevents CORS errors but makes response unreadable
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      */

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      const generatedMolecules: Molecule[] = JSON.parse(data.molecules).map((mol: any) => ({
        structure: mol.sample,
        score: mol.score,
      }));

      setMolecules(generatedMolecules);

      if (userId) {
        await createMoleculeGenerationHistory(
          {
            smiles,
            numMolecules: parseInt(numMolecules),
            minSimilarity: parseFloat(minSimilarity),
            particles: parseInt(particles),
            iterations: parseInt(iterations),
            generatedMolecules,
          },
          userId,
        );

        const updatedHistory = await getMoleculeGenerationHistoryByUser(userId);
        setHistory(updatedHistory);
      } else {
        console.error("User ID is not available.");
      }

      console.log(generatedMolecules);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to generate molecules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Generate Molecules" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col gap-9 sm:col-span-2">
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-[#121212] dark:bg-[#181818]">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                SMILES to Molecule Generator
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      SMILES String
                    </label>
                    <input
                      type="text"
                      value={smiles}
                      onChange={(e) => setSmiles(e.target.value)}
                      placeholder="Enter SMILES string"
                      className="w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Number of Molecules
                    </label>
                    <input
                      type="text"
                      value={numMolecules}
                      onChange={(e) => setNumMolecules(e.target.value)}
                      placeholder="Enter number of molecules"
                      className="w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Minimum Similarity
                  </label>
                  <input
                    type="text"
                    value={minSimilarity}
                    onChange={(e) => setMinSimilarity(e.target.value)}
                    placeholder="Enter minimum similarity"
                    className="w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Particles
                  </label>
                  <input
                    type="text"
                    value={particles}
                    onChange={(e) => setParticles(e.target.value)}
                    placeholder="Enter number of particles"
                    className="w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Iterations
                  </label>
                  <input
                    type="text"
                    value={iterations}
                    onChange={(e) => setIterations(e.target.value)}
                    placeholder="Enter number of iterations"
                    className="w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                {error && (
                  <div className="mb-4.5 rounded-lg bg-red-100 p-3 text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Molecules"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-lg border border-stroke bg-white p-3 shadow-default dark:border-[#121212] dark:bg-[#181818]">
            <h3 className="font-medium text-black dark:text-white">
              Molecule Generation History
            </h3>
            <div className="mt-4 max-h-96 overflow-y-auto">
              {history.map((entry, index) => (
                <div key={index} className="border-b border-stroke py-3">
                  <p className="text-sm text-black dark:text-white">
                    <span className="font-bold">SMILES:</span> {entry.smiles}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    <span className="font-bold">Molecules:</span>{" "}
                    {entry.numMolecules}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    <span className="font-bold">Date:</span>{" "}
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-3">
                    <button
                      className="text-primary hover:underline"
                      onClick={() => setMolecules(entry.generatedMolecules)}
                    >
                      View Molecules
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {molecules.length > 0 && (
        <div className="mt-8 rounded-lg bg-white p-2">
          <div className="mt-8 flex flex-col gap-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {molecules.map((mol, index) => (
                <MoleculeStructure
                  key={index}
                  id={`mol-${index + 1}`}
                  structure={mol.structure}
                  scores={mol.score}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ModalLayout;