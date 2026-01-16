// 'use client';

// import { useState } from 'react';
// import { useRoast } from '@/hooks/use-roast';

// export default function TestRoastPage() {
//   const [username, setUsername] = useState('octocat');
//   const { roastData, loading, error, generateRoast } = useRoast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await generateRoast(username);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Test Roast Hook</h1>
      
//       <form onSubmit={handleSubmit} className="mb-4">
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="border p-2 mr-2"
//           placeholder="GitHub username"
//         />
//         <button 
//           type="submit" 
//           className="bg-blue-500 text-white p-2 rounded"
//           disabled={loading}
//         >
//           {loading ? 'Generating...' : 'Generate Roast'}
//         </button>
//       </form>

//       {error && (
//         <div className="text-red-500 mb-4">
//           Error: {error}
//         </div>
//       )}

//       {roastData && (
//         <div className="border p-4 rounded">
//           <h2 className="text-xl font-bold mb-2">Roast Result:</h2>
//           <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">
//             {JSON.stringify(roastData, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }