"MedSynth_AI: Revolutionizing Molecular Research"


MedSynth_AI is an advanced platform built with the latest Next.js, designed to empower researchers and developers in the field of molecular research. With tools for visualizing molecular structures, generating custom molecules using SMILES notation, and real-time collaboration via group messaging, MedSynth_AI combines the power of AI with cutting-edge web technologies to accelerate research and decision-making.

protected routes : Signing in for the Dashboard.
![image](https://github.com/user-attachments/assets/c94590e2-db59-4ebf-afbd-47e2252bc6d1)

The Dashboard

![image](https://github.com/user-attachments/assets/a8c2387b-1f43-42d0-8519-3c35cc9f258b)

Molecules Bank: Some saved molecules,we can add the molecules in it with its details after successful research.

![image](https://github.com/user-attachments/assets/fe7bd25c-f4d0-4ba5-b253-7466b6046c39)

Model: Generating Molecules by NVIDIA,S AI model using SMILES.

![image](https://github.com/user-attachments/assets/98d23768-a86a-45ae-8b94-f7c98aa14984)

example

![image](https://github.com/user-attachments/assets/b5800408-8957-4ecc-bbdd-ad17e82d8cb8)


Research: Finding about certain compound using pubchem api available.

![image](https://github.com/user-attachments/assets/7639ae38-1fc2-4dfe-bb38-fcca45b56737)

messaging: Real time chat functionality.

![image](https://github.com/user-attachments/assets/fbb6987e-c663-4f11-b396-bbff3ecd5eb9)




--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ABOUT NVIDIA AI model (MolMIM):

MolMIM generates a random sample of new molecules in SMILES format by sampling from the latent space around the point corresponding to the given seed molecule. MolMIM performs optimization with the CMA-ES algorithmin the model’s latent space and sample molecules with improved values of the desired scoring function.

MolMIM is a latent variable model developed by NVIDIA that is trained in an unsupervised manner over a large-scale dataset of molecules in the form of SMILES strings. MolMIM utilizes transformer architecture to learn an informative fixed-size latent space using Mutual Information Machine (MIM) learning. MIM is a learning framework for a latent variable model which promotes informative and clustered latent codes. MolMIM can be used for sampling novel molecules from the model’s latent space.



🚀 Project Highlights------->

AI-powered Molecule Generation
Generate novel molecules using SMILES notation and NVIDIA's MolMIM, which employs advanced AI techniques for optimization and latent space sampling.

Real-time Collaboration
Enable seamless group messaging and collaboration among researchers using Ably.

Molecule Visualization and Analysis
Use RDKit.js for intuitive molecular structure visualization and data analysis.

User-friendly Interface
A sleek, modern UI built with TailwindCSS, offering both light and dark modes.

Collaboration Features
Create and manage research groups for effective teamwork and streamlined communication.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🛠️ Technologies and Integrations----->

Frontend

Next.js: Modern web framework for server-rendered React applications.
TailwindCSS: Utility-first CSS framework for rapid UI development.
React ApexCharts: Data visualization library for creating insightful molecular data charts.

Backend

MongoDB: NoSQL database for storing molecule data, user information, and group activity.
Mongoose: ODM library for seamless interaction with MongoDB.
NextAuth.js: Robust authentication for user sessions.

AI Integration

NVIDIA MolMIM: Generate custom molecules using an AI model trained with SMILES data, leveraging Mutual Information Machine learning.
PubChem API: Access extensive chemical data for research.

Collaboration Tools

Ably: Real-time messaging for group collaboration.
Resend: Email notifications for updates and alerts.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

💡 Usage
Visualize Molecules
Upload or generate molecular structures using RDKit and MolMIM.

Generate Custom Molecules
Input SMILES notation to create novel molecules with AI-driven optimization.

Collaborate in Real-time
Create groups, manage members, and exchange messages seamlessly.

Analyze Data
Visualize molecule properties using React ApexCharts and extract insights from your research.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


📚 Resources

RDKit.js
TailwindCSS
NextAuth.js
Mongoose
MongoDB
React ApexCharts
Next.js
Ably
Resend
NVIDIA AI Platform
PubChem API
